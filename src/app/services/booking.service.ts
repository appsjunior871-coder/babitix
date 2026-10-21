import { Injectable, computed, signal } from '@angular/core';

export interface BookingLine {
  ticketId: string;
  name: string;
  price: number;
  qty: number;
}

export interface Buyer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface PaymentInfo {
  method: string;
  label: string;
  last4: string;
}

export interface Booking {
  ref: string;
  eventSlug: string;
  lines: BookingLine[];
  subtotal: number;
  fees: number;
  discount: number;
  couponCode?: string;
  total: number;
  buyer: Buyer;
  payment: PaymentInfo;
  createdAt: string;
}

const STORAGE_KEY = 'babitix.bookings';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly _bookings = signal<Booking[]>(this.load());

  readonly bookings = this._bookings.asReadonly();
  readonly ticketCount = computed(() =>
    this._bookings().reduce((sum, b) => sum + b.lines.reduce((s, l) => s + l.qty, 0), 0)
  );

  find(ref: string): Booking | undefined {
    return this._bookings().find(b => b.ref === ref);
  }

  confirm(draft: Omit<Booking, 'ref' | 'createdAt'>): Booking {
    const booking: Booking = { ...draft, ref: this.newRef(), createdAt: new Date().toISOString() };
    this._bookings.update(list => [booking, ...list]);
    this.save();
    return booking;
  }

  private newRef(): string {
    const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return `BTX-${digits}`;
  }

  private load(): Booking[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Booking[];
    } catch {
      return [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._bookings()));
    } catch {
      // Stockage indisponible (navigation privée) : la réservation reste en mémoire
    }
  }
}
