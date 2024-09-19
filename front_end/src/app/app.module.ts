// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Certifique-se de que isso está aqui
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { InstructorComponent } from './instructor/instructor.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { routes } from './app.routes';
import { MainLayoutComponent } from './layouts/main/main.component';
import { AuthLayoutComponent } from './layouts/auth/auth.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
    SignUpComponent,
    TeacherComponent,
    ClassComponent,
    ClassroomComponent,
    CoursesComponent,
    InstructorComponent,
    IntroductionComponent,
    ProfileComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
