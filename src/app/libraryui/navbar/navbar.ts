/**
 * Composant LibraryUI : Navbar Menu — style « Dark »
 * https://libraryui.com/components/bootstrap/main-menu
 * Adapté : liens d'ancre, recherche branchée sur la liste d'événements,
 * menu mobile (burger) et compteur de billets.
 */
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { BookingService } from '../../services/booking.service';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'ui-navbar-dark',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarDark {
  private readonly router = inject(Router);
  protected readonly search = inject(SearchService);
  protected readonly bookings = inject(BookingService);

  protected readonly links: NavLink[] = [
    { label: 'À la une', fragment: 'a-la-une' },
    { label: 'Événements', fragment: 'evenements' },
    { label: 'Avis', fragment: 'avis' },
    { label: 'FAQ', fragment: 'faq' }
  ];

  protected readonly menuOpen = signal(false);

  protected submitSearch(): void {
    this.menuOpen.set(false);
    this.router.navigate(['/'], { fragment: 'evenements' });
  }

  protected lastBookingRef(): string | null {
    return this.bookings.bookings()[0]?.ref ?? null;
  }
}
