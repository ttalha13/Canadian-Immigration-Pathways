export interface PRPathway {
  name: string;
  description: string;
  url: string;
}

export interface Province {
  id: string;
  name: string;
  description: string;
  image: string;
  darkImage: string;
  pathways: PRPathway[];
}