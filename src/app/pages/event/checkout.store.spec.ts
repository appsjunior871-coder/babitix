import { TestBed } from '@angular/core/testing';
import { EVENTS } from '../../data/events';
import { COUPONS, CheckoutStore } from './checkout.store';

describe('CheckoutStore', () => {
  let store: CheckoutStore;
  const event = EVENTS.find(e => e.slug === 'nuit-du-coupe-decale')!;
  const coupon = (code: string) => COUPONS.find(c => c.code === code)!;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CheckoutStore] });
    store = TestBed.inject(CheckoutStore);
    store.event.set(event);
  });

  it('computes subtotal, 3 % fees rounded to 50 FCFA and total', () => {
    store.setQuantity('std', 2); // 2 × 5 000
    store.setQuantity('vip', 1); // 1 × 15 000
    expect(store.subtotal()).toBe(25000);
    expect(store.fees()).toBe(750);
    expect(store.total()).toBe(25750);
    expect(store.ticketCount()).toBe(3);
  });

  it('caps quantities between 0 and the remaining seats', () => {
    store.setQuantity('gold', 50); // 12 places restantes, max 10 par commande
    expect(store.quantities()['gold']).toBe(10);
    store.setQuantity('gold', -3);
    expect(store.quantities()['gold']).toBe(0);
  });

  it('applies a percentage coupon with its ceiling', () => {
    store.setQuantity('gold', 2); // 70 000
    store.coupon.set(coupon('ETUDIANT')); // 15 % plafonné à 5 000
    expect(store.discount()).toBe(5000);
  });

  it('ignores a fixed coupon below its minimum purchase', () => {
    store.setQuantity('std', 0);
    store.coupon.set(coupon('LIBRARYUI')); // minimum 5 000
    expect(store.discount()).toBe(0);
    store.setQuantity('std', 1);
    expect(store.discount()).toBe(2000);
  });

  it('validates buyer details and Mobile Money number', () => {
    expect(store.buyerValid()).toBe(false);
    store.updateBuyer({ firstName: 'Aya', lastName: 'Kouassi', phone: '07 01 02 03 04', email: 'aya@exemple.ci' });
    expect(store.buyerValid()).toBe(true);

    store.updatePayment({ method: 'wave', phone: '07 01 02' });
    expect(store.paymentValid()).toBe(false);
    store.updatePayment({ phone: '07 01 02 03 04' });
    expect(store.paymentValid()).toBe(true);
  });

  it('validates card details', () => {
    store.updatePayment({ method: 'card', cardNumber: '4242 4242 4242 4242', cardName: 'AYA KOUASSI', expiryDate: '13/28', cvv: '123' });
    expect(store.paymentValid()).toBe(false); // mois invalide
    store.updatePayment({ expiryDate: '12/28' });
    expect(store.paymentValid()).toBe(true);
  });
});
