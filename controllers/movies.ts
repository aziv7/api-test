import { Request, Response } from 'express';
import { HttpCode } from '../constants/http_codes';
import { httpClient } from '../httpClient';
import { IMoviesResponse } from '../types';

export const moviesToPDF = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const response = await httpClient.get<IMoviesResponse>('/popular');

    console.log(response.data.results);

    return res.status(HttpCode.OK).send(response.data);
  } catch (error) {
    console.error(error);
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
};
