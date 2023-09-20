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

export type InfoCards = {
  imgSrc: string;
  name: string;
  position: string;
  aboutMe: string;
  github: string;
};

export type AboutUsInfo = {
  name: string;
  role: string;
  aboutMe: string;
  github: string;
};
