import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StudentService } from './students.service'; // correct path
import { SchoolClass, Teacher, Subject, Student} from '../models/all.models';              // correct path
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './student-details.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any = {}
  constructor( private route: ActivatedRoute,  // ← add this
                private router: Router,
                private service: StudentService) { }

  ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
              this.service.get(+id).subscribe((data: Student) => {
                this.student = data;
              });
            }
          });
  }
  editStudent() {
    this.router.navigate(['/students/edit', this.student.id]);
  }

  goBack() {
      this.router.navigate(['/students']);
    }

  getAttendance(id: number) {
      this.router.navigate(['/students']);
    }

   getFeesDetails(id: number) {
        this.router.navigate(['/students']);
      }
}

