import { StaticInjector } from '@angular/core/src/di/injector';

export class Hotel
{
    _id?: string;
    name: string;
    location: string;
    stars: string;
    reviews:Array<String>;
}