import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './attendance.service';
import {Attendance, SchoolClass, Student} from "../models/all.models";
import {ClassService} from "../classes/class.service";
import {HttpErrorResponse} from "@angular/common/http";
import {StudentService} from "../students/students.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css']
})
export class AttendanceCalendarComponent implements OnInit {
  classes: any[] = []; // Fill from API
  students: any[] = []; // Fill from API
  selectedClass: number | null = null;
  selectedStudentId: number | null = null;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth(); // 0-based
  monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  daysInMonth: any[] = [];
  selectedDay: Date | null = null;
  selectedStatus = '';
  attendances: Attendance[] = []; // Fetched from API

  constructor(private attendanceService: AttendanceService,
              private classService: ClassService,
              private studentService: StudentService,
              private route: Router) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.loadClasses();
    this.loadStudents();
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
  loadClasses(){
    this.classService.getAll().subscribe(
      (data: SchoolClass[]) => {
        this.classes = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students', error);
      }
    );
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const today = new Date();

    this.daysInMonth = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.daysInMonth.push({
        date,
        today: date.toDateString() === today.toDateString(),
        status: null
      });
    }

    // Apply attendance status after calendar generation
    this.applyAttendanceToCalendar();
  }

  filteredStudents() {
    return this.students.filter(s => !this.selectedClass || s.schoolClass.id === this.selectedClass);
  }

  loadAttendance(): void {
    if (!this.selectedStudentId) {
      // Clear calendar if no student selected
      this.daysInMonth.forEach(day => day.status = null);
      return;
    }

    this.attendanceService.getMonthlyAttendance(
      [this.selectedStudentId],
      this.currentYear,
      this.currentMonth + 1
    ).subscribe({
      next: (data: Attendance[]) => {
        this.attendances = data;
        this.applyAttendanceToCalendar();
      },
      error: (err: any) => {  // ✅ Explicitly typed as any (or HttpErrorResponse)
        console.error('Error fetching attendance', err);
      }
    });

  }

  applyAttendanceToCalendar(): void {
    if (!this.attendances) return;

    this.daysInMonth.forEach(day => {
      const record = this.attendances.find(a => {
        const attDate = new Date(a.attendanceDate);
        return attDate.toDateString() === day.date.toDateString();
      });
      day.status = record ? record.attendanceStatus : null;
    });
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
    this.loadAttendance();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
    this.loadAttendance();
  }

  openAttendance(date: Date): void {
    this.selectedDay = date;
  }

  closeDialog(): void {
    this.selectedDay = null;
  }

  saveDayAttendance(): void {
    // Here you can call a POST API to save attendance for selected day
    if (!this.selectedStudentId || !this.selectedDay) return;

    console.log('Saving attendance:', {
      studentId: this.selectedStudentId,
      date: this.selectedDay,
      status: this.selectedStatus
    });
    const formattedDate = this.formatDateOnly(this.selectedDay);

    const request = {"studentId":this.selectedStudentId,"date":formattedDate, "selectedStatus":this.selectedStatus};

    this.attendanceService.saveAttendance(request).subscribe(value => {

    });

    // After save, refresh calendar
    this.loadAttendance();
    this.closeDialog();
  }
  goBack() {
    this.route.navigate(['/dashboard']);
  }

  formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
