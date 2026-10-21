/**
 * Composant LibraryUI : Carousel — style « Carousel »
 * https://libraryui.com/components/bootstrap/carousel
 * Adapté : slides alimentées par les événements à la une, défilement automatique
 * (en pause au survol), swipe tactile et navigation clavier.
 */
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BabiEvent, minPrice } from '../../data/events';
import { Poster } from '../../shared/poster/poster';
import { FcfaPipe, formatEventDay, formatEventTime } from '../../shared/format';

@Component({
  selector: 'ui-carousel-1',
  imports: [RouterLink, Poster, FcfaPipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel1 {
  readonly slides = input.required<BabiEvent[]>();
  readonly interval = input(6000);

  protected readonly current = signal(0);
  protected readonly minPrice = minPrice;
  protected readonly day = formatEventDay;
  protected readonly time = formatEventTime;

  private paused = false;
  private touchStartX = 0;

  constructor() {
    const timer = setInterval(() => {
      if (!this.paused) this.next();
    }, this.interval());
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  prev() { this.current.update(c => (c - 1 + this.slides().length) % this.slides().length); }
  next() { this.current.update(c => (c + 1) % this.slides().length); }
  go(i: number) { this.current.set(i); }

  protected pause(paused: boolean) { this.paused = paused; }

  protected onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].clientX;
    this.paused = true;
  }

  protected onTouchEnd(e: TouchEvent) {
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) > 40) delta < 0 ? this.next() : this.prev();
    this.paused = false;
  }
}
