import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Job, JobRequest } from '../models';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Jobs</h2>

    <form (ngSubmit)="save()" class="card form">
      <h3>Nouveau job</h3>
      <input [(ngModel)]="form.name" name="name" placeholder="Intitulé" required />
      <input [(ngModel)]="form.description" name="description" placeholder="Description" />
      <input [(ngModel)]="form.date" name="date" type="date" required />
      <input
        [(ngModel)]="form.categoryId"
        name="categoryId"
        type="number"
        min="1"
        placeholder="Id catégorie"
        required
      />
      <label>
        <input [(ngModel)]="form.available" name="available" type="checkbox" /> Disponible
      </label>
      <div class="actions"><button type="submit">Créer</button></div>
    </form>

    <p class="error" *ngIf="error()">{{ error() }}</p>

    <table class="card" *ngIf="jobs().length">
      <thead>
        <tr><th>#</th><th>Intitulé</th><th>Description</th><th>Date</th><th>Catégorie</th><th>Disponible</th><th></th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let j of jobs()">
          <td>{{ j.id }}</td>
          <td>{{ j.name }}</td>
          <td>{{ j.description }}</td>
          <td>{{ j.date }}</td>
          <td>{{ j.category?.name ?? '-' }}</td>
          <td>{{ j.available ? 'Oui' : 'Non' }}</td>
          <td class="actions">
            <button class="danger" (click)="remove(j)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="!jobs().length">Aucun job.</p>
  `,
})
export class JobsComponent implements OnInit {
  private readonly api = inject(ApiService);

  readonly jobs = signal<Job[]>([]);
  readonly error = signal('');

  form: JobRequest = this.emptyForm();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getJobs().subscribe({
      next: (list) => this.jobs.set(list),
      error: () => this.error.set('Impossible de charger les jobs (gateway/Eureka démarrés ?)'),
    });
  }

  save(): void {
    this.api.createJob(this.form).subscribe({
      next: () => {
        this.form = this.emptyForm();
        this.load();
      },
      error: (e) => this.error.set(e?.error?.message ?? 'Erreur lors de la création'),
    });
  }

  remove(j: Job): void {
    this.api.deleteJob(j.id!).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Suppression impossible'),
    });
  }

  private emptyForm(): JobRequest {
    return {
      name: '',
      description: '',
      available: true,
      date: new Date().toISOString().slice(0, 10),
      categoryId: 1,
    };
  }
}
