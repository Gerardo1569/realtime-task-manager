import { Component, EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../services/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Output() onSubmit= new EventEmitter<any>();
  UserForm: FormGroup;
  constructor (private fb:FormBuilder,
    private userService: User
    
    
  ){
    this.UserForm=this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3)] ],
      correo: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(4)]]

    });
  }
  async submitCita(){
    if (this.UserForm.valid){
      try {
        const formValue=this.UserForm.value;
        const response=await this.userService.createUser({
          name: formValue.nombre,
          email: formValue.correo,
          password: formValue.password
        });

        console.log('usuario creado', response);
        this.onSubmit.emit(response);
        //resetear formulario
        this.UserForm.reset();


      }catch(error){
        console.error('error al crear usuario:', error)
      }
      
    }
  }
  campoInvalido(campo: string):boolean {

    const control=this.UserForm.get(campo);
    return !!control && control.invalid && (control.touched||control.dirty);
  }



}
