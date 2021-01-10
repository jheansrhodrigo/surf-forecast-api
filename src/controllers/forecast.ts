import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Forecast } from '../services/forecast';
import { Beach } from '../models/beach';
import { authMiddleware } from '../middlewares/auth';
import { BaseController } from '.';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController extends BaseController {
  @Get('')
  public async getForecastForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded?.id });
      const forecastData = await forecast.processForecastForBeaches(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }
}
