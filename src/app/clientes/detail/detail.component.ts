import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../client.service';
import { Cliente } from '../cliente';
import swal from 'sweetalert2';

@Component({
  selector: 'detail-client',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  client: Cliente;
  titulo: string = 'Detalle del cliente';
  private fotoSeleccionada: File;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id:number = +params.get('id')
      if(id){
        this.clientService.getClienteById(id).subscribe(cliente => {
          this.client = cliente;
        });
      }
    })
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.clientService.uploadFoto(this.fotoSeleccionada, this.client.id.toString())
    .subscribe( clients => {
      swal('Se subio correctamente la foto', "Exito", "success");
    });
  }

}
