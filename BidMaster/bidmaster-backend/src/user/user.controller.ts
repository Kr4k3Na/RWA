import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: any) {
    return this.userService.create(dto);
  }

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    return this.userService.findAll({
      take: take ? Number(take) : 10,
      skip: skip ? Number(skip) : 0,
      where: {
        name: { contains: search, mode: 'insensitive' }
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.userService.update({ where: { id: Number(id) }, data: dto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: Number(id) });
  }
}