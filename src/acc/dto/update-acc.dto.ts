import { PartialType } from '@nestjs/mapped-types';
import { CreateAccDto } from './create-acc.dto';

export class UpdateAccDto extends PartialType(CreateAccDto) {}
