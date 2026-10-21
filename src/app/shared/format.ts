import { Pipe, PipeTransform } from '@angular/core';

const fcfaFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

export function formatFcfa(value: number): string {
  // Intl utilise une espace fine insécable comme séparateur de milliers
  return `${fcfaFormatter.format(Math.round(value))} FCFA`;
}

@Pipe({ name: 'fcfa' })
export class FcfaPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return formatFcfa(value ?? 0);
  }
}

const dayFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
const longFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });

export function formatEventDay(iso: string): string {
  return dayFormatter.format(new Date(iso));
}

export function formatEventLong(iso: string): string {
  return longFormatter.format(new Date(iso));
}

export function formatEventTime(iso: string): string {
  return timeFormatter.format(new Date(iso)).replace(':', ' h ');
}
