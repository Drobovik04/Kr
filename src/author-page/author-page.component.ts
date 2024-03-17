import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PictureModel } from '../authors/models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterOutlet,
  ],
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.scss',
})
export class AuthorPageComponent implements OnInit {
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
    var authorName = this.route.snapshot.params['authorName'];
    var name = `selected_${authorName}_pictures`;
    return JSON.parse(localStorage.getItem(name) || '');
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
