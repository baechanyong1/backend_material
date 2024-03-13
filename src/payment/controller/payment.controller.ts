// payment.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import axios, { AxiosResponse } from 'axios';
import { TokenPayload } from 'src/auth/types';

interface ApiResponse<T = any> {
  data: T;
}

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('confirm')
  async confirmPayment(
    @Req() payload: TokenPayload,
    @Body() paymentData: any,
    userId: string,
  ) {
    const { paymentKey, orderId, amount } = paymentData;
    const widgetSecretKey = 'test_sk_DLJOpm5QrlPjNM02gNqLrPNdxbWn';
    //const widgetSecretKey = 'your-tossPaymentSecretKey';
    const encryptedSecretKey = `Basic ${Buffer.from(widgetSecretKey + ':').toString('base64')}`;

    try {
      // AxiosResponse를 기다리기 위해 await 키워드 추가
      const response: AxiosResponse<ApiResponse> = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          orderId: orderId,
          amount: amount,
          paymentKey: paymentKey,
        },
        {
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        },
      );

      return await this.paymentService.addPoint(response.data, payload);
    } catch (error) {
      // 에러 처리
      console.error(error.response.data);
      throw new Error(error.response.data);
    }
  }
}
