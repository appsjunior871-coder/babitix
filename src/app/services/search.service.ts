import { Injectable, signal } from '@angular/core';

// Recherche partagée entre la barre de navigation et la liste des événements
@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly query = signal('');
}
