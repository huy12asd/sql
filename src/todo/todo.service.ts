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
      todo.id=todoData.id;
      todo.todo = todoData.todo;
      todo.done = false;
      return this.todoRepository.save(todo);//ko tao id co the tao them , khi tao bo id o database
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

    
  }
