import { Component, computed, input } from '@angular/core';
import { BabiEvent } from '../../data/events';

// Affiche générée en CSS : pas d'image externe, donc rien à charger ni à créditer
@Component({
  selector: 'app-poster',
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
  host: {
    '[class]': '"poster poster--" + event().poster.motif + " poster--" + size()',
    '[style.--poster-from]': 'event().poster.from',
    '[style.--poster-to]': 'event().poster.to',
    'role': 'img',
    '[attr.aria-label]': '"Affiche : " + event().title'
  }
})
export class Poster {
  readonly event = input.required<BabiEvent>();
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showTitle = input(true);
  readonly showDate = input(true);

  protected readonly day = computed(() => new Date(this.event().date).getDate());
  protected readonly month = computed(() =>
    new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(new Date(this.event().date)).replace('.', '')
  );
}
