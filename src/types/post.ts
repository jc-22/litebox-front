export interface ApiPost {
  id: number;
  attributes: {
    title: string;
    topic: string;
    readTime: number;
    coverImg: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
}

export interface Post {
  id: string | number;
  title: string;
  topic: string;
  readTime: number;
  imageUrl: string;
  type: 'portrait' | 'square';
}

export interface LocalPost {
  title: string;
  imageUrl: string;
}