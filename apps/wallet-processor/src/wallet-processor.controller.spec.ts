import { Test, TestingModule } from '@nestjs/testing';
import { WalletProcessorController } from './wallet-processor.controller';
import { WalletProcessorService } from './wallet-processor.service';

describe('WalletProcessorController', () => {
  let walletProcessorController: WalletProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletProcessorController],
      providers: [WalletProcessorService],
    }).compile();

    walletProcessorController = app.get<WalletProcessorController>(
      WalletProcessorController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(walletProcessorController.getHello()).toBe('Hello World!');
    });
  });
});
