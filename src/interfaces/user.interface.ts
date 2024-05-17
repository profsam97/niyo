export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    tokens: string[];
  }
  export interface IAuthUser {
    username: string;
    email: string;
    token: string;
  }
  
  export interface IResponseUser {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface IAuthResponseUser {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }