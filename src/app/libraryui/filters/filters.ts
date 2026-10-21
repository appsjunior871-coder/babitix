/**
 * Composant LibraryUI : Filters — style « Filtre »
 * https://libraryui.com/components/bootstrap/filters
 * Adapté : les filtres agissent vraiment sur la liste d'événements (catégorie, ville,
 * budget, période, note), tri fonctionnel, recherche partagée avec la navbar,
 * panneau de filtres repliable sur mobile.
 */
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BabiEvent, minPrice } from '../../data/events';
import { Poster } from '../../shared/poster/poster';
import { FcfaPipe, formatEventDay, formatEventTime } from '../../shared/format';
import { SearchService } from '../../services/search.service';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  checked?: boolean;
}

export interface FilterGroup {
  id: 'category' | 'city' | 'price' | 'period' | 'rating';
  label: string;
  type: 'checkbox' | 'radio' | 'range' | 'rating';
  expanded: boolean;
  options?: FilterOption[];
  range?: { min: number; max: number; step: number; current: [number, number] };
  rating?: number;
}

export interface ActiveFilter {
  groupId: FilterGroup['id'];
  groupLabel: string;
  value: string;
  label: string;
}

type SortKey = 'date' | 'price-asc' | 'price-desc' | 'rating';

@Component({
  selector: 'ui-filters',
  imports: [RouterLink, FormsModule, Poster, FcfaPipe],
  templateUrl: './filters.html',
  styleUrl: './filters.scss'
})
export class FiltersComponent implements OnInit {
  readonly events = input.required<BabiEvent[]>();

  protected readonly search = inject(SearchService);
  protected readonly minPrice = minPrice;
  protected readonly day = formatEventDay;
  protected readonly time = formatEventTime;

  protected readonly sort = signal<SortKey>('date');
  protected readonly panelOpen = signal(false);

  // FILTER GROUPS (construits à partir des données dans ngOnInit)
  protected readonly groups = signal<FilterGroup[]>([]);

  ngOnInit(): void {
    this.groups.set(this.buildGroups(this.events()));
  }

  // ACTIVE FILTERS
  protected readonly activeFilters = computed<ActiveFilter[]>(() => {
    const active: ActiveFilter[] = [];
    for (const group of this.groups()) {
      if (group.type === 'checkbox' || group.type === 'radio') {
        group.options?.filter(opt => opt.checked && opt.value !== 'all').forEach(opt => {
          active.push({ groupId: group.id, groupLabel: group.label, value: opt.value, label: opt.label });
        });
      }
      if (group.type === 'rating' && group.rating) {
        active.push({ groupId: group.id, groupLabel: group.label, value: String(group.rating), label: `${group.rating}+ étoiles` });
      }
      if (group.type === 'range' && group.range) {
        const { min, max, current } = group.range;
        if (current[0] !== min || current[1] !== max) {
          active.push({
            groupId: group.id,
            groupLabel: group.label,
            value: `${current[0]}-${current[1]}`,
            label: `${this.short(current[0])} – ${this.short(current[1])} FCFA`
          });
        }
      }
    }
    return active;
  });

  protected readonly results = computed(() => {
    const groups = this.groups();
    const query = this.normalize(this.search.query());
    const checked = (id: FilterGroup['id']) =>
      groups.find(g => g.id === id)?.options?.filter(o => o.checked && o.value !== 'all').map(o => o.value) ?? [];

    const categories = checked('category');
    const cities = checked('city');
    const period = groups.find(g => g.id === 'period')?.options?.find(o => o.checked)?.value ?? 'all';
    const range = groups.find(g => g.id === 'price')?.range;
    const rating = groups.find(g => g.id === 'rating')?.rating ?? 0;

    const list = this.events().filter(e => {
      const price = minPrice(e);
      const month = new Date(e.date).getMonth();
      return (!categories.length || categories.includes(e.category))
        && (!cities.length || cities.includes(e.city))
        && (!range || (price >= range.current[0] && price <= range.current[1]))
        && (period === 'all' || (period === 'nov' && month === 10) || (period === 'dec' && month === 11)
          || (period === 'weekend' && [0, 5, 6].includes(new Date(e.date).getDay())))
        && e.rating >= rating
        && (!query || this.normalize(`${e.title} ${e.venue} ${e.city} ${e.category} ${e.lineup.join(' ')}`).includes(query));
    });

    const sorters: Record<SortKey, (a: BabiEvent, b: BabiEvent) => number> = {
      'date': (a, b) => a.date.localeCompare(b.date),
      'price-asc': (a, b) => minPrice(a) - minPrice(b),
      'price-desc': (a, b) => minPrice(b) - minPrice(a),
      'rating': (a, b) => b.rating - a.rating
    };
    return [...list].sort(sorters[this.sort()]);
  });

  toggleGroup(group: FilterGroup): void {
    group.expanded = !group.expanded;
    this.touch();
  }

  onCheckboxChange(group: FilterGroup, option: FilterOption): void {
    option.checked = !option.checked;
    this.touch();
  }

  onRadioChange(group: FilterGroup, option: FilterOption): void {
    group.options?.forEach(opt => opt.checked = opt.value === option.value);
    this.touch();
  }

  onRatingChange(group: FilterGroup, rating: number): void {
    group.rating = group.rating === rating ? 0 : rating;
    this.touch();
  }

  onRangeChange(group: FilterGroup, index: 0 | 1, value: number): void {
    if (!group.range) return;
    const [low, high] = group.range.current;
    group.range.current = index === 0 ? [Math.min(value, high), high] : [low, Math.max(value, low)];
    this.touch();
  }

  removeFilter(filter: ActiveFilter): void {
    const group = this.groups().find(g => g.id === filter.groupId);
    if (!group) return;

    if (group.type === 'checkbox') {
      const option = group.options?.find(opt => opt.value === filter.value);
      if (option) option.checked = false;
    }
    if (group.type === 'radio') {
      group.options?.forEach(opt => opt.checked = opt.value === 'all');
    }
    if (group.type === 'rating') {
      group.rating = 0;
    }
    if (group.type === 'range' && group.range) {
      group.range.current = [group.range.min, group.range.max];
    }
    this.touch();
  }

  clearAllFilters(): void {
    this.groups().forEach(group => {
      group.options?.forEach(opt => opt.checked = opt.value === 'all');
      if (group.rating !== undefined) group.rating = 0;
      if (group.range) group.range.current = [group.range.min, group.range.max];
    });
    this.search.query.set('');
    this.touch();
  }

  protected rangeFill(group: FilterGroup): string {
    const r = group.range!;
    const left = ((r.current[0] - r.min) / (r.max - r.min)) * 100;
    const right = ((r.current[1] - r.min) / (r.max - r.min)) * 100;
    return `linear-gradient(90deg, #e5e7eb ${left}%, #10b981 ${left}%, #10b981 ${right}%, #e5e7eb ${right}%)`;
  }

  protected short(value: number): string {
    return value >= 1000 ? `${Math.round(value / 1000)} k` : String(value);
  }

  private touch(): void {
    this.groups.update(groups => [...groups]);
  }

  private normalize(value: string): string {
    return value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  private buildGroups(events: BabiEvent[]): FilterGroup[] {
    const countBy = (key: (e: BabiEvent) => string) =>
      events.reduce<Record<string, number>>((acc, e) => ({ ...acc, [key(e)]: (acc[key(e)] ?? 0) + 1 }), {});
    const toOptions = (counts: Record<string, number>): FilterOption[] =>
      Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([value, count]) => ({ value, label: value, count, checked: false }));

    const maxPrice = Math.ceil(Math.max(...events.map(minPrice)) / 5000) * 5000;

    return [
      { id: 'category', label: 'Catégorie', type: 'checkbox', expanded: true, options: toOptions(countBy(e => e.category)) },
      { id: 'city', label: 'Ville', type: 'checkbox', expanded: true, options: toOptions(countBy(e => e.city)) },
      {
        id: 'price',
        label: 'Budget (prix d’entrée)',
        type: 'range',
        expanded: true,
        range: { min: 0, max: maxPrice, step: 500, current: [0, maxPrice] }
      },
      {
        id: 'period',
        label: 'Période',
        type: 'radio',
        expanded: true,
        options: [
          { value: 'all', label: 'Toutes les dates', checked: true },
          { value: 'weekend', label: 'Les week-ends' },
          { value: 'nov', label: 'Novembre 2026' },
          { value: 'dec', label: 'Décembre 2026' }
        ]
      },
      { id: 'rating', label: 'Note minimum', type: 'rating', expanded: false, rating: 0 }
    ];
  }
}
