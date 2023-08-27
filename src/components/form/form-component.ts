import { Tags, InputTypes, Events, InsertPositions } from '../../types/dom-types/enums';
import { FormFieldsetData } from '../../types/dom-types/types';
import { InputData, InputDataType } from '../../types/input-datas';
import ValidationCallback from '../../types/validation-callback';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from '../input-component';
import Fieldset from './fieldset-component';
import FormInput, { InputSubmitData } from './form-input-component';

enum FormCssclassList {
  Form = 'form',
  Title = 'form__title',
  Submit = 'form__submit',
}

export type FieldsetSubmitData = {
  title: string;
  inputs: InputSubmitData[];
};

type FormParams = {
  inputs: (InputData | FormFieldsetData)[];
  onSubmit: (formData: (InputSubmitData | FieldsetSubmitData)[]) => void;
  validationCallbacks?: Map<InputDataType, ValidationCallback>;
  title?: string;
};

export default class FormComponent extends DOMComponent<HTMLFormElement> {
  private static FORM_PARAMS: ElementParameters = {
    tag: Tags.Form,
    classList: [FormCssclassList.Form],
  };

  private static TITLE_PARAMS: ElementParameters = {
    tag: Tags.Heading2,
    classList: [FormCssclassList.Title],
  };

  private static SUBMIT_BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Input,
    classList: [FormCssclassList.Submit],
    attributes: {
      type: InputTypes.Submit,
      value: 'Submit',
    },
  };

  private inputs: (Fieldset | FormInput)[];

  private submitButton: InputDomComponent;

  public constructor({ inputs, onSubmit, validationCallbacks, title }: FormParams) {
    super(FormComponent.FORM_PARAMS);

    if (title) this.append(new DOMComponent<HTMLHeadingElement>({ ...FormComponent.TITLE_PARAMS, textContent: title }));

    this.submitButton = new InputDomComponent(FormComponent.SUBMIT_BUTTON_PARAMS);
    this.append(this.submitButton);

    this.inputs = inputs.map((group) => {
      if (Object.prototype.hasOwnProperty.call(group, 'label')) return new FormInput(group as InputData);
      const fieldset = new Fieldset(group as FormFieldsetData);
      return fieldset;
    });
    this.append(...this.inputs);

    this.addEventListener(Events.Submit, (event: Event) => {
      event.preventDefault();
      onSubmit(this.data);
    });

    if (validationCallbacks) this.addValidation(validationCallbacks);
  }

  public get data(): (InputSubmitData | FieldsetSubmitData)[] {
    return this.inputs.map((group) => {
      return group instanceof Fieldset
        ? {
            title: group.title,
            inputs: group.data,
          }
        : group.data;
    });
  }

  public addValidation(callbacks: Map<InputDataType, ValidationCallback>): void {
    this.inputs.forEach((group) => {
      if (group instanceof Fieldset) group.addValidation(callbacks);
      else {
        const callback = callbacks.get(group.type);
        if (callback) group.addValidation(callback);
      }
    });
  }

  public addOptions(dataType: InputDataType, options: string[]): void {
    this.inputs.forEach((group) => {
      if (group instanceof Fieldset) group.addOptions(dataType, options);
      else if (group.type === dataType) {
        const input = group;
        input.options = options;
      }
    });
  }

  public override append(...elements: (HTMLElement | DOMComponent<HTMLElement>)[]): void {
    elements.forEach((element) => {
      if (element instanceof FormInput || element instanceof Fieldset) {
        this.submitButton.insert(InsertPositions.Before, element);
        this.inputs.push(element);
      } else super.append(element);
    });
  }
}
