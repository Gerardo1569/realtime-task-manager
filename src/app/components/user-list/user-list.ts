import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {User} from '../../services/user';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-list',
  imports: [FormsModule, CommonModule],
  standalone:true,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList  implements OnInit {
  users: any[]=[];
  loading: boolean=false;
  error: string='';
  constructor (private userService:User){}

    async ngOnInit (){
      this.loading=true;
      try{
        this.users=await this.userService.getUsers();
        console.log('usuarios', this.users);
      }
      catch(error){
          console.error(error);
      }
      finally{
        this.loading=false;
      }

    }

    async deleteUser(id:string){
      try{
        console.log(id);
        this.userService.deleteUser(id);
        //mandar solicitud de eliminar por id
        //mostrar elemento eliminado en pantalla
      }
      catch(error){
        console.error(error);

      }

    }
    
    async updateUser(user:any){
      try{
        console.log(user._id);
        this.userService.updateUser(user._id,user);
        console.log("usuario acutuializado");
        //mandar solicitud de eliminar por id
        //mostrar elemento eliminado en pantalla
      }
      catch(error){
        console.error(error);

      }

    }
    


  }



