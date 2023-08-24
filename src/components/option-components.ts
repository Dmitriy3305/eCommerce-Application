import DOMComponent, { ElementParameters } from './base-component';
import { Tags } from '../types/dom-types/enums';

export default class OptionDomComponent extends DOMComponent<HTMLOptionElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>) {
    super({
      tag: Tags.Option,
      ...params,
    });
  }

  public get value(): string {
    return this.element.value;
  }

  public set value(text: string) {
    this.element.value = text;
  }
}
