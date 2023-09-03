import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMaps } from '../model/response-maps.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  URI_ENTREGA = environment.API_NOMINATION;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  buscaEndereco(latitude: string, longitude: string) : Observable<ResponseMaps>{
    return this.http.get<any>(this.URI_ENTREGA+`&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, this.httpOptions)
  }

}
