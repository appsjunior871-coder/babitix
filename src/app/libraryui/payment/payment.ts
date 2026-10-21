/**
 * Composant LibraryUI : Payment — style « Mode paiement »
 * (blocs « Payment Methods », « New Card Form » et « Security Info »)
 * https://libraryui.com/components/bootstrap/payment
 * Adapté : moyens de paiement ivoiriens (Mobile Money + carte), état partagé avec le stepper.
 */
import { Component, computed, inject } from '@angular/core';
import { CheckoutStore, PaymentMethodId, digitsOnly } from '../../pages/event/checkout.store';

interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'ui-payment',
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class PaymentComponent {
  protected readonly store = inject(CheckoutStore);

  protected readonly paymentMethods: PaymentMethod[] = [
    { id: 'orange', name: 'Orange Money', icon: 'bi-phone-fill', color: '#ff7900' },
    { id: 'mtn', name: 'MTN MoMo', icon: 'bi-phone-fill', color: '#ffcc00' },
    { id: 'moov', name: 'Moov Money', icon: 'bi-phone-fill', color: '#1d4ed8' },
    { id: 'wave', name: 'Wave', icon: 'bi-water', color: '#1dc8f2' },
    { id: 'card', name: 'Carte bancaire', icon: 'bi-credit-card-2-front', color: '#0f172a' }
  ];

  protected readonly selected = computed(() =>
    this.paymentMethods.find(m => m.id === this.store.payment().method)!
  );

  selectMethod(methodId: PaymentMethodId): void {
    // Pré-remplit le numéro Mobile Money avec le téléphone saisi à l'étape précédente
    const phone = this.store.payment().phone || this.store.buyer().phone;
    this.store.updatePayment({ method: methodId, phone });
  }

  formatPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = digitsOnly(input.value).slice(0, 10).replace(/(\d{2})(?=\d)/g, '$1 ');
    input.value = value;
    this.store.updatePayment({ phone: value });
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = digitsOnly(input.value).replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    input.value = value;
    this.store.updatePayment({ cardNumber: value });
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = digitsOnly(input.value);
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
    this.store.updatePayment({ expiryDate: value });
  }

  formatCvv(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = digitsOnly(input.value).slice(0, 4);
    this.store.updatePayment({ cvv: input.value });
  }

  getCardBrand(): string {
    const number = digitsOnly(this.store.payment().cardNumber);
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    return '';
  }
}
