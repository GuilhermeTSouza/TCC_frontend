import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { SupportComponent } from './support/support.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    CoursesComponent,
    ClassroomComponent,
    TeacherComponent,
    ClassComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)  // Importa as rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
