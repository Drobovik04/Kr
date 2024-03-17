export interface PictureModel {
  name: string;
  genres: string[];
  styles: string[];
  techniques: string[];
  year: string;
  path: string;
}

export interface AuthorModel {
  name: string;
  path: string;
  bio: string;
  pictures: PictureModel[];
}
