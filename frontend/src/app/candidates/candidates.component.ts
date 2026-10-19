import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Candidate } from '../models';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Candidats</h2>

    <form (ngSubmit)="save()" class="card form">
      <h3>{{ editingId() ? 'Modifier le candidat #' + editingId() : 'Nouveau candidat' }}</h3>
      <input [(ngModel)]="form.firstname" name="firstname" placeholder="Prénom" required />
      <input [(ngModel)]="form.lastname" name="lastname" placeholder="Nom" required />
      <input [(ngModel)]="form.email" name="email" type="email" placeholder="Email" required />
      <div class="actions">
        <button type="submit">{{ editingId() ? 'Mettre à jour' : 'Créer' }}</button>
        <button type="button" (click)="reset()" *ngIf="editingId()">Annuler</button>
      </div>
    </form>

    <p class="error" *ngIf="error()">{{ error() }}</p>

    <table class="card" *ngIf="candidates().length">
      <thead>
        <tr><th>#</th><th>Nom</th><th>Email</th><th></th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of candidates()">
          <td>{{ c.id }}</td>
          <td>{{ c.firstname }} {{ c.lastname }}</td>
          <td>{{ c.email }}</td>
          <td class="actions">
            <button (click)="edit(c)">Modifier</button>
            <button class="danger" (click)="remove(c)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="!candidates().length">Aucun candidat.</p>
  `,
})
export class CandidatesComponent implements OnInit {
  private readonly api = inject(ApiService);

  readonly candidates = signal<Candidate[]>([]);
  readonly editingId = signal<number | null>(null);
  readonly error = signal('');

  form: Candidate = this.emptyForm();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getCandidates().subscribe({
      next: (list) => this.candidates.set(list),
      error: () => this.error.set('Impossible de charger les candidats (gateway/Eureka démarrés ?)'),
    });
  }

  save(): void {
    const id = this.editingId();
    const req = id
      ? this.api.updateCandidate(id, this.form)
      : this.api.createCandidate(this.form);
    req.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: (e) => this.error.set(e?.error?.message ?? 'Erreur lors de l’enregistrement'),
    });
  }

  edit(c: Candidate): void {
    this.editingId.set(c.id!);
    this.form = { firstname: c.firstname, lastname: c.lastname, email: c.email };
  }

  remove(c: Candidate): void {
    this.api.deleteCandidate(c.id!).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Suppression impossible'),
    });
  }

  reset(): void {
    this.editingId.set(null);
    this.form = this.emptyForm();
    this.error.set('');
  }

  private emptyForm(): Candidate {
    return { firstname: '', lastname: '', email: '' };
  }
}
