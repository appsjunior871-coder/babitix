/**
 * Composant LibraryUI : Carousel — style « temoignage slide »
 * https://libraryui.com/components/bootstrap/carousel
 * Adapté : avis de festivaliers, transition en fondu.
 */
import { Component, signal } from '@angular/core';

interface Testimonial {
  color: string;
  initials: string;
  name: string;
  role: string;
  text: string;
  stars: number;
}

@Component({
  selector: 'ui-carousel-3',
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss'
})
export class Carousel3 {
  protected readonly current = signal(0);

  protected readonly testimonials: Testimonial[] = [
    {
      color: '#10b981',
      initials: 'AK',
      name: 'Aya Kouassi',
      role: 'Lagune Électro Festival · Grand-Bassam',
      text: '« J’ai payé avec Wave en 30 secondes et mon billet est arrivé par SMS. À l’entrée, ils ont scanné le QR code sur mon téléphone : zéro file d’attente. »',
      stars: 5
    },
    {
      color: '#FF6B6B',
      initials: 'KB',
      name: 'Koffi Bamba',
      role: 'Abidjan Comedy Night · Cocody',
      text: '« Enfin une billetterie pensée pour nous : les prix en FCFA, Orange Money, et le code promo étudiant qui marche vraiment. J’ai emmené toute ma promo. »',
      stars: 5
    },
    {
      color: '#f59e0b',
      initials: 'MT',
      name: 'Mariam Touré',
      role: 'Réveillon sur la Lagune · Plateau',
      text: '« Le filtre par budget m’a fait gagner un temps fou pour trouver une sortie à moins de 10 000 FCFA. Interface claire, même sur mon vieux téléphone. »',
      stars: 4
    }
  ];

  prev() { this.current.update(c => (c - 1 + this.testimonials.length) % this.testimonials.length); }
  next() { this.current.update(c => (c + 1) % this.testimonials.length); }
  stars(n: number) { return Array(n).fill(0); }
}
