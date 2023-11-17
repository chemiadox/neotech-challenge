import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';

describe('WalletApiController', () => {
  let customerController: CustomerController;
  let transactionController: TransactionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController, TransactionController],
      providers: [CustomerService, TransactionService],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
    transactionController = app.get<TransactionController>(
      TransactionController,
    );
  });

  describe('root', () => {
    it('customer controller should exist', () => {
      expect(customerController.getCustomer).toBeDefined();
      expect(customerController.patchCustomer).toBeDefined();
      expect(customerController.deleteCustomer).toBeDefined();
    });

    it('transaction controller should exist', () => {
      expect(transactionController.postTransaction).toBeDefined();
    });
  });
});
