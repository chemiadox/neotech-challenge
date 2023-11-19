import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true, collection: 'transactions' })
export class Transaction {
  @Prop()
  value: Types.Decimal128;

  @Prop()
  latency: number;

  @Prop()
  customer_id: string;

  @Prop({ type: MongooseSchema.Types.Boolean, default: false })
  failed: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
