import { Address } from "./address.model"

export class ResponseMaps{
  place_id?:string;
  lat?:string;
  lon?:string;
  importance?:string;
  addresstype?:string;
  name?:string;
  display_name?:string;
  address?: Address;
}
