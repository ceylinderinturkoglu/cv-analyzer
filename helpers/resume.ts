import { SYSTEM_PROMPT, USER_PROMPT } from "@/constants/prompts";
import {
  Analysis,
  Criteria,
  Missing,
  MissingCriteria,
  Resume,
} from "@/constants/types";
import OpenAI from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

export async function structuringResume(resume: string) {
  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT(resume) },
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 2000,
      model: modelName,
    });

    let result = String(response.choices[0].message.content);

    result = result.replace(/```json([\s\S]*?)```/g, "$1").trim();
    result = result.replace(/\/\/\s.*/g, "").trim();

    if (!result.endsWith("}")) {
      console.warn(
        "OpenAI response appears incomplete. Consider increasing max_tokens."
      );
    }

    try {
      const parsedResult = JSON.parse(result);
      return parsedResult;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Raw OpenAI response:", result);
      throw new Error(
        "Invalid JSON format in OpenAI response. Check the console for raw response."
      );
    }
  } catch (apiError) {
    console.error("Error in OpenAI API call:", apiError);
    throw apiError;
  }
}

export function analyzingResume(resume: Resume, criteria: Criteria): Analysis {
  const missingCriteria: MissingCriteria[] = [];
  let totalCriteriaCount = 0;
  let matchedCriteriaCount = 0;

  const normalize = (value: any) =>
    typeof value === "string" ? value.trim().toLowerCase() : value;

  const levenshteinDistance = (a: string, b: string): number => {
    // time complexity O(n*m)
    // space complexity O(min(n,m))
    const dp = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
        else
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }

    return dp[a.length][b.length];
  };

  const areStringsSimilar = (a: string, b: string, threshold = 2): boolean => {
    return levenshteinDistance(normalize(a), normalize(b)) <= threshold;
  };
  
  if (criteria.jobTitle) {
    totalCriteriaCount++;
    // frontend developer, front end developer, front-end developer
    if (areStringsSimilar(resume.jobTitle, criteria.jobTitle)) {
      matchedCriteriaCount++;
    } else {
      missingCriteria.push({
        criteria: "jobTitle",
        missing: [
          {
            label: criteria.jobTitle,
            description: "Not Found",
          },
        ],
      });
    }
  }

  if (criteria.militaryStatus) {
    totalCriteriaCount++;
    if (
      normalize(resume.militaryStatus) === normalize(criteria.militaryStatus)
    ) {
      matchedCriteriaCount++;
    } else {
      missingCriteria.push({
        criteria: "militaryStatus",
        missing: [
          {
            label: criteria.militaryStatus,
            description: "Not Found",
          },
        ],
      });
    }
  }

  if (criteria.educationStatus) {
    totalCriteriaCount++;
    if (
      normalize(resume.educationStatus) === normalize(criteria.educationStatus)
    ) {
      matchedCriteriaCount++;
    } else {
      missingCriteria.push({
        criteria: "educationStatus",
        missing: [
          {
            label: criteria.educationStatus,
            description: "Not Found",
          },
        ],
      });
    }
  }

  if (criteria.gender) {
    totalCriteriaCount++;
    if (normalize(resume.gender) === normalize(criteria.gender)) {
      matchedCriteriaCount++;
    } else {
      missingCriteria.push({
        criteria: "gender",
        missing: [
          {
            label: criteria.gender,
            description: "Not Found",
          },
        ],
      });
    }
  }

  if (criteria.skills) {
    totalCriteriaCount += criteria.skills.length;
    const skillMisses: Missing[] = [];
    for (const skill of criteria.skills) {
      let found = false;
      for (const resumeSkill of resume.skills || []) {
        if (normalize(skill.skill) === normalize(resumeSkill.skill)) {
          found = true;
          if (skill.experience && resumeSkill.experience < skill.experience) {
            skillMisses.push({
              label: skill.skill,
              description: "Mismatched",
            });
          } else {
            matchedCriteriaCount++;
          }
          break;
        }
      }
      if (!found) {
        skillMisses.push({
          label: skill.skill,
          description: "Not Found",
        });
      }
    }
    if (skillMisses.length > 0) {
      missingCriteria.push({
        criteria: "skills",
        missing: skillMisses,
      });
    }
  }

  if (criteria.certificates) {
    totalCriteriaCount += criteria.certificates.length;
    const certificateMisses: Missing[] = [];
    for (const cert of criteria.certificates) {
      let found = false;
      for (const resumeCert of resume.certificates || []) {
        if (normalize(cert) === normalize(resumeCert.title)) {
          found = true;
          matchedCriteriaCount++;
          break;
        }
      }
      if (!found) {
        certificateMisses.push({
          label: cert,
          description: "Not Found",
        });
      }
    }
    if (certificateMisses.length > 0) {
      missingCriteria.push({
        criteria: "certificates",
        missing: certificateMisses,
      });
    }
  }

  if (criteria.languages) {
    totalCriteriaCount += criteria.languages.length;
    const languageMisses: Missing[] = [];
    for (const lang of criteria.languages) {
      let found = false;
      for (const resumeLang of resume.languages || []) {
        if (normalize(lang.language) === normalize(resumeLang.language)) {
          found = true;
          if (lang.level && resumeLang.level < lang.level) {
            languageMisses.push({
              label: lang.language,
              description: "Mismatched",
            });
          } else {
            matchedCriteriaCount++;
          }
          break;
        }
      }
      if (!found) {
        languageMisses.push({
          label: lang.language,
          description: "Not Found",
        });
      }
    }
    if (languageMisses.length > 0) {
      missingCriteria.push({
        criteria: "languages",
        missing: languageMisses,
      });
    }
  }

  const matchingPercentage =
    totalCriteriaCount > 0
      ? (matchedCriteriaCount / totalCriteriaCount) * 100
      : 100;

  return {
    missing_criteria: missingCriteria,
    matching_percentage: Number(matchingPercentage.toFixed(2)),
  };
}
