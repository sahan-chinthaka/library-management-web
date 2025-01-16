export interface IBook {
  id: number;
  name: string;
  author: string;
  description?: string;
  imageURl?: string;
  createdDate: Date;
  publisher?: string;
  userId?: number;
}

export interface IBookWithUser extends IBook {
  user: {
    id: number;
    username: string;
  };
}
