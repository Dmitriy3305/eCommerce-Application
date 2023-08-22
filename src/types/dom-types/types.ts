import { InputTypes } from './enums';

export type AnimationParams = {
  name: string;
  duration: number;
  timingFunction?: string;
};

export type FormFieldsetData = {
  inputs: InputData[];
  title?: string;
};

export type InputData = {
  label: string;
  type: InputTypes;
  value?: string;
  isRequired?: boolean;
};
