import { Controller, Get, Post, Body,  Param,  Req, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import type { Request } from 'express';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiPaymentRequiredResponse } from '@nestjs/swagger';

@Controller('api/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  
  @Get(':code')
  @ApiNotFoundResponse({description:'Purchase not found'})
  async findOne(@Param('code') code: string) {
    const purchase = await this.purchaseService.findOne(code);
    if(purchase == null){
      throw new NotFoundException("Purchase not found");
    }
    return purchase;
  }

  @Post(':code/receive')
  @ApiNotFoundResponse({description:"Purchase not found"})
  @ApiForbiddenResponse({description:"Purchase already received or canceled"})
  receive(@Req() request, @Param('code') code: string) {
    return this.purchaseService.receive(code, request['userId']);
  }

  @Post(':code/cancel')
  @JWTAuth()
  @ApiNotFoundResponse({description:"Purchase not found"})
  @ApiForbiddenResponse({description:"Purchase already received or canceled"})
  update(@Req() request, @Param('code') code: string) {
    return this.purchaseService.cancel(code, request['userId']);
  }

}
