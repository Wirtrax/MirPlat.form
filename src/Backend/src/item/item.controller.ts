import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PurchaseService } from 'src/purchase/purchase.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import type { Request } from 'express';

@Controller('api/item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly purchaseService: PurchaseService
  ) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Post(':id/purchase')
  @JWTAuth()
  purchase(@Param('id') itemId: number, @Req() req: Request){
    return this.purchaseService.create(itemId, req['userId'])
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
