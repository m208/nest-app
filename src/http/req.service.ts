import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  PostExample,
  ReqExample,
  WeatherTimelineResponse,
} from './interfaces/req.interface';
import { AxiosError } from 'axios';
import { CreatePostDto } from './dto/create-post.dto';
import { GetWeatherDto } from './dto/get-weather.dto';

@Injectable()
export class ReqService {
  private readonly logger = new Logger(ReqService.name);

  constructor(private readonly httpService: HttpService) {}

  async getSome() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ReqExample>('https://jsonplaceholder.typicode.com/todos/1')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async createSome(dto: CreatePostDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<PostExample>('https://jsonplaceholder.typicode.com/posts', dto)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async getWeather(dto: GetWeatherDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<WeatherTimelineResponse>(
          'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
          dto,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data.days[0].description;
  }

  async sendMsg() {
    const forecast = await this.getWeather({
      location: 'Saint-Petersburg',
      key: process.env.WEATHER_API_KEY,
    });
    const message = `Im still alive!\n Now ${new Date().toLocaleTimeString()}\n Weather forecast for the next hour: ${forecast}`;
    const { data } = await firstValueFrom(
      this.httpService
        .get<ReqExample>(
          `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage?chat_id=${process.env.TG_USER_ID}&text=${message}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
