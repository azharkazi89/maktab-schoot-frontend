import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// login & dashboadrd
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

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
//import { FeeFormComponent } from './components/fees/fee-form/fee-form.component';

// Reports
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    // Students
    StudentListComponent,
    StudentDetailsComponent,

    // Teachers
    TeacherListComponent,
   // TeacherFormComponent,

    // Classes
    ClassesComponent,
  //  ClassFormComponent,

    // Subjects
    SubjectComponent,
 //   SubjectFormComponent,

    // Attendance
    AttendanceComponent,
    AttendanceCalendarComponent,
 //   AttendanceFormComponent,

    // Fees
    FeesComponent,
  //  FeeFormComponent,

    // Reports
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
