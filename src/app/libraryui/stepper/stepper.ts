/**
 * Composant LibraryUI : Stepper — style « Stepper »
 * https://libraryui.com/components/bootstrap/stepper
 * Adapté : tunnel de réservation en 3 étapes (billets → infos → paiement),
 * qui intègre les composants LibraryUI Coupon et Payment.
 */
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutStore, digitsOnly } from '../../pages/event/checkout.store';
import { BookingService } from '../../services/booking.service';
import { CouponComponent } from '../coupon/coupon';
import { PaymentComponent } from '../payment/payment';
import { FcfaPipe } from '../../shared/format';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

const METHOD_LABELS: Record<string, string> = {
  orange: 'Orange Money',
  mtn: 'MTN MoMo',
  moov: 'Moov Money',
  wave: 'Wave',
  card: 'Carte bancaire'
};

@Component({
  selector: 'ui-stepper',
  imports: [CouponComponent, PaymentComponent, FcfaPipe],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss'
})
export class StepperComponent {
  protected readonly store = inject(CheckoutStore);
  private readonly bookings = inject(BookingService);
  private readonly router = inject(Router);

  protected readonly steps: Step[] = [
    { id: 1, title: 'Billets', subtitle: 'Catégorie et quantité', icon: 'bi-ticket-perforated' },
    { id: 2, title: 'Tes infos', subtitle: 'Pour recevoir ton billet', icon: 'bi-person' },
    { id: 3, title: 'Paiement', subtitle: 'Mobile Money, carte', icon: 'bi-wallet2' }
  ];

  protected readonly currentStep = signal(1);
  protected readonly isProcessing = signal(false);

  protected readonly progress = computed(() => ((this.currentStep() - 1) / (this.steps.length - 1)) * 100);

  protected readonly isStepValid = computed(() => {
    switch (this.currentStep()) {
      case 1:
        return this.store.ticketCount() > 0;
      case 2:
        return this.store.buyerValid();
      case 3:
        return this.store.paymentValid() && this.store.termsAccepted();
      default:
        return false;
    }
  });

  protected readonly methodLabel = computed(() => METHOD_LABELS[this.store.payment().method]);

  nextStep(): void {
    if (this.currentStep() < this.steps.length && this.isStepValid()) {
      this.currentStep.update(s => s + 1);
      // Le numéro Mobile Money reprend par défaut le téléphone de l'étape 2
      if (this.currentStep() === 3 && !this.store.payment().phone) {
        this.store.updatePayment({ phone: this.store.buyer().phone });
      }
      this.scrollToTop();
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      this.scrollToTop();
    }
  }

  goToStep(stepId: number): void {
    if (stepId < this.currentStep()) {
      this.currentStep.set(stepId);
    }
  }

  submit(): void {
    const event = this.store.event();
    if (!event || !this.isStepValid()) return;

    this.isProcessing.set(true);
    const payment = this.store.payment();
    const last4 = payment.method === 'card'
      ? digitsOnly(payment.cardNumber).slice(-4)
      : digitsOnly(payment.phone).slice(-4);

    // Simule la validation du paiement (confirmation Mobile Money ou 3-D Secure)
    setTimeout(() => {
      const booking = this.bookings.confirm({
        eventSlug: event.slug,
        lines: this.store.lines(),
        subtotal: this.store.subtotal(),
        fees: this.store.fees(),
        discount: this.store.discount(),
        couponCode: this.store.coupon()?.code,
        total: this.store.total(),
        buyer: this.store.buyer(),
        payment: { method: payment.method, label: METHOD_LABELS[payment.method], last4 }
      });
      this.isProcessing.set(false);
      this.router.navigate(['/confirmation', booking.ref]);
    }, 2200);
  }

  protected formatBuyerPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = digitsOnly(input.value).slice(0, 10).replace(/(\d{2})(?=\d)/g, '$1 ');
    this.store.updateBuyer({ phone: input.value });
  }

  protected inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  private scrollToTop(): void {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
