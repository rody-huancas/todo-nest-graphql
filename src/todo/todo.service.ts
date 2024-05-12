import { Todo } from './entity/todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Todo 1', done: false },
    { id: 2, description: 'Todo 2', done: true },
    { id: 3, description: 'Todo 3', done: false },
    { id: 3, description: 'Todo 4', done: true },
    { id: 3, description: 'Todo 5', done: true },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);

    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with ID '${id}' not found`);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();

    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    const { description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });

    return todoToUpdate;
  }

  remove(id: number): boolean {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return true;
  }
}
