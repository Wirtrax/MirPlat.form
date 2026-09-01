import { Controller, Patch, UploadedFile, ParseFilePipeBuilder,HttpStatus, Query, Get, Param, ParseIntPipe, Body, Post, Delete, UseGuards, UseInterceptors} from '@nestjs/common';
import { ItemsService } from './items.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateItemDto } from './itemDto/updateItemDto';
import { CreateItemDto } from './itemDto/createItemDto';
import { join } from 'path';

@Controller('items')
export class ItemsController {
    constructor (private readonly itemsService: ItemsService) {}

    //@UseGuards(JwtGuard, RolesGuard)
    @Get()
    getAllItems(){
        console.log('MEDIA_PATH from env:', process.env.MEDIA_PATH);
        
        return this.itemsService.getAllItems();
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Get('images')
    getImages() {
        return this.itemsService.getImages();
    }
    
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
    @UseInterceptors(FileInterceptor('image'))
    updateItem(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: /(jpeg|png)/ })
                .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        ) image: Express.Multer.File | undefined,
        @Body() updateItemDto: UpdateItemDto,
    ) {
        return this.itemsService.updateItem(id, updateItemDto, image);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    addItem(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: /(jpeg|png)/ })
                .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
                .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
        ) image: Express.Multer.File,
        @Body() createItemDto: CreateItemDto,
    ) {
        return this.itemsService.addItem(createItemDto, image);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    /*@Delete(':id')
    deleteItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.deleteItem(id);
    }*/
}
