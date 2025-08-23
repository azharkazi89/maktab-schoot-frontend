import { Component, OnInit } from '@angular/core';
import { StudentService } from '../students/students.service';
import {AttendanceService} from "./attendance.service";
import { Student } from '../models/all.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedClass: string = '';
  classes: string[] = ['Class 1', 'Class 2', 'Class 3'];
  students: Student[] = [];
  message: string = '';

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe(
      (data: Student[]) => {
        this.students = data.map(student => ({
          ...student,
          status: 'PRESENT' // default status
        }));
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students', error);
        this.message = 'Failed to load students!';
      }
    );
  }

  markAll(status: string) {
    this.students.forEach(s => s.status = status);
  }

  saveAttendance() {
    console.log('Attendance Saved:', this.selectedDate, this.selectedClass, this.students);
    alert('Attendance saved successfully!');
    // TODO: Call AttendanceService to POST data to backend
  }
}
