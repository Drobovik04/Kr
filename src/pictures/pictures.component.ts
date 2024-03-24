import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PictureModel } from '../authors/models';
import { MatTooltipModule } from '@angular/material/tooltip';
type PictureKey = "genres" | "styles" | "techniques";

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    RouterOutlet,
  ],
  templateUrl: './pictures.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pictures.component.scss'],
})
export class PicturesComponent {
  loadPictures: PictureModel[] = [];
  pictures: PictureModel[] = [];
  searchControl = new FormControl<string>('');
  selectedGenres: string[] = [];
  selectedStyles: string[] = [];
  selectedTechniques: string[] = [];
  availableGenres: string[] = [];
  availableStyles: string[] = [];
  availableTechniques: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.setFromStorage();
    this.availableGenres = this.extractUniqueValues('genres');
    this.availableStyles = this.extractUniqueValues('styles');
    this.availableTechniques = this.extractUniqueValues('techniques');
    this.applyFilters();
  }
  extractUniqueValues(key: PictureKey): string[] {
    const allValues: string[] = [];
    this.loadPictures.forEach((picture: PictureModel) => {
      allValues.push(...picture[key]);
    });
    return Array.from(new Set(allValues));
  }

  onSearch(value: string | null | undefined) {
    this.applyFilters();
  }

  onClearAll() {
    this.searchControl = new FormControl<string>('');
    this.selectedGenres = [];
    this.selectedStyles = [];
    this.selectedTechniques = [];
    this.applyFilters();
  }

  private setFromStorage() {
    this.loadPictures = this.getFromStorage();
  }

  private getFromStorage(): PictureModel[] {
    return JSON.parse(localStorage.getItem('pictures') || '');
  }

  onSelectStyle(event: any, style: string): void {
    this.updateSelectedValues(event, style, this.selectedStyles);
    this.applyFilters();
  }

  onSelectGenre(event: any, genre: string): void {
    this.updateSelectedValues(event, genre, this.selectedGenres);
    this.applyFilters();
  }

  onSelectTechnique(event: any, technique: string): void {
    this.updateSelectedValues(event, technique, this.selectedTechniques);
    this.applyFilters();
  }

  updateSelectedValues(event: any, value: string, selectedArray: string[]): void {
    if (event.checked) {
      if (!selectedArray.includes(value)) {
        selectedArray.push(value);
      }
    } else {
      const index = selectedArray.indexOf(value);
      if (index != -1)selectedArray = selectedArray.splice(index, 1);
    }
  }

  applyFilters(): void {
    this.pictures = this.loadPictures.filter(picture =>
      (this.selectedGenres.length == 0 || this.selectedGenres.every(g => picture.genres.includes(g))) &&
      (this.selectedStyles.length == 0 || this.selectedStyles.every(s => picture.styles.includes(s))) &&
      (this.selectedTechniques.length == 0 || this.selectedTechniques.every(t => picture.techniques.includes(t))) &&
      (this.searchControl.value == null || picture.name.toLowerCase().includes(this.searchControl.value.toLowerCase()))
    );
  }
}
