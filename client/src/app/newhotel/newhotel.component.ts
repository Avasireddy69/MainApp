import { Component, OnInit } from '@angular/core';
import {HotelService} from '../hotel.service';
import {Hotel} from '../hotel';
import { FlashMessagesService  } from 'angular2-flash-messages';
import {ValidateService} from '../validate.service';

@Component({
  selector: 'app-newhotel',
  templateUrl: './newhotel.component.html',
  styleUrls: ['./newhotel.component.css'],
  providers:[HotelService]
})
export class NewhotelComponent implements OnInit {

  hotels: Hotel[];
  hotel:Hotel;
  name:String;
  location:String;
  stars:String;
  reviews:Array<String>;

  constructor(private hotelService: HotelService,private flashMessage: FlashMessagesService,private validate:ValidateService) { }

  addHotelAng()
  {
    const newHotel = {
      name:this.name,
      location:this.location,
      stars:this.stars,
      reviews:this.reviews
    };
    console.log(newHotel);

    if(!this.validate.validateHotelReg(newHotel))
    {
      this.flashMessage.show("Please fill all fields",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
   else{
     this.flashMessage.show("Data registered successfully!",{cssClass:'alert-success',timeout:3000});
    this.hotelService.addHotel(newHotel).subscribe((data)=>
      {
      this.hotels.push(data);
      
    });
  }
  }
 
  ngOnInit() {
  }

}
