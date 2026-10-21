/**
 * Composant LibraryUI : Coupon — bloc « Order Summary »
 * https://libraryui.com/components/bootstrap/coupon
 * Adapté : récapitulatif des billets choisis, frais de service et réduction en FCFA.
 */
import { Component, inject } from '@angular/core';
import { CheckoutStore } from '../../pages/event/checkout.store';
import { FcfaPipe, formatEventDay, formatEventTime } from '../../shared/format';

@Component({
  selector: 'ui-order-summary',
  imports: [FcfaPipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss'
})
export class OrderSummary {
  protected readonly store = inject(CheckoutStore);
  protected readonly day = formatEventDay;
  protected readonly time = formatEventTime;
}
