import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { config } from '../../../config';

@Schema({ timestamps: false, collection: config.mongo.collections.dictionary })
export class Dictionary {
  @Prop({ index: true })
  name: string;

  @Prop()
  value: string;
}

export const DictionarySchema = SchemaFactory.createForClass(Dictionary);
