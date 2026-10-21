import { Component } from '@angular/core';
import { EVENTS, minPrice } from '../../data/events';
import { HeroComponent, HeroContent } from '../../libraryui/hero/hero';
import { Carousel1 } from '../../libraryui/carousel/carousel';
import { FiltersComponent } from '../../libraryui/filters/filters';
import { Carousel3 } from '../../libraryui/testimonials/testimonials';
import { FaqAccordionComponent } from '../../libraryui/faq/faq';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, Carousel1, FiltersComponent, Carousel3, FaqAccordionComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomePage {
  protected readonly events = EVENTS;
  protected readonly featured = EVENTS.filter(e => e.featured);
  protected readonly spotlight = EVENTS.find(e => e.slug === 'lagune-electro-festival')!;
  protected readonly spotlightPrice = minPrice(this.spotlight);

  protected readonly hero: HeroContent = {
    badge: 'Nouveau : paiement Wave disponible',
    title: 'Vis Babi',
    highlightedText: 'comme jamais.',
    subtitle: 'Concerts, festivals, humour, sport : trouve ta prochaine sortie en Côte d’Ivoire, réserve en 2 minutes et paie avec Mobile Money.',
    primaryCta: { text: 'Voir les événements', fragment: 'evenements' },
    secondaryCta: { text: 'Comment ça marche', fragment: 'comment' },
    stats: [
      { value: '120+', label: 'Événements par mois' },
      { value: '45k', label: 'Billets vendus' },
      { value: '4,8★', label: 'Note des fans' },
      { value: '2 min', label: 'Pour réserver' }
    ]
  };

  protected readonly howItWorks = [
    { icon: 'bi-search-heart', title: 'Trouve ta sortie', text: 'Filtre par ville, budget ou date. Les prix sont affichés en FCFA, frais compris.' },
    { icon: 'bi-phone', title: 'Paie en Mobile Money', text: 'Orange Money, MTN, Moov, Wave ou carte. Tu valides sur ton téléphone, c’est fini.' },
    { icon: 'bi-qr-code-scan', title: 'Entre avec ton QR code', text: 'Ton e-billet arrive par SMS. Présente-le à l’entrée, même hors connexion.' }
  ];
}
