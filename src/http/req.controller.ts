import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReqService } from './req.service';
// import { CreatePostDto } from './dto/create-post.dto';
import { GetWeatherDto } from './dto/get-weather.dto';

@Controller('req')
export class ReqController {
  constructor(private readonly reqService: ReqService) {}

  //   @Post()
  //   async create(@Body() createPostDto: CreatePostDto) {
  //     return this.reqService.createSome(createPostDto);
  //   }

  @Post()
  async getWeather(@Body() getWeatherDto: GetWeatherDto) {
    const forecast = await this.reqService.getWeather(getWeatherDto);
    return `Next hour ${forecast}`;
  }

  @Get()
  async getSome() {
    return this.reqService.getSome();
  }
}
