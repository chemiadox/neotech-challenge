import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true, collection: 'transactions' })
export class Transaction {
  @Prop()
  value: Types.Decimal128;

  @Prop()
  latency: number;

  @Prop()
  customer_id: string;

  @Prop({ type: Boolean, default: false })
  failed: { type: boolean; default: false };
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
