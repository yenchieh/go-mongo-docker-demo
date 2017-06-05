import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import {environment} from "../environments/environment";
import 'rxjs/add/operator/toPromise';
import { Card } from "app/model/card";

@Injectable()
export class ServerService {

  SAVE_API = "/api/save";
  GET_API = "/api/get";

  constructor(private http: Http) { }

  get() {
    return this.http.get(`${environment.BaseURL + this.GET_API}`)
    .toPromise()
    .then(response => response.json() as Card[])
  }

  save(name: string, favorite: string) {
    const data = {
      name: name,
      favorite: favorite
    }

    return this.http.post(`${environment.BaseURL + this.SAVE_API}`, JSON.stringify(data))
    .toPromise()
    .then(response => response.json() as Card[])
    
  }

}
