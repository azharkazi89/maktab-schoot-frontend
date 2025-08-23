import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service'; // correct path
import { SchoolClass, Teacher, Subject, Student} from '../models/all.models';       // correct path

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: SchoolClass[] = [];

  constructor(private classService: ClassService) { }  // inject service

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classService.getAll().subscribe((data: SchoolClass[]) => {
      this.classes = data;
    }, (error: any) => {
      console.error('Error fetching classes', error);
    });
  }

  showStudents(student: Student): void {

  }
  showTeachers(teacher: Teacher): void {

  }
  showSubjects(subject: Subject): void {

  }

  deleteClass(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.delete(id).subscribe(() => {
        this.classes = this.classes.filter(c => c.id !== id);
      }, (error: any) => {
        console.error('Error deleting class', error);
      });
    }
  }
}
