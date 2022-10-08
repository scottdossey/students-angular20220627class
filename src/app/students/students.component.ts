import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {  
  students?: Student[]; 

  selectedStudent?: Student;
  
  //Adding an @Injectable to a constructor parameter
  //list automatically injects it and makes it
  //available as this.?????? 
  constructor(private studentService: StudentService,
              private messageService: MessageService) {
    //This line is not necessary, it automatically
    //happens:
        //this.studentService = studentService;
  }

  getStudents(): void {
    let observable = this.studentService.getStudents();
    observable.subscribe(students => this.students = students);    
  }
  
  ngOnInit(): void {
    this.getStudents();
  }

  onSelect(student: Student): void {
    this.selectedStudent = student; 
    this.messageService.add(`StudentComponent: Selected student id=${student.id}`);  
  }
}
