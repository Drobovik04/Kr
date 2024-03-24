import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ARTISTS } from '../authors/authors';
import { AuthorModel, PictureModel } from '../authors/models';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'catalog';
  routes = [
    { linkLabel: 'Художники', value: '/authors/all' },
    { linkLabel: 'Картины', value: '/pictures' },
    { linkLabel: 'О сайте', value: '/about' },
  ];
  activeLink = '/authors';

  authors: AuthorModel[] = [];
  pictures: PictureModel[] = [];
  isAuthors: boolean = true;
  selectedGenres: string[] = [];
  selectedStyles: string[] = [];
  selectedTechniques: string[] = [];
  searchQuery: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authors = JSON.parse(ARTISTS);
    for (let author of this.authors) {
      this.pictures = [...author.pictures, ...this.pictures];
    }

    localStorage.setItem('authors', ARTISTS);
    localStorage.setItem('pictures', JSON.stringify(this.pictures));
  }

  setActiveTab(link: string): boolean {
    return location.pathname.includes(link.split(`/`)[1]);
  }
}
