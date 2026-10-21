import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EVENTS } from '../../data/events';
import { BookingService } from '../../services/booking.service';
import { TickectSuccessCodeQr } from '../../libraryui/ticket-success/ticket-success';

@Component({
  selector: 'app-confirmation-page',
  imports: [RouterLink, TickectSuccessCodeQr],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss'
})
export class ConfirmationPage {
  // Paramètre de route :ref
  readonly ref = input.required<string>();

  private readonly bookings = inject(BookingService);

  protected readonly booking = computed(() => this.bookings.find(this.ref()) ?? null);
  protected readonly event = computed(() => {
    const booking = this.booking();
    return booking ? EVENTS.find(e => e.slug === booking.eventSlug) ?? null : null;
  });

  protected print(): void {
    window.print();
  }
}
