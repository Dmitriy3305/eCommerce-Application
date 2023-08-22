import DOMComponent, { ElementParameters } from './base-component';
import { Tags } from '../types/dom-types/enums';

export default class InputDomComponent extends DOMComponent<HTMLInputElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>) {
    super({
      tag: Tags.Input,
      ...params,
    });
  }

  public get value(): string {
    return this.element.value;
  }

  public set value(text: string) {
    this.element.value = text;
  }

  public get required(): boolean {
    return this.element.required;
  }

  public set required(value: boolean) {
    this.element.required = value;
  }
}
