import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service'; // correct path
import { SchoolClass, Teacher, Subject, Student} from '../models/all.models';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {SubjectService} from "../subjects/subjects.service";
import {TeacherService} from "../teachers/teachers.service";
import {StudentService} from "../students/students.service";       // correct path

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class ClassesComponent implements OnInit {

  classes: SchoolClass[] = [];
  isModalOpen = false;
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classService.getAll().subscribe((data: SchoolClass[]) => {
      this.classes = data;
    }, (error: any) => {
      console.error('Error fetching classes', error);
    });
  }
  modalType: 'teachers' | 'subjects' | 'students' | null = null;
  selectedClassId: number | null = null;

  // Data to display in modal
  modalData: any[] = [];

  openModal(type: 'teachers' | 'subjects' | 'students', classId: number) {
    this.modalType = type;
    this.selectedClassId = classId;
    this.modalData = []; // Reset previous data
    this.isModalOpen = true;
    switch (type) {
      case 'teachers':
        this.teacherService.getTeachersByClass(classId).subscribe(data => {
          this.modalData = data
        }
        );
        break;
      case 'subjects':
        this.subjectService.getSubjectsByClass(classId).subscribe(data => this.modalData = data);
        break;
      case 'students':
        this.studentService.getStudentsByClass(classId).subscribe(data => this.modalData = data);
        break;
    }
  }

  closeModal() {
    this.modalType = null;
    this.selectedClassId = null;
    this.modalData = [];
    this.isModalOpen = false;
  }
}
