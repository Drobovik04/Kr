import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about-project',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    RouterOutlet,
  ],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.scss',
})
export class AboutProjectComponent {
  @Input() pictures: {
    name: string;
    genres: string[];
    styles: string[];
    techniques: string[];
    year: string;
    path: string;
  }[] = [];
}
