import { isArray } from "sims-tools";
import { reactive } from "vue";

export type VIf = Record<'relationKey'|'value',any>;
// form type
export interface Schema {
  [index: string]: any,
  width?:string,
  rules?:rule[],
  property:FormSchema[] | FormSchemaGrop[],
  inline?:boolean,
  labelPosition?:'left'|'right'|'top',
  disabled?:boolean
}

// role type
export interface rule{

}
type FormSchemaGrop = Array<FormSchema>
export interface FormSchema {
  [index: string]: any;
  type: string;
  label: string;
  formKey: string;
  value: string;
  disabled?: boolean;
  options?: Options;
  optionData?: Record<'label'|'value',string>[];
  on?: On[];
  nativeOn?: On[];
}

export interface On {
  name: string;
  handle: Function;
}

export interface Options {
  multiple?: boolean;
  vIf?: VIf[];
  disabled?: VIf[];
}


export default function useForm(schema: Schema) {
  const formResult: Record<string, any> = {};
  schema.property.forEach((item: any) => {
    if(isArray(item)){
      item.map((child: Record<string, any>) => formResult[child.formKey] = child.value);
    }else{
      formResult[item.formKey] = item.value;
    }
  });
  const formData = reactive(formResult)
  return {
    formData
  }
}