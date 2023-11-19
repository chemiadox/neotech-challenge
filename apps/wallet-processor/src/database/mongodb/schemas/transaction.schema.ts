import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true, collection: 'transactions' })
export class Transaction {
  @Prop()
  value: Types.Decimal128;

  @Prop()
  latency: number;

  @Prop({ index: true })
  customer_id: string;

  @Prop({ type: MongooseSchema.Types.Boolean, default: false, index: true })
  failed: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
