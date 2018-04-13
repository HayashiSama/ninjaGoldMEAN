import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ninja Gold';
  id: string;
  goldamount = 0;
  logs: [string];

  constructor(private _httpService: HttpService){}

  ngOnInit(){
  	this.newNinja();
  }

  newNinja(){
  	let obs = this._httpService.getNewNinja();
  	obs.subscribe(data => {
  		this.id = ((data as any).message as string)
  	})
  }

  goLocation(location){
  	console.log("going " + location)
  	let obs = this._httpService.goLocation(this.id, location);
  	obs.subscribe(data => {
  	console.log(data)
  	this.goldamount = (data as any).gold;
  	this.logs= (data as any).description;
  	})
  }


}
