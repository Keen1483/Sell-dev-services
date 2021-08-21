export interface Mail {
    id: number;
    date: Date;
    message: string;
    email?: string;
    firstName?: string;
    lastName?: string
}