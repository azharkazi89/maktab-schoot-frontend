import {Component, OnInit} from '@angular/core';
import {StudentService} from './students.service'; // correct path
import {Fee, Student} from '../models/all.models'; // correct path
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from "../classes/class.service";
import {AttendanceService} from "../attendance/attendance.service";

@Component({
  selector: 'app-students',
  templateUrl: './student-details.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any;


  constructor(private router: ActivatedRoute, private route: Router,  // ← add this
              private studentService: StudentService,
              private classService: ClassService,
              private attendanceService: AttendanceService) {
  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.get(+id).subscribe((data: Student) => {
        this.student = data;
        this.calculateFees();
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        this.attendanceService.getAttendanceSummary(Number(id), year, month).subscribe(summary => {
          this.student.attendance = summary;
        });
      });
    }
  }

  editStudent() {
    this.route.navigate(['/students/edit', this.student.id]);
  }

  getAttendance(id: number) {
    this.route.navigate(['/student/' + id + '/attendance']);
  }

  getFeesDetails(id: number) {
    this.route.navigate(['/student/' + id + '/fees']);
  }

  get attendancePercentage(): number {
    if (this.student.attendance.total) {
      return (this.student.attendance.attended / this.student.attendance.total) * 100;
    }
    return 0;
  }
  totalFees: number = 0;
  paidFees: number = 0;
  dueFees: number = 0;
  monthlyFee: number = 200;
  calculateFees(): void {
    const admission = new Date(this.student.admissionDate);
    const today = new Date();

    // Calculate number of months from admission to today
    let months =
      (today.getFullYear() - admission.getFullYear()) * 12 +
      (today.getMonth() - admission.getMonth()) + 1;

    // Total fees = months * monthlyFee
    this.totalFees = months * this.monthlyFee;

    // Paid fees = sum of paidAmount in fees array
    if (this.student.fees && this.student.fees.length > 0) {
      this.paidFees = this.student.fees
        .map((fee: Fee) => fee.paidAmount)
        .reduce((sum: number, amount: number) => sum + amount, 0);
    } else {
      this.paidFees = 0;
    }


    // Due fees = total - paid
    this.dueFees = this.totalFees - this.paidFees;
  }

}

