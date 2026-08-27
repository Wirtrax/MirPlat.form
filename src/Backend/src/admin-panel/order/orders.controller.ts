import { Controller, Get, Param, ParseIntPipe, Patch, Query, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './orders.service';
import { PurchaseStatus } from 'src/entities/purchase.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    //@UseGuards(JwtGuard, RolesGuard)
    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Get('by-item/:itemId') 
    getOrdersByItemId(@Param('itemId') itemId: number) {
        return this.orderService.getOrdersByItemId(itemId);
    }
    
    //@UseGuards(JwtGuard, RolesGuard)
    @Get(':id')
    getOrder(@Param('id', ParseIntPipe) orderId: number) {
        return this.orderService.getOrder(orderId);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Get('details')
    getDetailedReport(
        @Query('userId', ParseIntPipe) userId: number, 
        @Query('itemId', ParseIntPipe) itemId: number
    ) {
        return this.orderService.getPurchaseDetails(userId, itemId);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status') status: PurchaseStatus
    ) {
        return this.orderService.updateStatus(id, status);
    }

}
