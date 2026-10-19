import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Candidate, CandidatureResponse, Job } from '../models';

@Component({
  selector: 'app-candidatures',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Candidatures</h2>

    <form (ngSubmit)="apply()" class="card form">
      <h3>Postuler à un job</h3>
      <select [(ngModel)]="candidateId" name="candidateId" required>
        <option [ngValue]="null" disabled>Choisir un candidat…</option>
        <option *ngFor="let c of candidates()" [ngValue]="c.id">
          {{ c.firstname }} {{ c.lastname }} ({{ c.email }})
        </option>
      </select>
      <select [(ngModel)]="jobId" name="jobId" required>
        <option [ngValue]="null" disabled>Choisir un job…</option>
        <option *ngFor="let j of jobs()" [ngValue]="j.id" [disabled]="!j.available">
          {{ j.name }}{{ j.available ? '' : ' (fermé)' }}
        </option>
      </select>
      <textarea [(ngModel)]="motivation" name="motivation" placeholder="Lettre de motivation"></textarea>
      <div class="actions"><button type="submit">Postuler</button></div>
    </form>

    <p class="success" *ngIf="success()">{{ success() }}</p>
    <p class="error" *ngIf="error()">{{ error() }}</p>

    <table class="card" *ngIf="candidatures().length">
      <thead>
        <tr><th>#</th><th>Candidat</th><th>Job</th><th>Motivation</th><th>Date</th><th></th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of candidatures()">
          <td>{{ c.id }}</td>
          <td>{{ c.candidate?.firstname }} {{ c.candidate?.lastname }}</td>
          <td>{{ c.job?.name }}</td>
          <td>{{ c.motivation }}</td>
          <td>{{ c.applicationDate }}</td>
          <td class="actions">
            <button class="danger" (click)="remove(c)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="!candidatures().length">Aucune candidature.</p>
  `,
})
export class CandidaturesComponent implements OnInit {
  private readonly api = inject(ApiService);

  readonly candidatures = signal<CandidatureResponse[]>([]);
  readonly candidates = signal<Candidate[]>([]);
  readonly jobs = signal<Job[]>([]);
  readonly error = signal('');
  readonly success = signal('');

  candidateId: number | null = null;
  jobId: number | null = null;
  motivation = '';

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.api.getCandidatures().subscribe({
      next: (list) => this.candidatures.set(list),
      error: () => this.error.set('Impossible de charger les candidatures'),
    });
    this.api.getCandidates().subscribe({ next: (l) => this.candidates.set(l) });
    this.api.getJobs().subscribe({ next: (l) => this.jobs.set(l) });
  }

  apply(): void {
    this.error.set('');
    this.success.set('');
    this.api
      .createCandidature({
        candidateId: this.candidateId!,
        jobId: this.jobId!,
        motivation: this.motivation,
      })
      .subscribe({
        next: () => {
          this.success.set('Candidature envoyée !');
          this.candidateId = null;
          this.jobId = null;
          this.motivation = '';
          this.reload();
        },
        error: (e) =>
          this.error.set(
            typeof e?.error === 'string' ? e.error : e?.error?.message ?? 'Erreur lors de la candidature'
          ),
      });
  }

  remove(c: CandidatureResponse): void {
    this.api.deleteCandidature(c.id).subscribe({
      next: () => this.reload(),
      error: () => this.error.set('Suppression impossible'),
    });
  }
}
