import { Controller, Get, Param, ParseIntPipe, Patch, Query, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { PurchaseStatus } from 'src/entities/purchase.entity';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Get('details')
    getDetailedReport(
        @Query('userId', ParseIntPipe) userId: number, 
        @Query('itemId', ParseIntPipe) itemId: number
    ) {
        return this.orderService.getPurchaseDetails(userId, itemId);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status') status: PurchaseStatus
    ) {
        return this.orderService.updateStatus(id, status);
    }
}
