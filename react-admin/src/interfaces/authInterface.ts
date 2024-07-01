export interface FirstState{
    isAuthenticated: boolean;
    user:userData|null;
    token:string;
}
export interface userData{
    id:string
    username:string;
    email:string;
}