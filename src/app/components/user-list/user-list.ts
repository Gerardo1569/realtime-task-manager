import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {User} from '../../services/user';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../services/socket.service';
import { ChangeDetectorRef } from '@angular/core';
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
  constructor (private userService:User,
    private socketService: SocketService,
    private cdr:ChangeDetectorRef
  
  ){}

    async ngOnInit (){
      this.loading=true;
      //usando sockets
        this.socketService.listen('userCreated').subscribe((newUser:any)=>{
          console.log('nuevo usuario recibido', newUser);
          //this.users.push(newUser);
          this.users=[...this.users,newUser];
          this.cdr.detectChanges();
        });
        this.socketService.listen('userDeleted').subscribe((userId)=>{
  console.log('usuario eliminado recibido', userId);

  this.users = this.users.filter(u => u._id !== userId);

  this.cdr.detectChanges();
});

    this.socketService.listen('userUpdated').subscribe((updatedUser:any)=>{
  console.log('usuario actualizado recibido', updatedUser);

  this.users = this.users.map(u =>
    u._id === updatedUser._id ? updatedUser : u
  );

  this.cdr.detectChanges();
});


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
        await this.userService.deleteUser(id);
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
        await this.userService.updateUser(user._id,user);
        console.log("usuario acutuializado");
        //mandar solicitud de eliminar por id
        //mostrar elemento eliminado en pantalla
      }
      catch(error){
        console.error(error);

      }

    }
    


  }



