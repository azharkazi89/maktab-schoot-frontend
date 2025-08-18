import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teachers.service'; // correct path
import { Teacher } from '../../models/all.models';              // correct path

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getAll().subscribe((data: Teacher[]) => {
      this.teachers = data;
    }, (error: any) => {
      console.error('Error fetching teachers', error);
    });
  }

  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.delete(id).subscribe(() => {
        this.teachers = this.teachers.filter(t => t.id !== id);
      }, (error: any) => {
        console.error('Error deleting teacher', error);
      });
    }
  }
}
