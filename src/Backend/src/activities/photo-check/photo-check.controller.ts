import { Controller, Post, Get, UnprocessableEntityException, Req, Body, InternalServerErrorException } from '@nestjs/common';
import { PhotoCheckService } from './photo-check.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { PhotoCheckDto } from './dto/photo-check.dto';

@Controller('api/activities')
export class PhotoCheckController {
    constructor(
        private readonly photoCheckService: PhotoCheckService,
    ) {}

    @JWTAuth()
    @Post('photo_check')
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

        const isApproved = photoCheckDto.flag;

        try {
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

    @JWTAuth()
    @Get('photo_check_status')
    async checkAttempt(@Req() request) {
        return this.photoCheckService.checkOnReplyPhotoCheck(request['userId'])
    }
}
