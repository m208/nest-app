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
}
