import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  	//this.getTasks()
  }

  getNewNinja(){
  	return this._http.get('/newninja');
  }
  goLocation(id, location){
  	return this._http.get('/location/' + id + "/" + location);
  }



}
