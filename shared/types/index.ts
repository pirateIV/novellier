export interface ParamIdProps {
  params: Promise<{ id: string }>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  books: any[];
  createdAt: string;
  updatedAt: string;
  reviews: string[];
}
