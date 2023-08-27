import DOMComponent, { ElementParameters } from './base-component';
import { Tags } from '../types/dom-types/enums';

export default class SelectDomComponent extends DOMComponent<HTMLSelectElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>, options: string[]) {
    super({
      tag: Tags.Select,
      ...params,
    });
    const optionComponents = options.map(
      (option) =>
        new DOMComponent<HTMLOptionElement>({
          tag: Tags.Option,
          textContent: option,
        })
    );
    this.append(...optionComponents);
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
