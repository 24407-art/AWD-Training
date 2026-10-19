import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Candidate,
  Candidature,
  CandidatureResponse,
  Job,
  JobRequest,
} from '../models';

/**
 * All calls go through the Spring Cloud Gateway (port 8080).
 * Gateway routes:
 *   /mic1/** -> CANDIDAT
 *   /mic2/** -> JOB
 *   /mic3/** -> CANDITATURE
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080';

  // ---- Candidat (mic1) ----
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/mic1/candidates`);
  }

  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseUrl}/mic1/candidates/${id}`);
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.baseUrl}/mic1/candidates`, candidate);
  }

  updateCandidate(id: number, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseUrl}/mic1/candidates/${id}`, candidate);
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/mic1/candidates/${id}`);
  }

  // ---- Job (mic2) ----
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/mic2/jobs`);
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/mic2/jobs/${id}`);
  }

  createJob(job: JobRequest): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/mic2/jobs`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/mic2/jobs/${id}`);
  }

  // ---- Candidature (mic3) ----
  getCandidatures(): Observable<CandidatureResponse[]> {
    return this.http.get<CandidatureResponse[]>(`${this.baseUrl}/mic3/candidature`);
  }

  getCandidature(id: number): Observable<CandidatureResponse> {
    return this.http.get<CandidatureResponse>(`${this.baseUrl}/mic3/candidature/${id}`);
  }

  /** A candidate applies to a job. */
  createCandidature(candidature: Candidature): Observable<CandidatureResponse> {
    return this.http.post<CandidatureResponse>(`${this.baseUrl}/mic3/candidature`, candidature);
  }

  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/mic3/candidature/${id}`);
  }
}
