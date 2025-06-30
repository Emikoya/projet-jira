import { Component, input, output } from '@angular/core';
import { Task } from '../task/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [Task, CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  title = input<string>();
  tasks = input<{ title: string; libelle: string }[]>();
  formData = {
    title: '',
    libelle: ''
  };
  newTask = '';
 
  taskAdded = output<{ title: string; libelle: string }>();
  
  addTask() {
    const { title, libelle } = this.formData;
    if (title.trim().length >= 3 && libelle.trim().length >= 3) {
      this.taskAdded.emit({ title: title.trim(), libelle: libelle.trim() });
      this.formData = { title: '', libelle: '' };
    }
  }
}
