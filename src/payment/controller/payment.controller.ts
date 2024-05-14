// payment.controller.ts
import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import axios, { AxiosResponse } from 'axios';
import { TokenPayload } from 'src/auth/types';
import { AuthGuard } from 'src/auth/middleware/auth.guard';
import { Order } from '../entities';
import { CreateOrderDto } from '../dto';

interface ApiResponse<T = any> {
  data: T;
}

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('confirm')
  async confirmPayment(@Req() request, @Body() paymentData: any) {
    const { paymentKey, orderId, amount } = paymentData;
    const widgetSecretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';
    //const widgetSecretKey = 'your-tossPaymentSecretKey';
    const encryptedSecretKey =
      'Basic ' + Buffer.from(widgetSecretKey + ':').toString('base64');
    console.log('1111', request.user.id);
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
      return await this.paymentService.addPoint(response.data, request.user.id);
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data);
    }
  }

  @UseGuards(AuthGuard)
  @Post('/order')
  async order(@Req() request, @Body() dto: CreateOrderDto): Promise<Order> {
    return await this.paymentService.initOrder(dto, request.user.id);
  }
}
