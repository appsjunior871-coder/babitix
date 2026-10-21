# 🎟️ BabiTix — la billetterie des sorties à Abidjan

**Démo en ligne : [babitix.vercel.app](https://babitix.vercel.app)**

BabiTix est une billetterie en ligne pour les concerts, festivals, spectacles d'humour et événements sportifs en Côte d'Ivoire. Le visiteur trouve un événement, choisit ses billets, applique un code promo, paie en Mobile Money ou par carte et reçoit un e-billet avec un QR code.

Ce projet a été réalisé pour le **[LibraryUI Challenge #01 — Création libre](https://libraryui.com/challenges/cree-une-interface-avec-des-composants-de-libraryui)**. Il est construit avec Angular, Bootstrap et **10 composants [LibraryUI](https://libraryui.com)**.

> Il s'agit d'un projet de démonstration : les événements, les artistes et les avis sont fictifs, et aucun paiement n'est réellement effectué.

---

## ✨ Fonctionnalités

- **Agenda filtrable** : catégorie, ville, budget en FCFA, période et note minimum, avec tri et recherche depuis la barre de navigation.
- **Événements à la une** dans un carrousel automatique, utilisable au doigt sur mobile.
- **Réservation en 3 étapes** : billets, informations, puis paiement. Chaque étape est validée avant de passer à la suivante.
- **Codes promo** avec recalcul immédiat du total, frais de service compris.
- **Paiement Mobile Money** (Orange Money, MTN MoMo, Moov Money, Wave) ou par carte bancaire.
- **E-billet** avec un vrai QR code généré à partir de la référence, un code-barres et une version imprimable.
- **Responsive** : menu burger, filtres en tiroir plein écran et mise en page adaptée au mobile, à la tablette et à l'ordinateur.

## 🧩 Composants LibraryUI utilisés

| # | Composant LibraryUI | Style | Où le voir | Code source |
|---|---|---|---|---|
| 1 | [Navbar Menu](https://libraryui.com/components/bootstrap/main-menu) | Dark | Toutes les pages | [`navbar/`](src/app/libraryui/navbar) |
| 2 | [Hero](https://libraryui.com/components/bootstrap/hero) | Hero | Accueil | [`hero/`](src/app/libraryui/hero) |
| 3 | [Carousel](https://libraryui.com/components/bootstrap/carousel) | Carousel + témoignage slide | Accueil, sections « À la une » et « Avis » | [`carousel/`](src/app/libraryui/carousel), [`testimonials/`](src/app/libraryui/testimonials) |
| 4 | [Filters](https://libraryui.com/components/bootstrap/filters) | Filtre | Accueil, section « Tous les événements » | [`filters/`](src/app/libraryui/filters) |
| 5 | [Faq](https://libraryui.com/components/bootstrap/faq) | Faq | Accueil | [`faq/`](src/app/libraryui/faq) |
| 6 | [Footer](https://libraryui.com/components/bootstrap/footer) | Full footer | Toutes les pages | [`footer/`](src/app/libraryui/footer) |
| 7 | [Stepper](https://libraryui.com/components/bootstrap/stepper) | Stepper | Page d'un événement | [`stepper/`](src/app/libraryui/stepper) |
| 8 | [Coupon](https://libraryui.com/components/bootstrap/coupon) | Bon de réduction + récapitulatif | Page d'un événement | [`coupon/`](src/app/libraryui/coupon) |
| 9 | [Payment](https://libraryui.com/components/bootstrap/payment) | Mode paiement | Page d'un événement, étape 3 | [`payment/`](src/app/libraryui/payment) |
| 10 | [Message confirm ticket](https://libraryui.com/components/bootstrap/message-confirm-ticket-succes-payement) | Ticket success code QR | Page de confirmation | [`ticket-success/`](src/app/libraryui/ticket-success) |

Pour les repérer facilement dans l'interface :
- chaque section concernée porte une pastille verte **« LibraryUI »** qui renvoie vers la page du composant ;
- le pied de page liste tous les composants utilisés ;
- dans le code, chaque composant commence par un commentaire indiquant son origine, et son élément principal porte un attribut `data-libraryui`.

### Adaptations apportées aux composants

- **Thème** : la palette de LibraryUI (vert `#10b981` et corail `#FF6B6B`) est appliquée à Bootstrap et à tous les composants.
- **Angular 22** : les modèles utilisent la syntaxe `@if` / `@for`, qui remplace `*ngIf` et `*ngFor`. L'état est géré avec des signals, dans une application sans Zone.js.
- **Logique réelle** : les filtres, le tri, la recherche, les codes promo et la validation du formulaire fonctionnent vraiment. Ce ne sont pas des maquettes statiques.
- **Contexte local** : prix en FCFA, moyens de paiement ivoiriens et numéros de téléphone au format local.

## 🚀 Essayer la démo

1. Sur [l'accueil](https://babitix.vercel.app), cherchez « lagune » dans la barre de navigation, ou réglez le budget dans les filtres.
2. Ouvrez un événement et choisissez vos billets.
3. Appliquez l'un des codes promo de démonstration : `BABI10`, `ETUDIANT` ou `LIBRARYUI`.
4. Saisissez vos informations. Le numéro doit avoir 10 chiffres, par exemple `07 01 02 03 04`.
5. Payez avec Wave, ou par carte avec le numéro de test `4242 4242 4242 4242` (date `12/28`, CVV `123`).
6. Votre billet s'affiche avec son QR code et peut être imprimé.

## 🛠️ Stack technique

- [Angular 22](https://angular.dev) : composants standalone, signals, application sans Zone.js
- [Bootstrap 5.3](https://getbootstrap.com) et [Bootstrap Icons](https://icons.getbootstrap.com), selon la [documentation LibraryUI](https://libraryui.com/documentation)
- [qrcode](https://www.npmjs.com/package/qrcode) pour générer le QR code des billets
- [Vitest](https://vitest.dev) pour les tests unitaires
- Hébergement sur [Vercel](https://vercel.com)

## 💻 Lancer le projet en local

Prérequis : Node.js 22.22, 24.15 ou plus récent.

```bash
git clone https://github.com/appsjunior871-coder/babitix.git
cd babitix
npm install
npm start
```

L'application est alors disponible sur http://localhost:4200.

| Commande | Rôle |
|---|---|
| `npm start` | Serveur de développement |
| `npm test -- --watch=false` | Tests unitaires |
| `npm run build` | Build de production dans `dist/babitix/browser` |

## 📁 Structure

```
src/app/
├── libraryui/   # les 10 composants LibraryUI adaptés
├── pages/       # accueil, page d'un événement, confirmation
├── services/    # réservations et recherche
├── data/        # événements de démonstration
└── shared/      # affiches générées en CSS, formatage FCFA et dates
```

## 👤 Auteur

Réalisé par **Oyéwolé Tinin AGBOROU** ([@appsjunior871-coder](https://github.com/appsjunior871-coder)) pour le LibraryUI Challenge #01, en octobre 2026.

Merci à [LibraryUI](https://libraryui.com) pour sa bibliothèque de composants Angular.
