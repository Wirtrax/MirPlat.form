import { Controller, Patch, Get, Param, ParseIntPipe, Body, Post, Delete} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from 'src/entities/item.entity';

@Controller('items')
export class ItemsController {
    constructor (private readonly itemsService: ItemsService) {}

    @Get()
    getAllItems(){
        return this.itemsService.getAllItems();
    }

    @Patch(':id')
    updateItem(@Param('id', ParseIntPipe) id: number, @Body() changes  ){
        return this.itemsService.updateItem(id, changes);
    }

    @Patch(':id/hide')
    hideItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.hideItem(id);
    }

    @Post('add')
    addItem(@Body()item: Item){
        return this.itemsService.addItem(item);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.deleteItem(id);
    }
}
