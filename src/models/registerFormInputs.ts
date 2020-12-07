export interface RegisterFormInputFirstStep {
  phone: string;
  email: string;
}

export interface RegisterFormInputSecondStep {
  username: string;
  password: string;
  rememberPassword: boolean;
}

export interface RegisterFormInputThirdStep {
  date: number;
  month: number;
  year: number;
}
