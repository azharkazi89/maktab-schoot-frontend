// components/attendance/attendance.component.ts
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/all.models';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit {
   attendance: Attendance[] = []; // ✅ Declare the property

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.attendanceService.getAll().subscribe((data: Attendance[]) => {
      this.attendance = data;  // use 'attendance' instead of 'records'
    }, (error: any) => {
      console.error('Error fetching attendance', error);
    });
  }
 loadAttendance(): void {
    this.attendanceService.getAll().subscribe((data: Attendance[]) => {
      this.attendance = data;  // ✅ use 'attendance' instead of 'records'
    }, (error: any) => {
      console.error('Error fetching attendance', error);
    });
  }

  // ✅ Add this method
  deleteAttendance(id: number): void {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      this.attendanceService.delete(id).subscribe(() => {
       this.attendance = this.attendance.filter((a: Attendance) => a.id !== id);
      }, (error: any) => {
        console.error('Error deleting attendance', error);
      });
    }
  }
}
