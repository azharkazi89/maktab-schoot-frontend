import {Component, OnInit} from '@angular/core';
import {FeeService} from './fees.service';
import {StudentService} from '../students/students.service';
import {ClassService} from '../classes/class.service';
import {
  Fee, BatchFeeResponse, BatchFeeRequest, FeeResponse,
  StudentFeeDTO, Student, SchoolClass
} from '../models/all.models';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

interface SelectableStudent extends Student {
  selected: boolean;
  status: string;
  selectAll: boolean;
}

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  DUE: string = 'Due';
  PAID: string = 'Paid';

  createdFees: FeeResponse[] = [];
  students: Student[] = [];
  message: string = '';
  fees: Fee[] = [];
  classes: SchoolClass[] = [];
  //classes: string[] = ['Class 1', 'Class 2', 'Class 3'];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedClass: string = '';
  selectedMonth: string = '';
  selectedStatus: string = 'ALL';
  phone: string = '';
  rollNo: string = '';
  searchText: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  //students: StudentFeeDTO[] = [];
  constructor(private feeService: FeeService, private studentService: StudentService,
              private classService: ClassService, private http: HttpClient, private router: Router) {
  }

      ngOnInit(): void {
    this.studentService.getAll().subscribe(
      (data: Student[]) => {
        this.students = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students', error);
      }
    );
    this.classService.getAll().subscribe(
      (data: SchoolClass[]) => {
        this.classes = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students', error);
      }
    );
    this.totalPages = Math.ceil(this.students.length / this.itemsPerPage);
  }

  filteredStudents(): Student[] {
    return this.students
      .filter((s: Student) =>
        (this.selectedClass === '' || (s.schoolClass?.id?.toString() ?? '') === this.selectedClass) &&
        (this.searchText === '' ||
          s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          s.phone?.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(this.searchText.toLowerCase())) &&
        s.rollNo.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (
        s.fees == null || s.fees.length === 0 ||
        s.fees.some(fee =>
          this.markStatus(s).toUpperCase() === this.selectedStatus.toUpperCase() ||
          this.selectedStatus.toUpperCase() === 'ALL'
        )
      )
      )
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
/*
  toggleFeeStatus(fee: Fee) {
    if (fee.status === 'unpaid') fee.status = 'paid';
    else if (fee.status === 'paid') fee.status = 'unpaid';
    else if (fee.status === 'fi-sabilillah') fee.status = 'paid';
  }

  selectAll: boolean = false;

  /!* toggleAllSelection() {
    (this.filteredStudents() as SelectableStudent[]).forEach((s: SelectableStudent) => (s.selected = s.selectAll));
  } *!/

  bulkUpdateStatus(status: 'paid' | 'unpaid') {
    (this.filteredStudents() as SelectableStudent[]).forEach(s => {
      if (s.selected) s.status = status;
    });
  }

  notifyParents() {
    const selectedStudents = (this.filteredStudents() as SelectableStudent[])
      .filter((s: SelectableStudent) => s.selected)
      .map((s: Student) => s.name);
    if (selectedStudents.length === 0) {
      alert('Please select at least one student.');
      return;
    }
    alert('Notification sent to parents of: ' + selectedStudents.join(', '));
  }*/

  selectedIds = new Set<number>();

  assignFees(s: string) {

    const request: BatchFeeRequest = {
      studentIds: Array.from(this.selectedIds),
      status: s
    };

    this.feeService.assignFees(request).subscribe(
      (res: BatchFeeResponse) => {  // <-- type the response
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => { // <-- type the error
        console.error('Error assigning fees:', err.message);
      }
    );
  }


  toggleSelection(s: Student) {
    if (this.selectedIds.has(s.id)) {
      this.selectedIds.delete(s.id);
    } else {
      this.selectedIds.add(s.id);
    }
  }

  getMonthsPassed(admissionDate: string | Date): number {
    const admission = new Date(admissionDate);
    const today = new Date();

    let months = (today.getFullYear() - admission.getFullYear()) * 12;
    months += today.getMonth() - admission.getMonth();

    // if current day is before admission day → subtract 1 month
    if (today.getDate() < admission.getDate()) {
      months--;
    }

    return months < 0 ? 0 : months;
  }

  markStatus(s: Student): string {
    const totalPaid = this.calculateTotalPaid(s);
    const totalPending = this.calculateTotalFees(s);
    return totalPaid-totalPending < 0 ? this.DUE : this.PAID;
  }
  calculateTotalPaid(student: Student): number {
    return (student.fees || [])
      .filter(f => f.status && f.status.toUpperCase() === 'PAID')
      .reduce((sum, f) => sum + (Number(f.paidAmount) || Number(f.paidAmount) || 0), 0);
  }

    calculateTotalFees(student: Student): number {
    const months = this.getMonthsPassed(student.admissionDate);
    const monthlyFee = Number(200) || 0;
    return months * monthlyFee;
  }

  calculatePendingFees(student: Student): number {
    const totalFees = this.calculateTotalFees(student) || 0;
    const totalPaid = this.calculateTotalPaid(student) || 0;
    return totalFees - totalPaid;
  }

  bulkNotifyParents() {
    const payload = {};
    this.http.post('/api/notify/whatsapp', payload).subscribe({
      next: () => alert('WhatsApp notification queued!'),
      error: (e: HttpErrorResponse) => alert('Failed to send WhatsApp notification')
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
