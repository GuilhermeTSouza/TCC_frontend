import { Routes } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { SupportComponent } from './support/support.component';

export const routes: Routes = [
  { path: '', redirectTo: '/introduction', pathMatch: 'full' },
  { path: 'introduction', component: IntroductionComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'class', component: ClassComponent },
  { path: 'support', component: SupportComponent },
];
