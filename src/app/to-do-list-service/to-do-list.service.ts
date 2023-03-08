
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private tasks: Task[] = [
    { id: 1, name: 'Tarea 1', description: 'Descripción de la tarea 1', status: 'Pendiente' },
    { id: 2, name: 'Tarea 2', description: 'Descripción de la tarea 2', status: 'Completada' },
    { id: 3, name: 'Tarea 3', description: 'Descripción de la tarea 3', status: 'Pendiente' },
  ];

  taskAdded = new EventEmitter<Task>();

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.taskAdded.emit(task);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  editTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

}

 
