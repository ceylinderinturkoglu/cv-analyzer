import { Criteria } from "@/constants/types";
import { analyzingResume } from "@/helpers/resume";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import GroupSection from "@/components/CriteriaForm/GroupSection";
import SkillItem from "@/components/CriteriaForm/SkillItem";
import LanguageItem from "@/components/CriteriaForm/LanguageItem";
import CertificateItem from "@/components/CriteriaForm/CertificateItem";
import { useSelector, useDispatch } from "react-redux";
import { updateCriteria } from "@/store/criteriaSlice";
import type { RootState, AppDispatch } from "@/store";
import { setAnalysis } from "@/store/analysisSlice";
import { educations, jobTitles, militaryStatus } from "@/constants/data";
import ScrollButton from "../ScrollButton";

export default function CriteriaForm() {
  const dispatch = useDispatch<AppDispatch>();
  const criteria = useSelector((state: RootState) => state.criteria);
  const resume = useSelector((state: RootState) => state.resume);

  const handleChange = (name: keyof Criteria, value: any) => {
    dispatch(updateCriteria({ [name]: value }));
  };

  const handleAnalyze = () => {
    try {
      const analysis = analyzingResume(resume, criteria);
      dispatch(setAnalysis(analysis));
    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      const element = document.getElementById("resume");
      element?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center gap-6 p-4 pt-16 pb-20"
      id="criteria"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Kriterler</h1>
        <p className="text-slate-300 text-sm font-light">
          İşe alım kriterlerinizi belirleyin ve ilgili özgeçmişi değerlendirin.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <Autocomplete
            label="Ünvan"
            size="sm"
            onInputChange={(value) => handleChange("jobTitle", value)}
          >
            {jobTitles.map((option) => (
              <AutocompleteItem key={option}>{option}</AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            label="Eğitim Durumu"
            size="sm"
            onInputChange={(value) => handleChange("educationStatus", value)}
          >
            {educations.map((option) => (
              <AutocompleteItem key={option}>{option}</AutocompleteItem>
            ))}
          </Autocomplete>
          <Select
            label="Askerlik Durumu"
            size="sm"
            selectedKeys={[criteria.militaryStatus]}
            onChange={(e) => handleChange("militaryStatus", e.target.value)}
          >
            {militaryStatus.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>
          <RadioGroup
            size="md"
            label="Cinsiyet"
            name="gender"
            orientation="horizontal"
            className="text-sm min-w-[200px]"
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <Radio value="female">Kadın</Radio>
            <Radio value="male">Erkek</Radio>
          </RadioGroup>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3  gap-6">
          <GroupSection
            title="Beceriler"
            itemType="skills"
            defaultItemValue={{ skill: "", experience: "" }}
            items={criteria.skills}
            renderItem={(item, index) => (
              <SkillItem skill={item} index={index} />
            )}
          />
          <GroupSection
            title="Sertifikalar"
            itemType="certificates"
            defaultItemValue={""}
            items={criteria.certificates}
            renderItem={(item, index) => (
              <CertificateItem certificate={item} index={index} />
            )}
          />
          <GroupSection
            title="Diller"
            itemType="languages"
            defaultItemValue={{ language: "", level: "" }}
            items={criteria.languages}
            renderItem={(item, index) => (
              <LanguageItem language={item} index={index} />
            )}
          />
        </div>

        <Button
          color="primary"
          variant="shadow"
          className="min-w-[200px] self-center"
          onClick={handleAnalyze}
        >
          Analizi Başlat
        </Button>
      </div>
      <ScrollButton direction="down" text="Özgeçmişi İncele" id="resume" />
    </div>
  );
}
