import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Cliente } from '../cliente';
import swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo:string = "Crear cliente";
  public erroresCadena: string;

  constructor(private clienteService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if(id){
          this.clienteService.getClienteById(id).subscribe((cliente) => this.cliente = cliente)
        }
      }
    )
  }

  public create(): void {
    this.clienteService.createcliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success')
      },
      err => {
        this.erroresCadena = err.error.detalles[0] as string
        console.error('Codigo del sattus: '+err.status);
        console.error('Errores: '+this.erroresCadena);
      }
    )

  }

  public update(): void {
    this.clienteService.updateClient(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito!`)
      },
      err => {
        this.erroresCadena = err.error.detalles[0] as string
        console.error('Codigo del sattus: '+err.status);
        console.error('Errores: '+this.erroresCadena);
      }
    )
  }

}
