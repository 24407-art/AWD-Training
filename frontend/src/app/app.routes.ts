import { Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { JobsComponent } from './jobs/jobs.component';
import { CandidaturesComponent } from './candidatures/candidatures.component';

export const routes: Routes = [
  { path: '', redirectTo: 'candidatures', pathMatch: 'full' },
  { path: 'candidates', component: CandidatesComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'candidatures', component: CandidaturesComponent },
];
