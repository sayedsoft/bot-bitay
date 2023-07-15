import { Injectable } from '@nestjs/common';
import { CreateAccDto } from './dto/create-acc.dto';
import { UpdateAccDto } from './dto/update-acc.dto';

@Injectable()
export class AccService {
  create(createAccDto: CreateAccDto) {
    return 'This action adds a new acc';
  }

  findAll() {
    return `This action returns all acc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acc`;
  }

  update(id: number, updateAccDto: UpdateAccDto) {
    return `This action updates a #${id} acc`;
  }

  remove(id: number) {
    return `This action removes a #${id} acc`;
  }
}
