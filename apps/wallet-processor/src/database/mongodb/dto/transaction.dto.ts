export class TransactionDto {
  value: number;
  latency: number;
  customerId: string;
  failed?: boolean;
}
