import { Controller, Get, Post, Body,  Param,  Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { JWTAuth } from 'src/auth/jwt.decorator';
import type { Request } from 'express';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.purchaseService.findOne(code);
  }

  @Post(':code/receive')
  receive(@Param('code') code: string) {
    return this.purchaseService.receive(code);
  }

  @Post(':code/cancel')
  @JWTAuth()
  update(@Param('code') code: string) {
    return this.purchaseService.cancel(code);
  }

}
