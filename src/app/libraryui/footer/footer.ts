/**
 * Composant LibraryUI : Footer — style « Full footer »
 * https://libraryui.com/components/bootstrap/footer
 * Adapté : contenu BabiTix, message de confirmation de la newsletter,
 * et ligne listant les composants LibraryUI utilisés dans le projet.
 */
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface FooterLink {
  label: string;
  fragment?: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface UsedComponent {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-full-footer',
  imports: [FormsModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FullFooter {
  protected readonly brandName = 'BabiTix';
  protected readonly description =
    'La billetterie des sorties en Côte d’Ivoire : concerts, festivals, humour et sport. Réserve en 2 minutes, paie en Mobile Money, entre avec ton QR code.';

  protected readonly socialLinks = [
    { icon: 'bi-tiktok', label: 'TikTok' },
    { icon: 'bi-instagram', label: 'Instagram' },
    { icon: 'bi-facebook', label: 'Facebook' },
    { icon: 'bi-whatsapp', label: 'WhatsApp' }
  ];

  protected readonly columns: FooterColumn[] = [
    {
      title: 'Explorer',
      links: [
        { label: 'À la une', fragment: 'a-la-une' },
        { label: 'Tous les événements', fragment: 'evenements' },
        { label: 'Avis des fans', fragment: 'avis' },
        { label: 'Réveillon 2027', fragment: 'a-la-une', badge: 'Hot' }
      ]
    },
    {
      title: 'Aide',
      links: [
        { label: 'Questions fréquentes', fragment: 'faq' },
        { label: 'Paiement Mobile Money', fragment: 'faq' },
        { label: 'Remboursements', fragment: 'faq' },
        { label: 'Vendre mes billets', fragment: 'faq', badge: 'Pro' }
      ]
    }
  ];

  // Composants LibraryUI intégrés (affichés pour le vote du challenge)
  protected readonly usedComponents: UsedComponent[] = [
    { name: 'Navbar Menu', slug: 'main-menu' },
    { name: 'Hero', slug: 'hero' },
    { name: 'Carousel', slug: 'carousel' },
    { name: 'Filters', slug: 'filters' },
    { name: 'Faq', slug: 'faq' },
    { name: 'Footer', slug: 'footer' },
    { name: 'Stepper', slug: 'stepper' },
    { name: 'Coupon', slug: 'coupon' },
    { name: 'Payment', slug: 'payment' },
    { name: 'Message confirm ticket', slug: 'message-confirm-ticket-succes-payement' }
  ];

  protected newsletterEmail = '';
  protected readonly subscribed = signal(false);

  onSubscribe(): void {
    if (this.newsletterEmail.includes('@')) {
      this.subscribed.set(true);
      this.newsletterEmail = '';
    }
  }
}
