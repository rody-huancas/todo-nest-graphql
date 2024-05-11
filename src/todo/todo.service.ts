import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Todo 1',
      done: false,
    },
    {
      id: 2,
      description: 'Todo 2',
      done: false,
    },
    {
      id: 3,
      description: 'Todo 3',
      done: false,
    },
  ];

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);

    if(!todo) throw new NotFoundException(`Todo with ${id} not found`);

    return todo;
  }

  create( createTodoInput: CreateTodoInput ): Todo {
    const todo = new Todo();

    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

    this.todos.push( todo );

    return todo;
  }
}
