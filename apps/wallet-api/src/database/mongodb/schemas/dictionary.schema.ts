import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: false, collection: 'dictionary' })
export class Dictionary {
  @Prop({ index: true })
  name: string;

  @Prop()
  value: string;
}

export const DictionarySchema = SchemaFactory.createForClass(Dictionary);
