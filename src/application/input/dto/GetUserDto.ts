export interface OutputListUserDto {
  users: {
    id: string;
    name: string;
    email: string;
    secret: string;
  }[];
}
export interface OutputFindOneUserDto {
  user: {
    id: string;
    name: string;
    email: string;
    secret: string;
  };
}
