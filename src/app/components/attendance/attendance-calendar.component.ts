import {Component, OnInit} from '@angular/core';
import {SchoolClass, Student} from "../models/all.models";
import {HttpErrorResponse} from "@angular/common/http";
import {StudentService} from "../students/students.service";
import {ClassService} from '../classes/class.service';
import {AttendanceService} from "./attendance.service";

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css']
})
export class AttendanceCalendarComponent implements OnInit {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysInMonth: any[] = [];

  classes: SchoolClass[];
  selectedClass = "Class 1";
  students: Student[] = [];
  selectedStudent: number;

  selectedDay: Date | null = null;
  selectedDayKey: number;
  selectedStatus: string;
  constructor(private studentService: StudentService, private classService: ClassService,
              private attendanceService: AttendanceService) {
  }

  ngOnInit() {
    this.loadStudents();
    this.classService.getAll().subscribe(
      (data: SchoolClass[]) => {
        this.classes = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students', error);
      }
    );
    this.generateCalendar();
  }

  loadStudents() {
    this.studentService.getAll().subscribe(
      (data: Student[]) => {
        this.students = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students', error);
      }
    );
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    this.daysInMonth = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateObj = new Date(this.currentYear, this.currentMonth, d);
      const key = this.getDateKey(dateObj);
      const status = this.getDayStatus(key);
      this.daysInMonth.push({
        date: dateObj,
        today: key === Number(new Date().toISOString().split("T")[0]),
        status: status
      });
    }
  }

  private getDateKey(date: Date): number {
    return Number(date.toISOString().split("T")[0].replace(/-/g, '')); // e.g., 20250803
  }

  getDayStatus(dateKey: number): string {
    const student = this.students.find(s => s.id === this.selectedStudent);

    if (!student || !student.attendance || !student.attendance[dateKey]) {
      return ''; // or 'N/A' or 'ABSENT' as default
    }

    return student.attendance[dateKey].status;
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  openAttendance(date: Date) {
    this.selectedDay = date;
    this.selectedDayKey = this.getDateKey(date);
  }
  selectedStudentObject: Student | null = null;
  saveDayAttendance() {
    this.selectedStudentObject = this.students.find(s => s.id === Number(this.selectedStudent))!;
    const request = {"studentId":this.selectedStudent, "date": this.selectedDay,
    "selectedStatus":this.selectedStatus};
    this.attendanceService.saveAttendance( request).subscribe(savedAttendance => {
      const id = savedAttendance.id; // Ensure backend returns date in same format
      if (this.selectedStudentObject) {
        this.selectedStudentObject.attendance = this.selectedStudentObject.attendance || {};
        this.selectedStudentObject.attendance[id] = savedAttendance;
      }
      alert("Attendance saved for " + this.selectedStudentObject?.name);
    });
    this.generateCalendar();
    this.closeDialog();
  }

  closeDialog() {
    this.selectedDay = null;
  }

  loadAttendance() {
    this.generateCalendar();
  }

  filteredStudents(): Student[] {
    return this.students
      .filter((s: Student) =>
        (this.selectedClass === '' || (s.schoolClass?.id?.toString() ?? '') === this.selectedClass));
  }
}
