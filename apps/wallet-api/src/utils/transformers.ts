import { Schema } from 'mongoose';

import { CustomerDocument } from '../database/mongodb/schemas/customer.schema';

export type SeedDto = {
  uid: string;
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  avatar: string;
  date_of_birth: { $date: string };
  email: string;
  employment: { title: string; key_skill: string };
  credit_card: { cc_number: string; ballance: number };
  address: {
    coordinates: { lat: number; lng: number };
    country: string;
    state: string;
    street_address: string;
    street_name: string;
    zip_code: string;
  };
  createdAt: { $date: string };
  updatedAt: { $date: string };
};

export const transformCustomerSeedToDocument = (dto: SeedDto) => {
  const dateOfBirth = new Date(dto.date_of_birth.$date);
  const createdAt = new Date(dto.createdAt.$date);
  const updatedAt = new Date(dto.createdAt.$date);

  return {
    uid: dto.uid,
    first_name: dto.first_name,
    last_name: dto.last_name,
    username: dto.username,
    gender: dto.gender,
    phone_number: dto.phone_number,
    social_insurance_number: dto.social_insurance_number,
    avatar: dto.avatar,
    date_of_birth: isNaN(+dateOfBirth) ? null : dateOfBirth,
    email: dto.email,
    employment: dto.employment,
    credit_card: {
      cc_number: dto.credit_card.cc_number,
      balance: new Schema.Types.Decimal128(
        dto.credit_card.ballance.toString(10),
      ),
    },
    address: {
      ...dto.address,
      coordinates: {
        lat: new Schema.Types.Decimal128(
          dto.address.coordinates.lat.toString(10),
        ),
        lng: new Schema.Types.Decimal128(
          dto.address.coordinates.lng.toString(10),
        ),
      },
    },
    createdAt,
    updatedAt,
  } as unknown as CustomerDocument;
};
