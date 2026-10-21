export type EventCategory = 'Concert' | 'Festival' | 'Humour' | 'Sport' | 'Théâtre' | 'Expo' | 'Soirée';

export interface TicketType {
  id: string;
  name: string;
  price: number;
  perks: string;
  remaining: number;
}

export interface Poster {
  from: string;
  to: string;
  icon: string;
  motif: 'waves' | 'dots' | 'rays' | 'grid';
}

export interface BabiEvent {
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  date: string; // ISO, heure locale d'Abidjan (UTC+0)
  endDate?: string;
  venue: string;
  city: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  description: string;
  lineup: string[];
  tickets: TicketType[];
  poster: Poster;
}

// Événements fictifs pour la démo
export const EVENTS: BabiEvent[] = [
  {
    slug: 'nuit-du-coupe-decale',
    title: 'La Nuit du Coupé-Décalé',
    tagline: '6 heures de son, 12 artistes, une seule piste de danse.',
    category: 'Concert',
    date: '2026-11-07T20:00:00',
    venue: 'Arena de Treichville',
    city: 'Abidjan',
    rating: 4.8,
    reviews: 312,
    featured: true,
    description:
      "Le rendez-vous incontournable des amoureux du coupé-décalé. DJs, chorégraphes et artistes de la nouvelle génération se relaient toute la nuit sur une scène à 360°.",
    lineup: ['DJ Kôrô', 'Les Frères Atalaku', 'Miss Décalé', 'Bébé Boucan'],
    tickets: [
      { id: 'std', name: 'Grand public', price: 5000, perks: 'Accès fosse', remaining: 420 },
      { id: 'vip', name: 'VIP', price: 15000, perks: 'Espace lounge + 1 boisson', remaining: 80 },
      { id: 'gold', name: 'Carré Or', price: 35000, perks: 'Table, bouteille, accès backstage', remaining: 12 }
    ],
    poster: { from: '#f97316', to: '#db2777', icon: 'bi-music-note-beamed', motif: 'rays' }
  },
  {
    slug: 'lagune-electro-festival',
    title: 'Lagune Électro Festival',
    tagline: 'Deux jours de musique électronique les pieds dans le sable.',
    category: 'Festival',
    date: '2026-11-21T16:00:00',
    endDate: '2026-11-22T23:59:00',
    venue: 'Plage de Grand-Bassam',
    city: 'Grand-Bassam',
    rating: 4.9,
    reviews: 541,
    featured: true,
    description:
      "Afro-house, amapiano et électro sur trois scènes face à l'océan. Food trucks, village artisanal et navettes depuis Abidjan inclus dans le pass 2 jours.",
    lineup: ['Sôrô Collective', 'Amani B2B Kwamé', 'Lagoon Sound System', 'Nana Waves'],
    tickets: [
      { id: 'day', name: 'Pass 1 jour', price: 10000, perks: 'Accès samedi ou dimanche', remaining: 900 },
      { id: 'weekend', name: 'Pass 2 jours', price: 18000, perks: 'Week-end complet + navette', remaining: 350 },
      { id: 'backstage', name: 'Backstage', price: 45000, perks: 'Accès artistes + open bar', remaining: 25 }
    ],
    poster: { from: '#0ea5e9', to: '#10b981', icon: 'bi-soundwave', motif: 'waves' }
  },
  {
    slug: 'abidjan-comedy-night',
    title: 'Abidjan Comedy Night',
    tagline: 'Les meilleurs humoristes de Babi sur une même scène.',
    category: 'Humour',
    date: '2026-11-14T21:00:00',
    venue: 'Théâtre de la Cité, Cocody',
    city: 'Abidjan',
    rating: 4.7,
    reviews: 198,
    description:
      "Stand-up, sketches et improvisation : une soirée pour rire de la vie à Abidjan, des gbakas aux réunions de famille.",
    lineup: ['Tonton Gbê', 'La Go de Yop', 'Kader le Philosophe'],
    tickets: [
      { id: 'std', name: 'Placement libre', price: 7500, perks: 'Accès salle', remaining: 160 },
      { id: 'front', name: 'Premier rang', price: 12000, perks: 'Rangs A à C', remaining: 30 }
    ],
    poster: { from: '#facc15', to: '#f97316', icon: 'bi-emoji-laughing', motif: 'dots' }
  },
  {
    slug: 'afro-jazz-au-plateau',
    title: 'Afro Jazz au Plateau',
    tagline: 'Jazz, soul et couchers de soleil sur la lagune Ébrié.',
    category: 'Concert',
    date: '2026-11-28T19:30:00',
    venue: 'Rooftop du Plateau',
    city: 'Abidjan',
    rating: 4.6,
    reviews: 87,
    description:
      "Un quartet live, une vue imprenable sur la lagune et une carte de cocktails signature. Places limitées pour garder l'ambiance intimiste.",
    lineup: ['Akissi Quartet', 'Yao Saxo', 'Grâce N.'],
    tickets: [
      { id: 'std', name: 'Debout', price: 10000, perks: '1 cocktail offert', remaining: 60 },
      { id: 'table', name: 'Table pour 2', price: 20000, perks: 'Table réservée + tapas', remaining: 14 }
    ],
    poster: { from: '#6366f1', to: '#0f172a', icon: 'bi-music-note-list', motif: 'grid' }
  },
  {
    slug: 'zouglou-live-session',
    title: 'Zouglou Live Session',
    tagline: 'Le zouglou comme on l’aime : en live et en chœur.',
    category: 'Concert',
    date: '2026-12-05T20:00:00',
    venue: 'Espace Culturel de Yopougon',
    city: 'Abidjan',
    rating: 4.8,
    reviews: 264,
    description:
      "Les groupes qui ont fait vibrer les maquis reprennent leurs classiques avec un orchestre complet. Chaque refrain se chante à pleins poumons.",
    lineup: ['Les Côtés Gâtés', 'Magic Zouglou', 'Petit Yodé Junior'],
    tickets: [
      { id: 'std', name: 'Grand public', price: 3000, perks: 'Accès esplanade', remaining: 1200 },
      { id: 'vip', name: 'VIP', price: 10000, perks: 'Tribune assise', remaining: 150 }
    ],
    poster: { from: '#16a34a', to: '#f97316', icon: 'bi-mic-fill', motif: 'rays' }
  },
  {
    slug: 'marathon-de-babi',
    title: 'Marathon de Babi 2026',
    tagline: '10 km, semi ou marathon : traverse Abidjan en courant.',
    category: 'Sport',
    date: '2026-12-13T06:30:00',
    venue: 'Départ pont Henri-Konan-Bédié',
    city: 'Abidjan',
    rating: 4.5,
    reviews: 143,
    description:
      "Un parcours qui relie Cocody, le Plateau et Marcory. Dossard, t-shirt technique et médaille finisher inclus dans chaque inscription.",
    lineup: ['10 km', 'Semi-marathon', 'Marathon'],
    tickets: [
      { id: '10k', name: '10 km', price: 5000, perks: 'Dossard + t-shirt', remaining: 800 },
      { id: 'semi', name: 'Semi-marathon', price: 8000, perks: 'Dossard + t-shirt + médaille', remaining: 400 },
      { id: 'full', name: 'Marathon', price: 12000, perks: 'Pack complet + chronométrage', remaining: 200 }
    ],
    poster: { from: '#10b981', to: '#0f766e', icon: 'bi-trophy-fill', motif: 'grid' }
  },
  {
    slug: 'les-bonnes-manieres-de-babi',
    title: 'Les Bonnes Manières de Babi',
    tagline: 'Une comédie de mœurs signée par la troupe Ébrié.',
    category: 'Théâtre',
    date: '2026-12-12T18:00:00',
    venue: 'Salle Ki-Ten, Marcory',
    city: 'Abidjan',
    rating: 4.4,
    reviews: 61,
    description:
      "Quand une famille de Marcory reçoit la belle-famille venue de Paris, les malentendus s'enchaînent. Une pièce drôle et tendre sur les codes abidjanais.",
    lineup: ['Troupe Ébrié', 'Mise en scène : A. Koné'],
    tickets: [
      { id: 'std', name: 'Placement libre', price: 5000, perks: 'Accès salle', remaining: 120 }
    ],
    poster: { from: '#be123c', to: '#7c2d12', icon: 'bi-mask', motif: 'dots' }
  },
  {
    slug: 'marche-des-createurs',
    title: 'Marché des Créateurs',
    tagline: 'Mode, déco et artisanat 100 % made in Côte d’Ivoire.',
    category: 'Expo',
    date: '2026-12-19T10:00:00',
    endDate: '2026-12-20T19:00:00',
    venue: 'Parc des Expositions, Port-Bouët',
    city: 'Abidjan',
    rating: 4.6,
    reviews: 95,
    description:
      "Plus de 150 créateurs ivoiriens : pagne tissé, bijoux, cosmétiques naturels et design. Idéal pour les cadeaux de fin d'année.",
    lineup: ['150 exposants', 'Défilé samedi 17 h', 'Ateliers enfants'],
    tickets: [
      { id: 'std', name: 'Entrée 1 jour', price: 2000, perks: 'Accès exposition', remaining: 2000 },
      { id: 'pass', name: 'Pass week-end', price: 3000, perks: 'Samedi + dimanche', remaining: 800 }
    ],
    poster: { from: '#d97706', to: '#16a34a', icon: 'bi-bag-heart-fill', motif: 'waves' }
  },
  {
    slug: 'bouake-rap-contest',
    title: 'Bouaké Rap Contest',
    tagline: 'Le tremplin du rap ivoire revient au centre du pays.',
    category: 'Concert',
    date: '2026-11-29T17:00:00',
    venue: 'Stade de la Paix',
    city: 'Bouaké',
    rating: 4.5,
    reviews: 72,
    description:
      "16 jeunes rappeurs s'affrontent en battles devant un jury de producteurs. Le vainqueur enregistre un EP et fait la première partie de la tournée nationale.",
    lineup: ['16 finalistes', 'Jury de producteurs', 'Showcase final'],
    tickets: [
      { id: 'std', name: 'Grand public', price: 2000, perks: 'Accès tribune', remaining: 1500 },
      { id: 'vip', name: 'VIP', price: 7500, perks: 'Bord de scène', remaining: 100 }
    ],
    poster: { from: '#111827', to: '#dc2626', icon: 'bi-fire', motif: 'grid' }
  },
  {
    slug: 'reveillon-sur-la-lagune',
    title: 'Réveillon sur la Lagune',
    tagline: 'Passe à 2027 sur un bateau, entre feux d’artifice et live band.',
    category: 'Soirée',
    date: '2026-12-31T22:00:00',
    venue: 'Embarcadère du Plateau',
    city: 'Abidjan',
    rating: 4.9,
    reviews: 210,
    featured: true,
    description:
      "Croisière de 5 heures sur la lagune Ébrié : dîner, DJ set, orchestre live et vue sur les feux d'artifice de minuit depuis le pont supérieur.",
    lineup: ['Live band Ébrié Groove', 'DJ Nana Waves', 'Dîner gastronomique'],
    tickets: [
      { id: 'std', name: 'Pont principal', price: 25000, perks: 'Dîner + soirée', remaining: 90 },
      { id: 'vip', name: 'Pont supérieur', price: 60000, perks: 'Dîner premium + champagne', remaining: 20 }
    ],
    poster: { from: '#0f172a', to: '#7c3aed', icon: 'bi-stars', motif: 'dots' }
  }
];

export function minPrice(event: BabiEvent): number {
  return Math.min(...event.tickets.map(t => t.price));
}
