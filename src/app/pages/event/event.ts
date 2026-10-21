import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EVENTS, minPrice } from '../../data/events';
import { Poster } from '../../shared/poster/poster';
import { FcfaPipe, formatEventLong, formatEventTime } from '../../shared/format';
import { StepperComponent } from '../../libraryui/stepper/stepper';
import { OrderSummary } from '../../libraryui/coupon/order-summary';
import { CheckoutStore } from './checkout.store';

@Component({
  selector: 'app-event-page',
  imports: [RouterLink, Poster, FcfaPipe, StepperComponent, OrderSummary],
  providers: [CheckoutStore],
  templateUrl: './event.html',
  styleUrl: './event.scss'
})
export class EventPage {
  // Paramètre de route :slug (withComponentInputBinding)
  readonly slug = input.required<string>();

  private readonly store = inject(CheckoutStore);

  protected readonly event = computed(() => EVENTS.find(e => e.slug === this.slug()) ?? null);
  protected readonly minPrice = minPrice;
  protected readonly longDate = formatEventLong;
  protected readonly time = formatEventTime;

  // Autres événements, ceux de la même catégorie en premier
  protected readonly related = computed(() => {
    const event = this.event();
    if (!event) return [];
    return EVENTS.filter(e => e.slug !== event.slug)
      .sort((a, b) => Number(b.category === event.category) - Number(a.category === event.category) || a.date.localeCompare(b.date))
      .slice(0, 3);
  });

  constructor() {
    effect(() => {
      const event = this.event();
      this.store.event.set(event);
      this.store.quantities.set(event ? { [event.tickets[0].id]: 1 } : {});
      this.store.coupon.set(null);
      if (event) document.title = `${event.title} — BabiTix`;
    });
  }
}
