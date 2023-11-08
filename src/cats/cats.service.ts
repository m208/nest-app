import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { Owner } from './interfaces/owner.interface';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>,

    @Inject('OWNER_MODEL')
    private ownerModel: Model<Owner>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const owner = await new this.ownerModel({
      name: createCatDto.owner,
    }).save();

    const ownerId = owner._id.toString();

    const createdCat = new this.catModel({
      name: createCatDto.name,
      age: createCatDto.age,
      breed: createCatDto.breed,
      owner: ownerId,
    });

    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().populate('owner', '-_id -__v');
  }
}
