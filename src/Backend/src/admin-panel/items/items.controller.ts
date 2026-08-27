import { Controller, Patch, Query, Get, Param, ParseIntPipe, Body, Post, Delete, UseGuards} from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateItemDto } from './itemDto/updateItemDto';
import { CreateItemDto } from './itemDto/createItemDto';

@Controller('items')
export class ItemsController {
    constructor (private readonly itemsService: ItemsService) {}

    //@UseGuards(JwtGuard, RolesGuard)
    @Get()
    getAllItems(){
        return this.itemsService.getAllItems();
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Get('images')
    getImages() {
        return this.itemsService.getImages();
    }
    //@UseGuards(JwtGuard, RolesGuard)
    @Get('search')
    searchItems(@Query('q') query: string) {
        return this.itemsService.searchItemsByName(query);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Patch(':id/status')
    changeStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: boolean) {
        return this.itemsService.changeStatusItem(id, status);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    updateItem(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto:UpdateItemDto  ){
        return this.itemsService.updateItem(id, updateItemDto);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Post()
    addItem(@Body()createItemDto: CreateItemDto){
        return this.itemsService.addItem(createItemDto);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    /*@Delete(':id')
    deleteItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.deleteItem(id);
    }*/
}
