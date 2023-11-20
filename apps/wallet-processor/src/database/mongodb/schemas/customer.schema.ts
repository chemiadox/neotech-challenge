import { Decimal128, HydratedDocument, Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import { config } from '../../../config';

export type CustomerDocument = HydratedDocument<Customer>;

export class CustomerDocumentAddress {
  coordinates: {
    lat: Types.Decimal128;
    lon: Types.Decimal128;
  };
  country: string;
  state: string;
  street_address: string;
  street_name: string;
  zip_code: string;
}

export class CustomerDocumentCreditCard {
  balance: Decimal128;
  cc_number: string;
}

export class CustomerDocumentEmployment {
  title: string;
  key_skill: string;
}

@Schema({
  timestamps: true,
  collection: config.mongo.collections.users,
  autoIndex: true,
})
export class Customer {
  @Prop({ index: true })
  uid: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  username: string;

  @Prop()
  gender: string;

  @Prop()
  phone_number: string;

  @Prop()
  social_insurance_number: string;

  @Prop()
  avatar: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  email: string;

  @Prop(raw(CustomerDocumentEmployment))
  employment: CustomerDocumentEmployment;

  @Prop(raw(CustomerDocumentCreditCard))
  credit_card: CustomerDocumentCreditCard;

  @Prop(raw(CustomerDocumentAddress))
  address: CustomerDocumentAddress;

  @Prop({ type: Boolean, default: false })
  deleted: { type: boolean; default: false };
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
