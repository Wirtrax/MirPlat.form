import { Controller, Post, UnprocessableEntityException, Req, Body, InternalServerErrorException } from '@nestjs/common';
import { PhotoCheckService } from './photo-check.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { PhotoCheckDto } from './dto/photo-check.dto';

@Controller('api/activities')
export class PhotoCheckController {
    constructor(
        private readonly photoCheckService: PhotoCheckService,
    ) {}


    @JWTAuth()
    @Post('photo_check/status')
    async checkAttempt(@Req() request) {
        return this.photoCheckService.checkOnReplyPhotoCheck(request['userId'])
    }

    @JWTAuth()
    @Post('photo_check')   //TODO: Пока не знаю как назвать
    async aclaimOrRejectPhotoCheck(
            @Req() req: Request,
            @Body() photoCheckDto: PhotoCheckDto,
    ) {
        const userId = req['userId'];

        if (!userId) {
            throw new UnprocessableEntityException('userId is not authenticated')
        }

        if (typeof userId !== 'number') {
            throw new UnprocessableEntityException('userId should be number')
        }

        try {
            const isApproved = photoCheckDto.flag; 

            if(isApproved) {
                await this.photoCheckService.claimRewardPhotoCheck(userId)

                return {
                message: 'Photo check successfully claimed',
                status: 'claimed' 
                };  

            } else {
                return {
                message: 'Photo check rejected',
                status: 'rejected' 
                };
            };
               
        } catch(error) {
            throw new InternalServerErrorException('Error during adding reward');
        }
    }
}
