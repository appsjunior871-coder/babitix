import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarDark } from './libraryui/navbar/navbar';
import { FullFooter } from './libraryui/footer/footer';

@Component({
  imports: [RouterOutlet, NavbarDark, FullFooter],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  // Le <base href> ferait recharger la page d'accueil avec un simple href="#contenu"
  protected skipToContent(event: Event): void {
    event.preventDefault();
    document.getElementById('contenu')?.focus();
  }
}
