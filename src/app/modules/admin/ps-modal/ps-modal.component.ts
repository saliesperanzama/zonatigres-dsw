import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../../../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ps-modal',
  templateUrl: './ps-modal.component.html',
  styleUrl: './ps-modal.component.css'
})
export class PsModalComponent {
  public new = true;
  public productId = '';
  public serviceId = '';
  public nombre = '';
  public precio = 0;
  public descripcion = '';
  public telefono = 0;
  public img = '';
  public vendedor = '';
  public tipo = '';
  public email = localStorage.getItem('userEmail');

  constructor(
    public dialogRef: MatDialogRef<PsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ){
    this.new = data.new;
    this.serviceId = data.serviceId;
    this.productId = data.productId;
    this.nombre = data.nombre;
    this.precio = data.precio;
    this.descripcion = data.descripcion;
    this.telefono = data.telefono;
    this.img = data.img;
    this.vendedor = data.vendedor;
  }

  public create(){
    //Verificar que todos los datos esten completos
    if(this.nombre == '' || this.precio == 0 || this.descripcion == '' || this.telefono == 0 || this.img == '' || this.vendedor == '' || this.tipo == ''){
      Swal.fire({
        title: 'Datos incompletos',
        icon: 'error',
      });
      return;
    }

    if(this.nombre==null || this.precio==null || this.descripcion==null || this.telefono==null || this.img==null || this.vendedor==null || this.email==null){
      Swal.fire({
        title: 'Datos incompletos',
        icon: 'error',
      });
      return;
    }

    //Verificar si el tipo elegido es PRODUCTO o SERVICIO
    if(this.tipo == 'PROD'){
      const data = {
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        telefono: this.telefono,
        img: this.img,
        vendedor: this.vendedor,
        email: this.email
      };

      this.apiProv.createProduct(data).then((res) => {
        if (res) {
          Swal.fire({
            title: 'Producto creado',
            icon: 'success',
          });
          this.onClose();
        }
      });
    }else if(this.tipo == 'SERV'){
      const data = {
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        telefono: this.telefono,
        img: this.img,
        vendedor: this.vendedor,
        email: this.email
      };

      this.apiProv.createService(data).then((res) => {
        if (res) {
          Swal.fire({
            title: 'Servicio creado',
            icon: 'success',
          });
          this.onClose();
        }
      });
    }
  }

  public update(){
    //Verificar que todos los datos esten completos
    if(this.nombre == '' || this.precio == 0 || this.descripcion == '' || this.telefono == 0 || this.img == '' || this.vendedor == '' || this.tipo == ''){
      Swal.fire({
        title: 'Datos incompletos',
        icon: 'error',
      });
      return;
    }

    if(this.nombre==null || this.precio==null || this.descripcion==null || this.telefono==null || this.img==null || this.vendedor==null || this.tipo==null){
      Swal.fire({
        title: 'Datos incompletos',
        icon: 'error',
      });
      return;
    }
    //Verificar si el tipo elegido es PRODUCTO o SERVICIO
    if(this.tipo == 'PROD'){
      const data = {
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        telefono: this.telefono,
        img: this.img,
        vendedor: this.vendedor
      };
      //En apiProv updateProduct se envia un mensaje y tambien en updateService
      this.apiProv.updateProduct(this.productId, data).then((res) => {
        if (res) {
          Swal.fire({
            title: 'Producto actualizado',
            icon: 'success',
          });
          this.onClose();
        }
      });
    }else if(this.tipo == 'SERV'){
      const data = {
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        telefono: this.telefono,
        img: this.img,
        vendedor: this.vendedor
      };

      this.apiProv.updateService(this.serviceId, data).then((res) => {
        if (res) {
          Swal.fire({
            title: 'Servicio actualizado',
            icon: 'success',
          });
          this.onClose();
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

