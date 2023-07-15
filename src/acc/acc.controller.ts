import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccService } from './acc.service';
import { CreateAccDto } from './dto/create-acc.dto';
import { UpdateAccDto } from './dto/update-acc.dto';

@Controller('acc')
export class AccController {
  constructor(private readonly accService: AccService) {}

  @Post()
  create(@Body() createAccDto: CreateAccDto) {
    return this.accService.create(createAccDto);
  }

  @Get()
  findAll() {
    return this.accService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccDto: UpdateAccDto) {
    return this.accService.update(+id, updateAccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accService.remove(+id);
  }
}
