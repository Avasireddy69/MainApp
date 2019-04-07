import { Component, OnInit } from '@angular/core';
import {HotelService} from '../hotel.service';
import {Hotel} from '../hotel';
import {RouterModule,Router} from '@angular/router';
import { FlashMessagesService  } from 'angular2-flash-messages';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  providers:[HotelService]
})
export class HotelsComponent implements OnInit {

  hotels: Hotel[];
  hotel:Hotel;
  name:String;
  location:String;
  stars:String;
  reviews:Array<String>;

  
  constructor(private hotelService: HotelService,private flashMessage: FlashMessagesService,private router:Router ) { }



  hotelEdit(id:string)
  {
    const newHotel = {
      name:this.name,
      location:this.location,
      stars:this.stars,
      reviews:this.reviews
    };
    console.log("Updated values: ",newHotel);
    this.hotelService.hotelEdit(newHotel,id).subscribe((data)=>
    {
      this.flashMessage.show('Hotel edited successfully',{cssClass:'alert-success',timeout:3000});
      this.hotels.push(data);
      this.router.navigate(['/home']);
    });
    this.ngOnInit();
  }

  deleteHotel(id:string)
  {
    var hotels = this.hotels;
    this.hotelService.deleteHotel(id).subscribe((data)=>
    {
      if(data.n == 1)
      {
        for(var i=0;i<hotels.length;i++)
        {
          if(hotels[i]._id == id)
          {
            hotels.splice(i,1);
            
          }       
      }
    }
    
  });
  this.ngOnInit();
  }


  ngOnInit() {
    this.hotelService.getHotels().subscribe((hotels:Hotel[])=>this.hotels = hotels);
  }

} 
