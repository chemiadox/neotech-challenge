import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dictionary } from './mongodb/schemas/dictionary.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionaryRepository {
  constructor(
    @InjectModel(Dictionary.name) private dictionaryModel: Model<Dictionary>,
  ) {}

  async read(name: string) {
    return this.dictionaryModel.findOne({ name });
  }

  async write(name: string, value: string) {
    const param =
      (await this.read(name)) ||
      (await this.dictionaryModel.create({ name, value }));

    param.value = value;

    return param.save();
  }
}
