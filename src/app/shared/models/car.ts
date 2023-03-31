import {FeatureCar} from "./featureCar"
import { Brand } from "./brand"
import { ImageCar } from "./imageCar"

export interface Car{
    id:number
    brand:Brand
    features:FeatureCar[]
    fuel:string
    gearBox:string
    images:ImageCar[]
    licensePlate:string
    mileage:number
    model:string
    pricePerDay:number
    rating:number
    seats:number
    type:string
}