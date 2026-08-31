import { Body, Controller, Get, InternalServerErrorException, Post, UnprocessableEntityException, ForbiddenException, BadRequestException, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Request, Sse, Query, NotFoundException} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TetrisService } from './tetris.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { CreateTetrisAttemptDto } from './dto/create-tetris-attempt.dto';
import { Observable } from 'rxjs';
import { UsersService } from 'src/admin-panel/users/users.service';
import { privateDecrypt } from 'crypto';


@Controller('api/activities')
export class TetrisController {
    constructor(
        private readonly tetrisService: TetrisService
    ) {}

    @JWTAuth()
    @Get('tetris_attempt_status')
    async getStatusUpdate(
        @Req() request: Request,
        //@Query('userId') user_id: string,
    ) {
        //const user_id_num = parseInt(user_id, 10)
        //const userId = request['userId'] || user_id_num;

        const userId = request['userId']

        if (!userId) {
            throw new UnprocessableEntityException('userId is not authenticated')
        }

        if (typeof userId !== 'number') {
            throw new UnprocessableEntityException('userId should be number')
        }

        try {
            const attempt = await this.tetrisService.getTetrisAttemptStatus(userId)
            return attempt;
        } catch(error) {
            if (error instanceof NotFoundException ||
                error instanceof ForbiddenException
            ) {
                throw error;
            }

            throw new InternalServerErrorException('Error during getting attempt status')
        }
    }

    @JWTAuth()
    @Get('tetris')
    async getTetrisReference(): Promise<{ link: string }> {
        try {
            const link = await this.tetrisService.getLinkOfTetrisReference();
            return { link }            
        } catch(error) {
            if (error instanceof NotFoundException ||
                error instanceof ForbiddenException
            ) {
                throw error;
            }

            throw new InternalServerErrorException('Error during sending reference link');
        }
    }

    @JWTAuth()
    @Post('tetris')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
            .addMaxSizeValidator({ maxSize: 5*1024*1024 }) // 5 мб
            .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })) 
            file: Express.Multer.File,
        @Req() req: Request,
        //@Query('userId') user_id: string, // УДАЛИТЬ
        ) {
        // const user_id_num = parseInt(user_id, 10) //УДАЛИТЬ 
        // const userId = user_id_num; // УДАЛИТЬ

        const userId = req['userId'];

        if (!userId) {
            throw new UnprocessableEntityException('userId is not authenticated')
        }

        if (typeof userId !== 'number') {
            throw new UnprocessableEntityException('userId should be number')
        }

        try {
            await this.tetrisService.savePhotoAndCreateAttempt(userId, file)
        } catch(error) {
            if (error instanceof NotFoundException ||
                error instanceof ForbiddenException ||
                error instanceof InternalServerErrorException
            ) {
                throw error;
            }

            throw new InternalServerErrorException('Unpredicted Error during saving file and creating attempt ')
        }
    }

    @JWTAuth()
    @Get('tetris_status')
    async checkAttempt(@Req() request) {
        return this.tetrisService.checkOnReplyTetris(request['userId'])
    }
}