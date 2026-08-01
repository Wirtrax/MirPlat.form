import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiForbiddenResponse, ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TelegramInitdataGuard } from './telegram-initdata.guard';
export function TelegramInitDataAuth(){
  return applyDecorators(
    UseGuards(TelegramInitdataGuard),
    ApiSecurity('tma'),
    ApiUnauthorizedResponse({description:"Initdata is not present or invalid"})
  );
}
