export interface IUser{
    token: string;
    type: string;
    id: number;
    username: string;
    roles: Set<String>;
}