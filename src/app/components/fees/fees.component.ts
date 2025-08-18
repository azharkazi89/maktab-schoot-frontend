import { Component, OnInit } from '@angular/core';
import { FeeService } from '../../services/fees.service';  // correct path
import { Fee } from '../../models/all.models';           // correct path

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  fees: Fee[] = [];

  constructor(private feeService: FeeService) { }  // inject service

  ngOnInit(): void {
    this.loadFees();
  }

  loadFees(): void {
    this.feeService.getAll().subscribe((data: Fee[]) => {
      this.fees = data;
    });
  }  // <-- end loadFees
 deleteFee(id: number): void {
    if (confirm('Are you sure you want to delete this fee record?')) {
      this.feeService.delete(id).subscribe(() => {
        this.fees = this.fees.filter(f => f.id !== id);
      }, (error: any) => {
        console.error('Error deleting fee', error);
      });
    }
  }
}  // <-- end class
