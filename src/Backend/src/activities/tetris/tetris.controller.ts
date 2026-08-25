import { Body, Controller, Get, InternalServerErrorException, Post, UnprocessableEntityException, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Request} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TetrisService } from './tetris.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { CreateTetrisAttemptDto } from './dto/create-tetris-attempt.dto';


@Controller('api/activities')
export class TetrisController {
    constructor(
        private readonly tetrisService: TetrisService
    ) {}

    @JWTAuth()
    @Get('tetris')
    async getTetrisReference(): Promise<{ link: string }> {
        try {
            const link = await this.tetrisService.getLinkOfTetrisReference();
            return { link }            
        } catch(error) {
            throw new InternalServerErrorException('Error during sending reference link');
        }
    }


    @Post('tetris')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
            .addMaxSizeValidator({ maxSize: 5*1024*1024 }) // 5 мб
            .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })) 
            file: Express.Multer.File,
        @Req() req: Request,
        ) {
        const userId = req['userId'];

        if (!userId) {
            throw new UnprocessableEntityException('userId is not authenticated')
        }

        if (typeof userId !== 'number') {
            throw new UnprocessableEntityException('userId should be number')
        }

        try {
            await this.tetrisService.savePhotoAndCreateAttempt(userId, file)
        } catch {
            throw new InternalServerErrorException('Unpredicted Error during saving file and creating attempt ')
        }
    }


    @JWTAuth()
    @Get('tetris_status')
    async checkAttempt(@Req() request) {
        return this.tetrisService.checkOnReplyTetris(request['userId'])
    }
}