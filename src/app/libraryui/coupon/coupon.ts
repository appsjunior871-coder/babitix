/**
 * Composant LibraryUI : Coupon — style « Bon de réduction » (bloc « Apply Coupon » + « Applied Coupon »)
 * https://libraryui.com/components/bootstrap/coupon
 * Adapté : codes promo BabiTix, montants en FCFA, état partagé avec le récapitulatif.
 */
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { COUPONS, CheckoutStore, Coupon } from '../../pages/event/checkout.store';
import { FcfaPipe, formatFcfa } from '../../shared/format';

@Component({
  selector: 'ui-coupon',
  imports: [FormsModule, FcfaPipe],
  templateUrl: './coupon.html',
  styleUrl: './coupon.scss'
})
export class CouponComponent {
  protected readonly store = inject(CheckoutStore);

  protected readonly suggestions = COUPONS.filter(c => c.isActive);
  protected readonly couponInput = signal('');
  protected readonly isApplying = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  applyCoupon(code = this.couponInput()): void {
    if (!code.trim()) {
      this.errorMessage.set('Saisis un code promo');
      return;
    }

    this.isApplying.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    // Simule l'appel API
    setTimeout(() => {
      const coupon = COUPONS.find(c => c.code.toLowerCase() === code.trim().toLowerCase());
      this.isApplying.set(false);

      if (!coupon) {
        this.errorMessage.set('Ce code n’existe pas');
        return;
      }
      if (!coupon.isActive) {
        this.errorMessage.set('Ce code a expiré');
        return;
      }
      if (coupon.minPurchase && this.store.subtotal() < coupon.minPurchase) {
        this.errorMessage.set(`Ce code demande au moins ${formatFcfa(coupon.minPurchase)} de billets`);
        return;
      }

      this.store.coupon.set(coupon);
      this.successMessage.set('Code promo appliqué !');
      this.couponInput.set('');
    }, 700);
  }

  removeCoupon(): void {
    this.store.coupon.set(null);
    this.successMessage.set('');
  }

  getCouponTypeIcon(type: Coupon['type']): string {
    return type === 'percentage' ? 'bi-percent' : 'bi-cash-coin';
  }
}
