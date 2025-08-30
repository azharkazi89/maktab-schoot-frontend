import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StudentService } from './students.service'; // correct path
import { SchoolClass, Teacher, Subject, Student} from '../models/all.models';             // correct path
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe((data: Student[]) => {
      this.students = data;
    }, (error: any) => {
      console.error('Error fetching students', error);
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== id);
      }, (error: any) => {
        console.error('Error deleting student', error);
      });
    }
  }

  goToDetails(id: number) {
    // Programmatic navigation
    this.router.navigate(['/student/details', id]);
  }


}

