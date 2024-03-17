import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ARTISTS } from './authors';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthorModel } from './models';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    RouterOutlet,
    MatIconModule,
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthorsComponent {
  showFiller = false;

  artists: AuthorModel[] = [];

  dbArtists = ARTISTS;

  searchControl = new FormControl<string>('');

  constructor(private router: Router) {}

  ngOnInit() {
    this.artists = JSON.parse(localStorage.getItem('authors') || '');
  }

  onGoToPictures(author: AuthorModel): void {
    var name = author.name.split(' ')[0].toLowerCase();
    localStorage.setItem(
      `selected_${name}_pictures`,
      JSON.stringify(author.pictures)
    );
    const url = `${author.name.split(' ')[0].toLowerCase()}`;
    this.router.navigate(['/authors', url]);
  }

  onSearch(value: string | null | undefined): void {
    if (value) {
      this.artists = this.artists.filter((x) =>
        x.name.toLocaleLowerCase().includes(value.toLocaleLowerCase() as string)
      );
      return;
    }

    this.artists = JSON.parse(localStorage.getItem('authors') || '');
  }
}
