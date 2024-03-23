export type Author = {
  name: string;
  image: string;
  bio?: string;
  id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  id: number;
  title: string;
  slug?: any;
  desciption?: string | null;
  body?: string;
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
};
