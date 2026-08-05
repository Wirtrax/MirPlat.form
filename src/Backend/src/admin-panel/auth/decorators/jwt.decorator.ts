import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../guards/jwt.guard";
import { ApiForbiddenResponse, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function JWTAuth(){
  return applyDecorators(
    UseGuards(JwtGuard),
    ApiSecurity('jwt'),
    ApiUnauthorizedResponse({description:"JWT token is not present or invalid"})
  );
}