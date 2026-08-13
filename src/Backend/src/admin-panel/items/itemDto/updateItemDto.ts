import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './createItemDto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}