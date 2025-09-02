import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentService } from '../students/students.service';
import { Fee, Student } from '../models/all.models';
import {FeeService} from "./fees.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-student-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class StudentFeeDetailsComponent implements OnInit {
  studentId!: number;
  student!: Student;
  fees: Fee[] = [];
  PAID: string='PAID';
  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService,
              private feeService: FeeService) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.getStudentFees();
  }

  getStudentFees(): void {
    this.studentService.get(this.studentId).subscribe(student => {
      this.student = student;
      this.fees = student.fees; // assuming student object has fees list
    });
  }

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  notifyParents() {
     const phone = this.student.phone;
      const msg = `Assalamu Alaikum,\n` +
                  `This is a fee reminder for ${this.student.name}.\n` +
                  //(fee.status ? `Pending amount: ₹${fee.totalAmount}.\n` : '') +
                  `Please contact the office if already paid.\n` +
                  `JazakAllah Khair.\n` +
                  `Anjuman Abubakr Masjid\n`+
                  `Contact: 9762608883\n`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank'); // Opens WhatsApp Web / mobile app
  }
  newFee: Fee = {
    id:0,
    studentId:0,
    month: 'January',
    year: new Date().getFullYear(),
    paidAmount: 0,
    status: 'PAID',
    paymentDate: new Date(),
    dueDate: new Date(),
    paymentMode: 'CASH',
    recordedBy: '',
    remark: ''
  };
  isEditing:boolean;
  addFee(f:Fee) {
    f.studentId = this.studentId;
    if (f) {
      this.feeService.create(f).subscribe(savedFee => {
        this.fees.push(savedFee); // update local table
        this.newFee = {
          dueDate: new Date,
          id: 0,
          month: "",
          paidAmount: 0,
          paymentDate: new Date(),
          paymentMode: "",
          recordedBy: "",
          remark: "",
          status: "",
          studentId: 0,
          year: 0
        };
      });
    }
  }

  saveFee() {

  }

  cancel() {
    //this.newFee = null;
  }
  deleteFee(fee: Fee) {
    const confirmDelete = confirm(`Are you sure you want to delete the fee for ${this.student.name}?`);
    if (confirmDelete) {
      this.feeService.delete(fee.id).subscribe(Event => {
        this.fees = this.fees.filter(d => d.id !== fee.id);
      });
    }
  }
}
