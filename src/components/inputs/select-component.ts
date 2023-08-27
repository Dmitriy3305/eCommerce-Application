import DOMComponent, { ElementParameters } from '../base-component';
import { Tags } from '../../types/dom-types/enums';

export default class SelectDomComponent extends DOMComponent<HTMLSelectElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>, options: string[]) {
    super({
      tag: Tags.Select,
      ...params,
    });
    const required = params.attributes && params.attributes.required === '';
    const optionComponents = options.map((option, index) => {
      const optionElement = new DOMComponent<HTMLOptionElement>({
        tag: Tags.Option,
        textContent: option,
      });
      if (required && index === 0) optionElement.setAttribute('value', '');
      return optionElement;
    });
    this.append(...optionComponents);
    this.element.required = Boolean(required);
  }

  public get value(): string {
    return this.element.value;
  }

  public get required(): boolean {
    return this.element.required;
  }

  public set required(value: boolean) {
    this.element.required = value;
  }
}
