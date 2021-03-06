import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint:string = 'http://localhost:8080/v1';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlEndpoint}/listClient`);
  }

  createcliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.urlEndpoint}/createClient`, cliente, {headers: this.httpHeaders})
  }

  getClienteById(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/findClient/${id}`).pipe(
      catchError(e => {
        console.error(e.error.detalles[0]);
        swal('Ocurrio un error', e.error.message, 'error');
        this.router.navigate(['/clientes']);
        return throwError(e);
      })
    )
  }

  updateClient(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/updateClient`, cliente, {headers: this.httpHeaders})
  }

  deleteClient(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/deleteClient/${id}`).pipe(
      catchError(e => {
        console.error(e.error.detalles[0]);
        swal('Ocurrio un error', e.error.message, 'error');
        return throwError(e);
      })
    )
  }

  uploadFoto(file: File, idClient: string) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", idClient);
    return this.http.post(`${this.urlEndpoint}/upload/`, formData).pipe(
      catchError(e => {
        console.error(e.error.message);
        swal('Ocurrio un error', e.error.message, 'error');
        return throwError(e);
      })
    )
  }

}
