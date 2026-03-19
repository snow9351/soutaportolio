export type ProjectType = "mobile" | "web" |"Trading bots" | "ai";
export type ProjectCategory = "personal" | "client-work";
export type ProjectPriority = "high" | "medium" | "low";
export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectLinkEntry = { ios?: string; android?: string };
export type ProjectSourceEntry = { FE?: string; BE?: string };

export interface Project {
  title: string;
  type?: ProjectType;
  period?: string;
  category?: ProjectCategory;
  priority?: ProjectPriority;
  status?: ProjectStatus;
  image?: string;
  images?: string[];
  link?: string | ProjectLinkEntry[];
  source?: string | ProjectSourceEntry[];
  tech?: string[];
  description?: string;
  des?: string; // Legacy field, kept for backward compatibility
  role?: string;
  achievements?: string[];
}
