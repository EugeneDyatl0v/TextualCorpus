import {Form} from "./form";

export interface Word{
  id: number;
  normal_form: String;
  number: number;
  forms: Form[]
}
