// components/reports/reports.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  topStudents: any[] = [];
  feePerClass: any[] = [];
  teacherWorkload: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getTopStudents().subscribe(data => this.topStudents = data);
    this.reportService.getFeePerClass().subscribe(data => this.feePerClass = data);
    this.reportService.getTeacherWorkload().subscribe(data => this.teacherWorkload = data);
  }
}

