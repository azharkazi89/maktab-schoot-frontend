import { Component, OnInit } from '@angular/core';

interface Fee {
  studentName: string;
  class: string;
  month: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'fi-sabilillah';
  selected?: boolean; // <-- add this property
}

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  fees: Fee[] = [];
  classes: string[] = ['Class 1', 'Class 2', 'Class 3'];
  months: string[] = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];

  selectedClass: string = '';
  selectedMonth: string = '';
  selectedStatus: string = '';
  searchText: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    // Sample data
    this.fees = [
      { studentName: 'Ali Khan', class: 'Class 1', month: 'January', amount: 5000, status: 'paid' },
      { studentName: 'Sara Ahmed', class: 'Class 2', month: 'February', amount: 4500, status: 'unpaid' },
      { studentName: 'Omar Farooq', class: 'Class 1', month: 'March', amount: 5000, status: 'paid' },
      { studentName: 'Fatima Noor', class: 'Class 3', month: 'April', amount: 4800, status: 'fi-sabilillah' },
      // add more sample records as needed
    ];

    this.totalPages = Math.ceil(this.fees.length / this.itemsPerPage);
  }

  filteredFees(): Fee[] {
    return this.fees.filter(fee =>
      (this.selectedClass === '' || fee.class === this.selectedClass) &&
      (this.selectedMonth === '' || fee.month === this.selectedMonth) &&
      (this.selectedStatus === '' || fee.status === this.selectedStatus) &&
      (this.searchText === '' || fee.studentName.toLowerCase().includes(this.searchText.toLowerCase()))
    ).slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  getTotalFees(): number {
    return this.fees.reduce((sum, fee) => sum + fee.amount, 0);
  }

  getPendingFees(): number {
    return this.fees
      .filter(fee => fee.status === 'unpaid')
      .reduce((sum, fee) => sum + fee.amount, 0);
  }

  addFee() {
    alert('Add Fee functionality can be implemented here.');
  }

  editFee(fee: Fee) {
    alert(`Edit Fee for ${fee.studentName}`);
  }

  deleteFee(fee: Fee) {
    const confirmDelete = confirm(`Are you sure you want to delete the fee for ${fee.studentName}?`);
    if (confirmDelete) {
      this.fees = this.fees.filter(f => f !== fee);
      this.totalPages = Math.ceil(this.fees.length / this.itemsPerPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

toggleFeeStatus(fee: Fee) {
  if (fee.status === 'unpaid') fee.status = 'paid';
  else if (fee.status === 'paid') fee.status = 'unpaid';
  else if (fee.status === 'fi-sabilillah') fee.status = 'paid';
}

selectAll: boolean = false;

toggleAllSelection() {
  this.filteredFees().forEach(fee => fee.selected = this.selectAll);
}

bulkUpdateStatus(status: 'paid' | 'unpaid') {
  this.filteredFees().forEach(fee => {
    if (fee.selected) fee.status = status;
  });
}

notifyParents() {
  const selectedStudents = this.filteredFees().filter(f => f.selected).map(f => f.studentName);
  if (selectedStudents.length === 0) {
    alert('Please select at least one student.');
    return;
  }
  alert('Notification sent to parents of: ' + selectedStudents.join(', '));
}

}
