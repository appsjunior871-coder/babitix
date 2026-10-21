/**
 * Composant LibraryUI : Faq — style « Faq »
 * https://libraryui.com/components/bootstrap/faq
 * Adapté : questions de billetterie, état géré avec des signals.
 */
import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  helpful?: { yes: number; no: number };
}

export interface FaqCategory {
  id: string;
  name: string;
  icon: string;
  items: FaqItem[];
}

@Component({
  selector: 'ui-faq-accordion',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class FaqAccordionComponent {
  protected readonly searchQuery = signal('');
  protected readonly activeCategory = signal('tickets');
  protected readonly supportClicked = signal(false);

  protected readonly categories = signal<FaqCategory[]>([
    {
      id: 'tickets',
      name: 'Billets',
      icon: 'bi-ticket-perforated',
      items: [
        {
          id: 't1',
          question: 'Comment je reçois mon billet ?',
          answer: 'Dès que le paiement est validé, ton e-billet s’affiche avec un QR code unique. Il est aussi envoyé par SMS et par e-mail. Tu peux le télécharger en PDF ou simplement le montrer sur ton téléphone à l’entrée.',
          isOpen: true,
          helpful: { yes: 128, no: 4 }
        },
        {
          id: 't2',
          question: 'Puis-je acheter plusieurs billets en une seule fois ?',
          answer: 'Oui, jusqu’à 10 billets par commande et par catégorie. Chaque billet possède son propre QR code : tu peux les transférer à tes amis depuis l’onglet « Mes billets ».',
          isOpen: false,
          helpful: { yes: 64, no: 2 }
        },
        {
          id: 't3',
          question: 'Mon billet est-il remboursable ?',
          answer: 'Si l’événement est annulé ou reporté, tu es remboursé automatiquement sur le moyen de paiement utilisé, sous 5 jours ouvrés. Pour un empêchement personnel, la revente entre fans est possible jusqu’à 48 h avant l’événement.',
          isOpen: false,
          helpful: { yes: 41, no: 9 }
        }
      ]
    },
    {
      id: 'payment',
      name: 'Paiement',
      icon: 'bi-wallet2',
      items: [
        {
          id: 'p1',
          question: 'Quels moyens de paiement acceptez-vous ?',
          answer: 'Orange Money, MTN MoMo, Moov Money, Wave et les cartes Visa ou Mastercard. Le montant est toujours affiché en FCFA, frais de service inclus avant validation.',
          isOpen: false,
          helpful: { yes: 97, no: 3 }
        },
        {
          id: 'p2',
          question: 'Comment utiliser un code promo ?',
          answer: 'À l’étape « Billets », saisis ton code dans le champ « Tu as un code promo ? ». Pour tester la démo : BABI10 (-10 %), ETUDIANT (-15 %, plafonné à 5 000 FCFA) ou LIBRARYUI (-2 000 FCFA).',
          isOpen: false,
          helpful: { yes: 73, no: 5 }
        },
        {
          id: 'p3',
          question: 'Le paiement est-il sécurisé ?',
          answer: 'Les paiements Mobile Money sont confirmés directement sur ton téléphone avec ton code secret, que BabiTix ne voit jamais. Les paiements par carte passent par une connexion chiffrée et sont validés par 3-D Secure.',
          isOpen: false,
          helpful: { yes: 58, no: 1 }
        }
      ]
    },
    {
      id: 'event',
      name: 'Le jour J',
      icon: 'bi-calendar-check',
      items: [
        {
          id: 'e1',
          question: 'Que dois-je présenter à l’entrée ?',
          answer: 'Ton QR code (sur téléphone ou imprimé) et une pièce d’identité si le billet est nominatif. Pense à monter la luminosité de ton écran pour un scan plus rapide.',
          isOpen: false,
          helpful: { yes: 45, no: 2 }
        },
        {
          id: 'e2',
          question: 'Et si mon téléphone n’a plus de batterie ?',
          answer: 'Pas de panique : donne ton nom et la référence de commande (BTX-…) au guichet d’accueil, l’équipe retrouvera ton billet en quelques secondes.',
          isOpen: false,
          helpful: { yes: 39, no: 1 }
        }
      ]
    },
    {
      id: 'organizers',
      name: 'Organisateurs',
      icon: 'bi-megaphone',
      items: [
        {
          id: 'o1',
          question: 'Comment vendre les billets de mon événement ?',
          answer: 'Crée ton espace organisateur, configure tes catégories de billets et publie ta page en moins de 10 minutes. Tu suis tes ventes en temps réel et reçois tes fonds par Mobile Money chaque semaine.',
          isOpen: false,
          helpful: { yes: 22, no: 0 }
        }
      ]
    }
  ]);

  protected readonly totalQuestions = computed(() =>
    this.categories().reduce((total, cat) => total + cat.items.length, 0)
  );

  protected readonly filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.categories();
    return this.categories()
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.items.length > 0);
  });

  protected readonly resultCount = computed(() =>
    this.filteredCategories().reduce((total, cat) => total + cat.items.length, 0)
  );

  protected readonly activeCategoryData = computed(() =>
    this.categories().find(c => c.id === this.activeCategory())
  );

  toggleItem(item: FaqItem): void {
    item.isOpen = !item.isOpen;
    this.touch();
  }

  markHelpful(item: FaqItem, isHelpful: boolean): void {
    item.helpful ??= { yes: 0, no: 0 };
    if (isHelpful) item.helpful.yes++;
    else item.helpful.no++;
    this.touch();
  }

  expandAll(): void {
    this.categories().forEach(cat => cat.items.forEach(item => item.isOpen = true));
    this.touch();
  }

  collapseAll(): void {
    this.categories().forEach(cat => cat.items.forEach(item => item.isOpen = false));
    this.touch();
  }

  private touch(): void {
    this.categories.update(categories => [...categories]);
  }
}
