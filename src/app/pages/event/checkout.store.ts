import { Injectable, computed, signal } from '@angular/core';
import { BabiEvent } from '../../data/events';
import { BookingLine, Buyer } from '../../services/booking.service';

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minPurchase?: number;
  maxDiscount?: number;
  isActive: boolean;
}

export type PaymentMethodId = 'orange' | 'mtn' | 'moov' | 'wave' | 'card';

export interface PaymentDetails {
  method: PaymentMethodId;
  phone: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

// Codes promo de la démo (cités dans la FAQ)
export const COUPONS: Coupon[] = [
  { code: 'BABI10', type: 'percentage', value: 10, description: '10 % de réduction sur tes billets', isActive: true },
  { code: 'ETUDIANT', type: 'percentage', value: 15, description: '15 % pour les étudiants, plafonné à 5 000 FCFA', maxDiscount: 5000, isActive: true },
  { code: 'LIBRARYUI', type: 'fixed', value: 2000, description: '2 000 FCFA offerts aux participants du challenge', minPurchase: 5000, isActive: true },
  { code: 'NOEL2025', type: 'percentage', value: 20, description: 'Offre de Noël 2025', isActive: false }
];

export const MAX_PER_TICKET = 10;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

// État partagé de la réservation, fourni par la page événement
@Injectable()
export class CheckoutStore {
  readonly event = signal<BabiEvent | null>(null);
  readonly quantities = signal<Record<string, number>>({});
  readonly coupon = signal<Coupon | null>(null);
  readonly buyer = signal<Buyer>({ firstName: '', lastName: '', phone: '', email: '' });
  readonly payment = signal<PaymentDetails>({
    method: 'orange',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  readonly termsAccepted = signal(false);

  readonly lines = computed<BookingLine[]>(() => {
    const event = this.event();
    if (!event) return [];
    const qty = this.quantities();
    return event.tickets
      .filter(t => (qty[t.id] ?? 0) > 0)
      .map(t => ({ ticketId: t.id, name: t.name, price: t.price, qty: qty[t.id] }));
  });

  readonly ticketCount = computed(() => this.lines().reduce((sum, l) => sum + l.qty, 0));
  readonly subtotal = computed(() => this.lines().reduce((sum, l) => sum + l.price * l.qty, 0));
  readonly fees = computed(() => Math.round((this.subtotal() * 0.03) / 50) * 50);

  readonly discount = computed(() => {
    const coupon = this.coupon();
    const subtotal = this.subtotal();
    if (!coupon || subtotal === 0) return 0;
    if (coupon.minPurchase && subtotal < coupon.minPurchase) return 0;
    let discount = coupon.type === 'percentage' ? (subtotal * coupon.value) / 100 : coupon.value;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    return Math.min(Math.round(discount), subtotal);
  });

  readonly total = computed(() => Math.max(0, this.subtotal() + this.fees() - this.discount()));

  readonly buyerValid = computed(() => {
    const b = this.buyer();
    return b.firstName.trim().length > 1
      && b.lastName.trim().length > 1
      && digitsOnly(b.phone).length === 10
      && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim());
  });

  readonly paymentValid = computed(() => {
    const p = this.payment();
    if (p.method === 'card') {
      return digitsOnly(p.cardNumber).length === 16
        && p.cardName.trim().length > 2
        && /^(0[1-9]|1[0-2])\/\d{2}$/.test(p.expiryDate)
        && p.cvv.length >= 3;
    }
    return digitsOnly(p.phone).length === 10;
  });

  setQuantity(ticketId: string, qty: number): void {
    const event = this.event();
    const max = Math.min(MAX_PER_TICKET, event?.tickets.find(t => t.id === ticketId)?.remaining ?? MAX_PER_TICKET);
    this.quantities.update(q => ({ ...q, [ticketId]: Math.max(0, Math.min(max, qty)) }));
  }

  updateBuyer(patch: Partial<Buyer>): void {
    this.buyer.update(b => ({ ...b, ...patch }));
  }

  updatePayment(patch: Partial<PaymentDetails>): void {
    this.payment.update(p => ({ ...p, ...patch }));
  }
}
