import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthorModel, PictureModel } from './models';
import { ARTISTS } from './authors';

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
    MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'catalog';

  authors: AuthorModel[] = [];
  pictures: PictureModel[] = [];
  isAuthors: boolean = true;
  isAbout: boolean = false;
  selectedGenres: string[] = [];
  selectedStyles: string[] = [];
  selectedTechniques: string[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.authors = JSON.parse(ARTISTS);
    for(let author of this.authors ) {
      this.pictures = [...author.pictures, ...this.pictures];
    }
  }

  onSelectStyle(event: any, value: string): void {
    debugger
    if(event.checked) {
      this.selectedStyles.push(value);
      this.pictures = this.pictures.filter(x => this.selectedStyles.some(y => x.styles.includes(y)));
      return;
    }

    const index = this.selectedStyles.findIndex(x => x === value);
    this.selectedStyles.splice(index, 1);
    this.pictures = this.pictures.filter(x => this.selectedStyles.some(y => x.styles.includes(y)));
    if(this.pictures.length === 0) {
      this.authors.map(x => this.pictures = [...x.pictures, ...this.pictures]);
    }
  }

    onSelectGenre(event: any, value: string): void {
      debugger
      if(event.checked) {
        this.selectedGenres.push(value);
        this.pictures = this.pictures.filter(x => this.selectedGenres.find(y => x.genres.includes(y)));
        return;
      }
  
      const index = this.selectedGenres.findIndex(x => x === value);
      this.selectedGenres.splice(index, 1);
      this.pictures = this.pictures.filter(x => this.selectedGenres.some(y => x.genres.includes(y)));
      if(this.pictures.length === 0) {
        this.authors.map(x => this.pictures = [...x.pictures, ...this.pictures]);
      }
    }

    onSelectTechnique(event: any, value: string): void {
      debugger
      if(event.checked) {
        debugger
        this.selectedTechniques.push(value);
        // this.pictures = this.pictures.filter(x => x.techniques.includes(y => this.selectedTechniques.map(s)));
        for(let picture of this.pictures) {
          for(let technic of this.selectedTechniques) {
            if(!picture.techniques.includes(technic)) {
              const index = this.pictures.findIndex(x => x === picture);
              this.pictures= this.pictures.slice(index, 1);
            }
          }
        }
        console.error(this.pictures);
        return;
      }
  
      const index = this.selectedTechniques.findIndex(x => x === value);
      this.selectedTechniques.splice(index, 1);
      this.pictures = this.pictures.filter(x => x.techniques.some(y => this.selectedTechniques.includes(y)));
      if(this.pictures.length === 0) {
        this.authors.map(x => this.pictures = [...x.pictures, ...this.pictures]);
      }
    }

    // private checkValue(array: string[], searchArray: string[]) : boolean {
    //   return array.find(x => searchArray.find(y => y === x));
    // }
}
