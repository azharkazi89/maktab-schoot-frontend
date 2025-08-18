import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css']
})
export class AttendanceCalendarComponent implements OnInit {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  daysInMonth: any[] = [];

  classes = ["Class 1", "Class 2", "Class 3"];
  selectedClass = "Class 1";
  students: any[] = [];
  selectedStudent = "";

  selectedDay: Date | null = null;
  selectedDayKey = "";

  ngOnInit() {
    this.loadStudents();
    this.generateCalendar();
  }

  loadStudents() {
    this.students = [
      { id: 1, name: "Ali", attendance: {} },
      { id: 2, name: "Fatima", attendance: {} },
      { id: 3, name: "Omar", attendance: {} }
    ];
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    this.daysInMonth = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateObj = new Date(this.currentYear, this.currentMonth, d);
      const key = dateObj.toISOString().split("T")[0];
      const status = this.getDayStatus(key);
      this.daysInMonth.push({
        date: dateObj,
        today: key === new Date().toISOString().split("T")[0],
        status: status
      });
    }
  }

  getDayStatus(dateKey: string): string | null {
    if (this.selectedStudent) {
      const student = this.students.find(s => s.id == this.selectedStudent);
      return student?.attendance[dateKey] || null;
    }
    return null;
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
    this.selectedDayKey = date.toISOString().split("T")[0];
  }

  saveDayAttendance() {
    this.generateCalendar();
    this.closeDialog();
    alert("Attendance saved for " + this.selectedDayKey);
  }

  closeDialog() {
    this.selectedDay = null;
  }

  loadAttendance() {
    this.generateCalendar();
  }
}
