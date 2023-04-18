import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

public clientes: Cliente[] = [];

  constructor(private clienteService: ClientService) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log('CLienteComponent: tap3')
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    ).subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(client: Cliente): void {
    swal({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el cliente ${client.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteClient(client.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== client)
            swal(
              'Cliente Eliminado!',
              'Cliente eliminado con exito.',
              'success'
            )
          }
        )
      }
    })
  }

}
