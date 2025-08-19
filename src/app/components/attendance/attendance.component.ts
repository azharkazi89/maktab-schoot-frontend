import { Component } from '@angular/core';
import { AttendanceService } from './attendance.service';

interface Attendance {
  id: number;
  studentId: number;
  studentName: string;
  className: string;
  date: string; // YYYY-MM-DD
  status: 'Present' | 'Absent' | 'Late';
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent {
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedClass: string = '';
  classes: string[] = ['Class 1', 'Class 2', 'Class 3'];
  students: any[] = [];

  // Dummy load
  loadStudents() {
    this.students = [
      { id: 1, name: 'Ali', status: 'Present' },
      { id: 2, name: 'Fatima', status: 'Absent' },
      { id: 3, name: 'Omar', status: 'Late' }
    ];
  }

  markAll(status: string) {
    this.students.forEach(s => s.status = status);
  }

  saveAttendance() {
    console.log('Attendance Saved:', this.selectedDate, this.selectedClass, this.students);
    alert('Attendance saved successfully!');
  }
}
