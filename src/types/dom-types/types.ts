import { InputData } from '../input-datas';

export type AnimationParams = {
  name: string;
  duration: number;
  timingFunction?: string;
};

export type FormFieldsetData = {
  inputs: InputData[];
  title?: string;
};
