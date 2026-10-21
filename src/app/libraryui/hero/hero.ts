/**
 * Composant LibraryUI : Hero — style « Hero »
 * https://libraryui.com/components/bootstrap/hero
 * Adapté : version sombre, l'image est remplacée par l'affiche de l'événement à venir.
 */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BabiEvent } from '../../data/events';
import { Poster } from '../../shared/poster/poster';
import { FcfaPipe } from '../../shared/format';

export interface HeroContent {
  badge?: string;
  title: string;
  highlightedText?: string;
  subtitle: string;
  primaryCta: { text: string; fragment: string };
  secondaryCta?: { text: string; fragment: string };
  stats?: { value: string; label: string }[];
}

@Component({
  selector: 'ui-hero',
  imports: [RouterLink, Poster, FcfaPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {
  readonly hero = input.required<HeroContent>();
  readonly spotlight = input<BabiEvent>();
  readonly spotlightPrice = input(0);
}
