import {Component, OnInit} from '@angular/core';
import {StudentService} from './students.service'; // correct path
import {Student} from '../models/all.models'; // correct path
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  photoFile: File | null = null;
  photoPreview: string | null = null;
  showCamera = false;
  private stream: MediaStream | null = null;

  constructor(
    private studentService: StudentService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe((data: Student[]) => {
      this.students = data;
    }, (error: any) => {
      console.error('Error fetching students', error);
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== id);
      }, (error: any) => {
        console.error('Error deleting student', error);
      });
    }
  }

  showModal = false;
  editingStudent: any = null;

  openEditModal(student: any) {
    this.editingStudent = {...student};
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingStudent = null;
  }

  updateStudent() {
    if (!this.editingStudent) return;

    const formData = new FormData();
    formData.append('student', new Blob([JSON.stringify(this.editingStudent)], {type: 'application/json'}));

    if (this.photoPreview) {
      formData.append('photo', this.photoPreview);
    }

    this.studentService.updateStudent(formData).subscribe({
      next: (updatedStudent) => {
        const index = this.students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
          this.students[index] = updatedStudent;
        }
        this.closeModal();
      },
      error: (err) => console.error('Update failed:', err)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = e => this.photoPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  openCamera() {
    this.showCamera = true;
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
      this.stream = stream;
      const videoElement = document.querySelector('video') as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    }).catch(err => {
      console.error('Camera access denied', err);
    });
  }

  capturePhoto(videoElement: HTMLVideoElement) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    this.photoPreview = canvas.toDataURL('image/png');
    this.closeCamera();
  }

  closeCamera() {
    this.showCamera = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
}

