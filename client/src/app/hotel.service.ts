import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Hotel} from './hotel';
import { map } from 'rxjs/operators';

@Injectable()
export class HotelService {
  
  constructor(private http: Http) { }
  
  getHotels()
  {
    return this.http.get('http://localhost:3000/api/hotels').pipe(map((res)=> {
      return res.json();
    }));
  };

  hotelEdit(newHotel, id)
  {
    return this.http.put('http://localhost:3000/api/hotels/'+id,newHotel).pipe
    (map((res)=>
    {
     return res.json();
    }));
    
  };
  addHotel(newHotel: { name: String; location: String; stars: String; reviews: String[] })
  {
    console.log('hotel service data: ',newHotel);
    return this.http.post('http://localhost:3000/api/hotels',newHotel).pipe(map((res)=>
    {
      return res.json();
    }));

  };
  deleteHotel(id: string)
  {
    return this.http.delete('http://localhost:3000/api/hotels/'+id).pipe(map((res) => {return res.json();}));
  }

}
