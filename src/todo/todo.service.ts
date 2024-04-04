import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(todoData: Partial<Todo>): Promise<Todo> {
    const todo = new Todo();
    todo.todo = todoData.todo;
    todo.done = todoData.done || false;
    return this.todoRepository.save(todo);
  }

  async update(id: number, todoData: Partial<Todo>): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return this.todoRepository.save({ ...todo, ...todoData });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async toggleEdit(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.done = !todo.done; // Chuyển đổi trạng thái chỉnh sửa
    return this.todoRepository.save(todo);
  }
}
