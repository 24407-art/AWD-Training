export interface Address {
  id?: number;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

export interface Candidate {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  address?: Address | null;
}

export interface Category {
  id?: number;
  name: string;
}

export interface Job {
  id?: number;
  name: string;
  description: string;
  available: boolean;
  date: string; // yyyy-MM-dd
  category?: Category;
}

export interface JobRequest {
  name: string;
  description: string;
  available: boolean;
  date: string;
  categoryId: number;
}

export interface Candidature {
  id?: number;
  candidateId: number;
  jobId: number;
  motivation?: string;
  applicationDate?: string;
}

export interface CandidatureResponse {
  id: number;
  motivation: string;
  applicationDate: string;
  candidate: Candidate;
  job: Job;
}
