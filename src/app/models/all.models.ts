// src/app/models/student.model.ts
export interface Student {
  id?: number;
  name: string;
  rollNo: string;
  schoolClass?: SchoolClass | null;
  age: number;
  gender: 'MALE' | 'FEMALE';
  guardianName?: string;
  phone?: string;
  image_path?: string;
}

// src/app/models/school-class.model.ts
export interface SchoolClass {
  id?: number;
  name: string;
  teacher?: Teacher[];
    subject?: Subject[];
    student?: Student[];
}

// src/app/models/teacher.model.ts
export interface Teacher {
  id?: number;
  fullName: string;
  phone?: string;
    subject?: Subject[]; // ✅ make sure this exists and is an array
}

// src/app/models/subject.model.ts
export interface Subject {
  id?: number;
  name: string;
  classes?: SchoolClass[];
   teacher?: Teacher[];
}

// src/app/models/attendance.model.ts
export interface Attendance {
  id?: number;
  date: string; // ISO yyyy-MM-dd
  student: Student; // or just { id: number }
  status: 'PRESENT' | 'ABSENT';
}

// src/app/models/fee.model.ts
export interface Fee {
  id?: number;
  student: Student;
  amount: number;
  paidDate?: string | null; // ISO date or null
  status: 'PAID' | 'DUE';
}
