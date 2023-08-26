import DOMComponent, { ElementParameters } from './base-component';
import { Tags } from '../types/dom-types/enums';
import OptionDomComponent from './option-components';

export default class SelectDomComponent extends DOMComponent<HTMLSelectElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>, options: string[]) {
    super({
      tag: Tags.Select,
      ...params,
    });
    const optionComponents = options.map((option) => {
      const optionComponent = new OptionDomComponent({
        textContent: option,
      });
      return optionComponent;
    });
    this.append(...optionComponents);
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
