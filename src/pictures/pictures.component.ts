import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PictureModel } from '../authors/models';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
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
  pictures: PictureModel[] = [];
  searchControl = new FormControl<string>('');
  selectedGenres: string = '';
  selectedStyles: string = '';
  selectedTechniques: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.setFromStorage();
  }

  onSearch(value: string | null | undefined) {
    if (value) {
      var picture = this.getFromStorage();
      this.pictures = picture.filter(
        (x) =>
          x.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) &&
          (this.selectedGenres
            ? x.genres.includes(this.selectedGenres)
            : true && this.selectedTechniques
            ? x.techniques.includes(this.selectedTechniques)
            : true && this.selectedStyles
            ? x.styles.includes(this.selectedStyles)
            : true)
      );
    }
    else {
      this.pictures = this.getFromStorage();
    }
  }

  onClearAll() {
    this.searchControl = new FormControl<string>('');
    this.selectedGenres = '';
    this.selectedStyles = '';
    this.selectedTechniques = '';
    this.setFromStorage();
  }

  private setFromStorage() {
    this.pictures = this.getFromStorage();
  }

  private getFromStorage(): PictureModel[] {
    return JSON.parse(localStorage.getItem('pictures') || '');
  }

  onSelectStyle(event: any): void {
    this.selectedStyles = event.value;
    var picture = this.getFromStorage();
    this.pictures = picture.filter(
      (x) =>
        x.styles.includes(event.value) &&
        (this.selectedGenres
          ? x.genres.includes(this.selectedGenres)
          : true && this.selectedTechniques
          ? x.techniques.includes(this.selectedTechniques)
          : true && this.searchControl.value
          ? x.name.includes(this.searchControl.value)
          : true)
    );
  }

  onSelectGenre(event: any) {
    this.selectedGenres = event.value;
    var picture = this.getFromStorage();
    this.pictures = picture.filter(
      (x) =>
        x.genres.includes(event.value) &&
        (this.selectedStyles
          ? x.styles.includes(this.selectedStyles)
          : true && this.selectedTechniques
          ? x.techniques.includes(this.selectedTechniques)
          : true && this.searchControl.value
          ? x.name.includes(this.searchControl.value)
          : true)
    );
  }

  onSelectTechnique(event: any): void {
    this.selectedTechniques = event.value;
    var picture = this.getFromStorage();
    this.pictures = picture.filter(
      (x) =>
        x.techniques.includes(event.value) &&
        (this.selectedGenres
          ? x.genres.includes(this.selectedGenres)
          : true && this.selectedStyles
          ? x.styles.includes(this.selectedStyles)
          : true && this.searchControl.value
          ? x.name.includes(this.searchControl.value)
          : true)
    );
  }
}
