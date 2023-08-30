import { FieldsetSubmitData } from '../components/form/form-component';
import { kebabToCamelCase } from './to-kebab-case';

export default function createFromFieldset<T>(data: FieldsetSubmitData): T {
  const result: { [key: string]: string } = {};
  data.inputs.forEach((input) => {
    result[kebabToCamelCase(input.name)] = input.value;
  });
  return result as T;
}
