//Service for grabbing student information.
//In a real world application we'd probably
//be pulling from a database.
//We are going to continue to use our mock data.

import { Injectable } from '@angular/core';
import { Student } from './student';
import { STUDENTS } from './mock-students';

import { Observable, Subscriber, of} from 'rxjs';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //getStudents(): Observable<Student[]> {
  //  return of(STUDENTS);
  //}
  private studentIndex: number = 0;
  private completeFlag: boolean = false;

  //You inject an Injectable for use (like Spring @Autowired)
  //by adding an Injectable to the constructor of what you
  //want to inject into.

  //We do not need to set this.messageService = messageService
  //inside the constructor, because the autoinjection
  //does that automatically via "MAGIC".
  constructor(private messageService: MessageService) { }
  

  updateStudent(subscriber: Subscriber<Student[]>) {
    if(this.studentIndex < STUDENTS.length) {
      subscriber.next(STUDENTS.slice(0, ++this.studentIndex));
      setTimeout(this.updateStudent.bind(this, subscriber), 5-  );
    } else {
      if(!this.completeFlag) {
        this.completeFlag=true;
        subscriber.complete();
      }
    }
  }

  getStudents(): Observable<Student[]> {
    this.studentIndex = 0;
    return new Observable(subscriber => {
      this.messageService.add('StudentService: fetching students');
      this.updateStudent(subscriber);
    });
  }

  
}
