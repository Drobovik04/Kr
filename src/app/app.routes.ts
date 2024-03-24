import { Routes } from '@angular/router';
import { AuthorsComponent } from '../authors/authors.component';
import { AboutProjectComponent } from '../about-project/about-project.component';
import { PicturesComponent } from '../pictures/pictures.component';
import { AuthorPageComponent } from '../author-page/author-page.component';

export const routes: Routes = [
  {
    path: 'about',
    component: AboutProjectComponent,
  },
  {
    path: 'authors',
    children: [
      {
        path: 'all',
        component: AuthorsComponent,
      },
      {
        path: ':authorName',
        component: AuthorPageComponent,
      },
    ],
  },
  {
    path: 'pictures',
    component: PicturesComponent,
  },
];
