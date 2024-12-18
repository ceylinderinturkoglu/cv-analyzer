export type Skill = { skill: string; experience: string };

export type Criteria = {
  jobTitle: string;
  educationStatus: string;
  militaryStatus: string;
  gender: string;
  skills: Skill[];
  certificates: string[];
  languages: Language[];
};

export interface Contact {
  email: string;
  phone: string;
  address: string;
  links: {
    name: string;
    url: string;
  }[];
}

export interface Education {
  degree: string;
  department: string;
  institution: string;
  start_date: string;
  end_date: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  description: string;
  start_date: string;
  end_date: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface Certificate {
  title: string;
  source: string;
}

export interface Project {
  title: string;
  source: string;
  website: string;
  description: string;
  skills: string[];
}

export interface Reference {
  fullname: string;
  jobTitle: string;
  contact: {
    email: string;
    phone: string;
  };
}

export interface Resume {
  name: string;
  jobTitle: string;
  about: string;
  educationStatus: string;
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  references: Reference[];
  contact: Contact;
  militaryStatus: "Completed" | "Deferred" | "Pending" | null;
  gender: string;
}

export type Missing = {
  label: string;
  description: "Not Found" | "Mismatched";
};

export type MissingCriteria = {
  criteria: string;
  missing: Missing[];
};

export interface Analysis {
  matching_percentage: number | null;
  missing_criteria: MissingCriteria[];
}
