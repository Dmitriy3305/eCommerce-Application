import { Tags, InputTypes } from '../types/dom-types/enums';
import DOMComponent, { ElementParameters } from './base-component';
import InputDomComponent from './input-component';

export default class Checkbox extends InputDomComponent {
  private static ELEMENT_PARAMS: ElementParameters = {
    tag: Tags.Input,
    attributes: {
      type: InputTypes.Checkbox,
    },
  };

  public constructor(parent: DOMComponent<HTMLElement>) {
    super({ ...Checkbox.ELEMENT_PARAMS, parent });
  }

  public toggle(): void {
    this.element.checked = !this.element.checked;
  }

  public get checked(): boolean {
    return this.element.checked;
  }
}
