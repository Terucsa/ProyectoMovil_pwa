export type User = {
    id: string;
    email: string;
    userName: string;
    role:string;
    age: number;
}

export type NewUser = {
    id: string;
    email: string;
    password: string;
    userName: string;
    age: number;
    role: string;
}