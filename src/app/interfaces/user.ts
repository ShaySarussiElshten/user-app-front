export interface User {
    address: string
    city: string 
    email: string 
    fullName: string 
    homeLocation:homeLocation
    _id:number
  }

export interface CreateUserPayload {
    address: string;
    city: string;
    email: string;
    fullName: string;
}

export interface UpdateUserPayload {
  address: string;
  city: string;
  email: string;
  fullName: string;
}

export interface AllUserInfo {
  data: User[] 
  total: number
}


  interface homeLocation{
    lat: number
    lng: number
  }