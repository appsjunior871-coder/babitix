# BabiTix — la billetterie des sorties à Abidjan

Projet réalisé pour le **[LibraryUI Challenge #01 — Création libre](https://libraryui.com/challenges/cree-une-interface-avec-des-composants-de-libraryui)**.

BabiTix est une billetterie en ligne pour les concerts, festivals, spectacles d'humour et événements sportifs en Côte d'Ivoire. On trouve un événement, on choisit ses billets, on applique un code promo, on paie en Mobile Money (ou par carte) et on reçoit un e-billet avec un QR code.

> **Démo en ligne : https://babitix.vercel.app**
> Les événements sont fictifs et aucun paiement n'est réellement effectué.

## Composants LibraryUI utilisés (10)

Chaque composant se trouve dans `src/app/libraryui/` et commence par un commentaire qui renvoie vers sa page sur LibraryUI. Dans l'interface, les sections concernées portent une pastille « LibraryUI » et un attribut `data-libraryui`. Le footer affiche aussi la liste complète.

| # | Composant LibraryUI | Style utilisé | Où le voir | Fichier |
|---|---|---|---|---|
| 1 | [Navbar Menu](https://libraryui.com/components/bootstrap/main-menu) | Dark | Toutes les pages | `libraryui/navbar/` |
| 2 | [Hero](https://libraryui.com/components/bootstrap/hero) | Hero | Accueil | `libraryui/hero/` |
| 3 | [Carousel](https://libraryui.com/components/bootstrap/carousel) | Carousel + témoignage slide | Accueil (« À la une » et « Avis ») | `libraryui/carousel/`, `libraryui/testimonials/` |
| 4 | [Filters](https://libraryui.com/components/bootstrap/filters) | Filtre | Accueil (« Tous les événements ») | `libraryui/filters/` |
| 5 | [Faq](https://libraryui.com/components/bootstrap/faq) | Faq | Accueil | `libraryui/faq/` |
| 6 | [Footer](https://libraryui.com/components/bootstrap/footer) | Full footer | Toutes les pages | `libraryui/footer/` |
| 7 | [Stepper](https://libraryui.com/components/bootstrap/stepper) | Stepper | Page événement (réservation) | `libraryui/stepper/` |
| 8 | [Coupon](https://libraryui.com/components/bootstrap/coupon) | Bon de réduction + Order Summary | Page événement | `libraryui/coupon/` |
| 9 | [Payment](https://libraryui.com/components/bootstrap/payment) | Mode paiement | Page événement (étape 3) | `libraryui/payment/` |
| 10 | [Message confirm ticket](https://libraryui.com/components/bootstrap/message-confirm-ticket-succes-payement) | Ticket success code QR | Page de confirmation | `libraryui/ticket-success/` |

### Ce qui a été adapté

- **Thème LibraryUI** (vert `#10b981` + corail `#FF6B6B`) appliqué à Bootstrap et à tous les composants.
- **Angular 22** : les composants utilisent la nouvelle syntaxe `@if` / `@for`, car `*ngIf` et `*ngFor` n'existent plus. L'état est géré avec des signals (application zoneless).
- **Contenu local** : prix en FCFA, paiement Orange Money, MTN MoMo, Moov Money et Wave, numéros au format ivoirien.
- **Vraie logique** : les filtres, le tri et la recherche agissent sur la liste. Le coupon recalcule le total. Le stepper valide chaque étape. Le billet contient un vrai QR code généré à partir de la référence.
- **Responsive** : menu burger, filtres en tiroir plein écran et carrousel tactile sur mobile.

## Parcours à tester

1. Sur l'accueil, cherche « lagune » dans la barre de navigation, ou filtre par budget.
2. Ouvre un événement et choisis des billets.
3. Applique le code `BABI10`, `ETUDIANT` ou `LIBRARYUI`.
4. Remplis tes informations. Le numéro doit avoir 10 chiffres, par exemple `07 01 02 03 04`.
5. Paie avec Wave ou par carte (`4242 4242 4242 4242`, date `12/28`, CVV `123`).
6. Sur la page du billet, tu trouves le QR code, le code-barres et un bouton pour l'imprimer.

## Stack

- Angular 22 (composants standalone, signals, zoneless)
- Bootstrap 5.3 + Bootstrap Icons, comme demandé dans la [documentation LibraryUI](https://libraryui.com/documentation)
- [`qrcode`](https://www.npmjs.com/package/qrcode) pour le QR code du billet
- Vitest pour les tests unitaires

## Lancer le projet

```bash
npm install
npm start
```

Ouvre ensuite http://localhost:4200.

```bash
npm test -- --watch=false   # tests unitaires
npm run build               # build de production dans dist/babitix/browser
```

## Déployer sur Vercel

Le fichier `vercel.json` est prêt : il contient la commande de build, le dossier de sortie et la redirection des routes Angular vers `index.html`.

1. Publie ce dossier sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), choisis *Add New → Project* puis importe le dépôt. Vercel lit `vercel.json`, il n'y a rien à configurer.
3. Chaque `git push` sur `main` redéploie automatiquement le site.

---

Projet de démonstration. Les noms d'événements, d'artistes et les avis sont fictifs.
