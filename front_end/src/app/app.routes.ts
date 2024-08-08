import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { InstructorComponent } from './instructor/instructor.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { SupportComponent } from './support/support.component';
import { MainLayoutComponent } from './layouts/main/main.component';
import { CoursesComponent } from './courses/courses.component';
import { AuthLayoutComponent } from './layouts/auth/auth.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: IntroductionComponent },
      { path: 'introduction', component: IntroductionComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'class', component: ClassComponent },
      { path: 'classroom', component: ClassroomComponent },
      { path: 'course', component: CoursesComponent },
      { path: 'instructor', component: InstructorComponent },
      { path: 'support', component: SupportComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
];
