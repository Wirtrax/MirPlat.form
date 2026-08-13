import { Controller, Patch, Get, Param, ParseIntPipe, Body, Post, Delete, UseGuards} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from 'src/entities/item.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('items')
export class ItemsController {
    constructor (private readonly itemsService: ItemsService) {}

    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    getAllItems(){
        return this.itemsService.getAllItems();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id/hide')
    hideItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.hideItem(id);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    updateItem(@Param('id', ParseIntPipe) id: number, @Body() changes  ){
        return this.itemsService.updateItem(id, changes);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    addItem(@Body()item: Item){
        return this.itemsService.addItem(item);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.deleteItem(id);
    }
    
    @UseGuards(JwtGuard, RolesGuard)
    @Get('images')
    getImages() {
        return this.itemsService.getImages();
    }
}
