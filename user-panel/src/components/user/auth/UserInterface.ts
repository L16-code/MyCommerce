export interface UserRegister{
    username: string;
    password: string;
    email: string;
    dob: string;
    gender:string;
}
export interface UserLogin{
    email:string;
    password:string;
}