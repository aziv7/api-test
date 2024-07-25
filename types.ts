export interface IMovie {
  title: string;
  release_date: string;
  vote_average: number;
}

export interface IMoviesResponse {
  page: number;
  results: IMovie[];
}
