/**
 * Composant LibraryUI : Message confirm ticket succes payement — style « Ticket success code QR »
 * https://libraryui.com/components/bootstrap/message-confirm-ticket-succes-payement
 * Adapté : données de la réservation, vrai QR code généré à partir de la référence,
 * code-barres dérivé de la référence.
 */
import { Component, computed, effect, input, signal } from '@angular/core';
import QRCode from 'qrcode';
import { Booking } from '../../services/booking.service';
import { BabiEvent } from '../../data/events';
import { FcfaPipe, formatEventLong, formatEventTime } from '../../shared/format';

@Component({
  selector: 'app-tickect-success-code-qr',
  imports: [FcfaPipe],
  templateUrl: './ticket-success.html',
  styleUrl: './ticket-success.scss'
})
export class TickectSuccessCodeQr {
  readonly booking = input.required<Booking>();
  readonly event = input.required<BabiEvent>();

  protected readonly qrDataUrl = signal('');

  protected readonly dateTime = computed(() => {
    const date = this.event().date;
    return `${formatEventLong(date)} • ${formatEventTime(date)}`;
  });

  protected readonly ticketCount = computed(() => this.booking().lines.reduce((s, l) => s + l.qty, 0));

  protected readonly methodColor = computed(() => {
    const colors: Record<string, string> = { orange: '#ff7900', mtn: '#ffcc00', moov: '#1d4ed8', wave: '#1dc8f2' };
    return colors[this.booking().payment.method] ?? '#10b981';
  });

  // Motif du code-barres calculé à partir des chiffres de la référence
  protected readonly barcodePattern = computed(() => {
    const digits = this.booking().ref.replace(/\D/g, '');
    const widths: number[] = [];
    for (let i = 0; i < 50; i++) {
      widths.push((Number(digits[i % digits.length]) % 4) + 1);
    }
    return widths.join(',');
  });

  protected readonly barcodeNumber = computed(() => {
    const digits = this.booking().ref.replace(/\D/g, '');
    return `${digits.slice(0, 1)} ${digits.slice(1, 7)} ${digits.slice(7)}`;
  });

  constructor() {
    effect(() => {
      const payload = `BABITIX|${this.booking().ref}|${this.event().slug}|${this.ticketCount()}`;
      QRCode.toDataURL(payload, { margin: 1, width: 220, color: { dark: '#14181f', light: '#ffffff' } })
        .then(url => this.qrDataUrl.set(url))
        .catch(() => this.qrDataUrl.set(''));
    });
  }
}
