/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthMsController } from './auth-ms.controller';
import { AuthMsService } from './auth-ms.service';

describe('AuthMsController', () => {
  let authMsController: AuthMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthMsController],
      providers: [AuthMsService],
    }).compile();

    authMsController = app.get<AuthMsController>(AuthMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authMsController.getHello()).toBe('Hello World!');
    });
  });
});
