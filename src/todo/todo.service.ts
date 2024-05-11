import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs';

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
    if(!todo) throw new NotFoundException(`Todo with ID '${id}' not found`);
    return todo;
  }

  create( createTodoInput: CreateTodoInput ): Todo {
    const todo = new Todo();

    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

    this.todos.push( todo );

    return todo;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const {id, description, done} = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if(description) todoToUpdate.description = description;
    if(done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map(todo => {
      return (todo.id === id) ? todoToUpdate : todo;
    })

    return todoToUpdate;
  }

  remove(id: number): boolean {
    const todo = this.findOne(id);

    this.todos = this.todos.filter(todo => todo.id!== id);

    return true;
  }
}
