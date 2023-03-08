
import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../to-do-list-service/to-do-list.service';
import { Task } from '../models/task.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit{
  tasks: Task[] = [];
  task: Task = new Task(0, '', '', '');

  formTitle = 'Agregar tarea';
  formButton = 'Agregar tarea';
  showForm = false;

  constructor(private toDoListService: ToDoListService) {}

  ngOnInit(): void {
    this.tasks = this.toDoListService.getTasks();
    this.toDoListService.taskAdded.subscribe((task: Task) => {
      this.tasks.push(task);
    });
    
  }

  openForm(): void {
    this.showForm = true;
    this.formTitle = 'Agregar tarea';
    this.formButton = 'Agregar tarea';
    this.task = new Task(0, '', '', '');
  }

  closeForm(): void {
    this.showForm = false;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.task.id === 0) {
        // Agregar tarea
        this.toDoListService.addTask(this.task);
      } else {
        // Editar tarea
        this.toDoListService.editTask(this.task);
      }
      this.showForm = false;
    }
  }

  editTask(task: Task): void {
    this.task = { ...task };
    this.formTitle = 'Editar tarea';
    this.formButton = 'Guardar cambios';
    this.showForm = true;
  }

  deleteTask(id: number): void {
    this.toDoListService.deleteTask(id);
  }
  
}
  
