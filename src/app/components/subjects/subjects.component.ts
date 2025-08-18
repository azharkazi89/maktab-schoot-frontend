import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subjects.service'; // point to service, not model
import { Subject } from '../../models/all.models';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) { }

 ngOnInit(): void {
     this.loadSubjects();
   }

   loadSubjects(): void {
     this.subjectService.getAll().subscribe((data: Subject[]) => {
       this.subjects = data;
     }, (error: any) => {
       console.error('Error fetching subjects', error);
     });
   }

  deleteSubject(id: number): void {
     if (confirm('Are you sure you want to delete this subject?')) {
       this.subjectService.delete(id).subscribe(() => {
         // remove deleted subject from local array
         this.subjects = this.subjects.filter(s => s.id !== id);
       }, (error: any) => {
         console.error('Error deleting subject', error);
       });
     }
   }
}
