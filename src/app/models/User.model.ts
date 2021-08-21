export interface User {
    id: number;
    date: Date;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
}