export type User = {
  username?: string;
  userId?: string;
  password?: string;
  status?: boolean;
  image?: string
};

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  errors: Array<string>;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  signUp: ({
    password,
    username,
  }: {
    password: string;
    username: string;
  }) => void;
  logout: () => void;
};

export type Oferts = {
  price?: number;
  id?: number;
  description?: string;
};

export type Desserts = {
  price?: number;
  id?: number;
  name?: string;
  imagen?: string;
};

export type Gastronomics = {
  price?: number;
  id?: number;
  description?: string;
  imagen?: string;
};

export type Drinks = {
  price?: number;
  id?: number;
  name?: string;
  imagen?: string;
};

export type Snacks = {
  price?: number;
  id?: number;
  name?: string;
  imagen?: string;
};

export type Gallery = {
  id?: number;
  description?: string;
  imagen?: string;
};

export type Events = {
  id?: number;
  description?: string;
  imagen?: string;
};
