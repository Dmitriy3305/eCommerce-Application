import { Tags } from '../../types/dom-types/enums';
import { FormFieldsetData } from '../../types/dom-types/types';
import { InputDataType } from '../../types/input-datas';
import ValidationCallback from '../../types/validation-callback';
import DOMComponent, { ElementParameters } from '../base-component';
import FormInput, { InputSubmitData } from './form-input-component';

enum FieldsetCssClasses {
  Title = 'fieldset__title',
}

export default class Fieldset extends DOMComponent<HTMLFieldSetElement> {
  private static TITLE_PARAMS: ElementParameters = {
    tag: Tags.Legend,
    classList: [FieldsetCssClasses.Title],
  };

  private legend?: DOMComponent<HTMLLegendElement>;

  private inputs: FormInput[];

  public constructor(data: FormFieldsetData) {
    super({ tag: Tags.FieldSet });
    const { inputs, title } = data;

    if (title) {
      this.legend = new DOMComponent<HTMLLegendElement>({
        ...Fieldset.TITLE_PARAMS,
        textContent: title,
      });
      this.append(this.legend);
    }

    this.inputs = inputs.map((input) => new FormInput(input));
    this.append(...this.inputs);
  }

  public get title(): string {
    return this.legend ? this.legend.textContent : '';
  }

  public get data(): InputSubmitData[] {
    return this.inputs.map((input) => input.data);
  }

  public addValidation(callbacks: Map<InputDataType, ValidationCallback>): void {
    this.inputs.forEach((input) => {
      const callback = callbacks.get(input.type);
      if (callback) input.addValidation(callback);
    });
  }
}
