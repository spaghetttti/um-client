export interface UserDTO {
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  ADMINISTRATOR = "ADMINISTRATOR",
  MANAGER = "MANAGER",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT"
}