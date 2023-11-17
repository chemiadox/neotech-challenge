import { Test, TestingModule } from '@nestjs/testing';
import { WalletApiController } from './wallet-api.controller';
import { WalletApiService } from './wallet-api.service';

describe('WalletApiController', () => {
  let walletApiController: WalletApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletApiController],
      providers: [WalletApiService],
    }).compile();

    walletApiController = app.get<WalletApiController>(WalletApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(walletApiController.getHello()).toBe('Hello World!');
    });
  });
});
