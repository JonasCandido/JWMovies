export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

export interface MoviesState {
  data: any[];
  isLoading: boolean;
  isError: boolean;
};

export interface MoviesAction {
  type: string;
  payload?: any;
};
