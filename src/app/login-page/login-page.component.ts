import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  public email: string = '';
  public password: string = '';
  public users: any = [];
  public students: any = [];
  public role: string = '';
  //Obtener email del localstorage
  public userEmail = localStorage.getItem('userEmail');
          

  constructor(private apiProv: ApiProvider) {
    //Verificar si hay usuario autenticado
    if(apiProv.isAuthenticatedUser()){
      this.apiProv.getUsers().then((res) => {
        this.users = res.data;
        //Obtener rol del usuario autenticado
        for(const user of this.users){
         if(user.email == this.userEmail){
            this.role = user.role;
          }
        }
        //Redireccionar dependiendo del rol
        if(this.role == 'ADMIN'){
          window.location.href = 'home-admin';
        }else{
          window.location.href = 'products-est';
        }
      });
      // window.location.href = '/books';
    }
  }

  public login() {
    //Verificar que todos los campos esten rellenos
    if(this.email == '' || this.password == ''){
      Swal.fire({
        title: "Rellene todos los campos",
        icon: "error"
      });
      return;
    }
    const data = {
      email: this.email,
      password: this.password,
    };
    
    this.apiProv.login(data).then((res) => {
      if(res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userEmail', res.userEmail);
        console.log(res.token);
        this.apiProv.getUsers().then((res) => {
          this.users = res.data;
          for(const user of this.users){
            if(user.email == this.email){
              this.role = user.role;
            }
          }
          //Redireccionar dependiendo del rol cuando haga el login
          if(this.role == 'ADMIN'){
            window.location.href = 'home-admin';
          }else{
            window.location.href = 'products-est';
          }
        });
      }
      console.log(res);
    });
  }
}