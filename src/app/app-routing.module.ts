import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// login & dashboadrd
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Students
import { StudentListComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/students/student-details.component';

// Teachers
import { TeacherListComponent } from './components/teachers/teachers.component';
//import { TeacherFormComponent } from './components/teachers/teacher-form/teacher-form.component';

// Classes
import { ClassesComponent } from './components/classes/classes.component';
//import { ClassFormComponent } from './components/classes/class-form/class-form.component';

// Subjects
import { SubjectComponent } from './components/subjects/subjects.component';
//import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';

// Attendance
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceCalendarComponent } from './components/attendance/attendance-calendar.component';
//import { AttendanceFormComponent } from './components/attendance/attendance-form/attendance-form.component';

// Fees
import { FeesComponent } from './components/fees/fees.component';
//import { FeeFormComponent } from './components/fees/fees.component';

// Reports
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default to login
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  // Students
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentListComponent },
  { path: 'student/details/:id', component: StudentDetailsComponent },

  // Teachers
  { path: 'teachers', component: TeacherListComponent },
  { path: 'teachers/new', component: TeacherListComponent },
  { path: 'teachers/:id', component: TeacherListComponent },

  // Classes
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/new', component: ClassesComponent },
  { path: 'classes/:id', component: ClassesComponent },

  // Subjects
  { path: 'subjects', component: SubjectComponent },
  { path: 'subjects/new', component: SubjectComponent },
  { path: 'subjects/:id', component: SubjectComponent },

  // Attendance
  { path: 'attendance', component: AttendanceCalendarComponent },
  { path: 'attendance/new', component: AttendanceComponent },
  { path: 'attendance/:id', component: AttendanceComponent },

  // Fees
  { path: 'fees', component: FeesComponent },
  { path: 'fees/new', component: FeesComponent },
  { path: 'fees/:id', component: FeesComponent },

  // Reports
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
