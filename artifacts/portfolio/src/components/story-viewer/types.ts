export interface StoryImage {
  src: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  images: StoryImage[];
  link?: string;
}
