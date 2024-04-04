import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() todoData: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todoData);
  }

  @Put(':id/toggleEdit') // Thêm /toggleEdit vào đường dẫn của phương thức PUT
  async toggleEdit(@Param('id') id: string): Promise<Todo> { // Thay đổi tên phương thức thành toggleEdit
    return this.todoService.toggleEdit(+id);
  }

  @Put(':id') // Giữ nguyên phương thức PUT cũ cho việc cập nhật thông tin todo
  async update(@Param('id') id: string, @Body() todoData: Partial<Todo>): Promise<Todo> {
    return this.todoService.update(+id, todoData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(+id);
  }
}