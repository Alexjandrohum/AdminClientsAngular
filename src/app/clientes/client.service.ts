import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClientes(): Observable<Cliente[]>{
    return of(CLIENTES);
  }
}
