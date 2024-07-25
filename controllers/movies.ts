import { Request, Response } from 'express';
import { HttpCode } from '../constants/http_codes';
import { httpClient } from '../httpClient';
import { IMovie, IMovieParams, IMoviesResponse } from '../types';

import puppeteer from 'puppeteer';
import { envs } from '../config';

export const moviesToPDF = async (req: Request, res: Response) => {
  try {
    const response = await httpClient.get<IMoviesResponse>('/popular');

    const htmlContent = generatePDFContent(response.data.results);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.contentType('application/pdf');
    return res.status(HttpCode.OK).send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
};

export const getMovieByID = async (
  req: Request<IMovieParams>,
  res: Response
) => {
  try {
    const response = await httpClient.get<IMovie & { poster_path: string }>(
      `/${req.params.movie_id}`
    );

    const htmlContent = generateMovieContent(response.data);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.contentType('application/pdf');
    return res.status(HttpCode.OK).send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
};

const generateMovieContent = (movie: IMovie & { poster_path: string }) => `

  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${movie.title}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px;heigth:100vh; width:100%; dispaly:flex; align-items:center;justify-content: center; }
    
    </style>
  </head>
  <body>
    <h1>${movie.title}</h1>
   <div> 
  <label>Release date: </label> ${movie.release_date}
   </div>
   <div> 
  <label>Vote average: </label> ${movie.vote_average}
   </div>
   <div> 
  <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' />
   </div>
  </body>
  </html>`;

const generatePDFContent = (movies: IMovie[]) => `

  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Movies</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px 12px; border: 1px solid #ddd; }
      th { background-color: #f4f4f4; }
    </style>
  </head>
  <body>
    <h1>Movies List</h1>
    <table>
      <thead>
        <tr>
          <th>Movie Title</th>
          <th>Movie Release date</th>
          <th>Movie vote average</th>
          
        </tr>
      </thead>
      <tbody>
        ${movies
          .map(
            (movie) => `
          <tr>
            <td> <a href='${envs.APP_BASE_URL}/${movie.id}'>${movie.title}</a> </td>
            <td>${movie.release_date}</td>
            <td>${movie.vote_average}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  </body>
  </html>`;
