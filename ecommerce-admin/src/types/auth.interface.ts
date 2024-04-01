export interface IAuth{
    token: string;
    refreshToken: string;
}

export interface LoginDto {
    email: string;
    password: string;
}