import DOMComponent, { ElementParameters } from './base-component';
import { Tags } from '../types/dom-types/enums';

export default class SelectDomComponent extends DOMComponent<HTMLSelectElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>) {
    super({
      tag: Tags.Select,
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
