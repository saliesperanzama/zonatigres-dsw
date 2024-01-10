import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public users: any = [];
  public role: string = '';
  //Obtener email del localstorage
  public userEmail = localStorage.getItem('userEmail');
  constructor(private apiProv: ApiProvider) {
    //Verificar que el usuario este autenticado
    if(apiProv.isAuthenticatedUser()){
      this.apiProv.getUsers().then((res) => {
        this.users = res.data;
        //Obtener el rol del usuario que se encuentra logueado
        for(const user of this.users){
         if(user.email == this.userEmail){
            this.role = user.role;
          }
        }
        //Redireccionar segun el rol
        if(this.role == 'ADMIN'){
          window.location.href = 'home-admin';
        }else{
          window.location.href = 'products-est';
        }
      });
    }
  }
}