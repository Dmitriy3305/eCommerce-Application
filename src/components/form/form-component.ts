import { Tags, InputTypes, Events, InsertPositions } from '../../types/dom-types/enums';
import { FormFieldsetData } from '../../types/dom-types/types';
import { InputData, InputDataType } from '../../types/input-datas';
import ValidationCallback from '../../types/validation-callback';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from '../inputs/input-component';
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
  validationCallbacks?: Map<InputDataType, ValidationCallback>;
  title?: string;
};

export type FormSubmitCallback = (data: (FieldsetSubmitData | InputSubmitData)[]) => void;

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

  private title?: DOMComponent<HTMLHeadingElement>;

  private inputs: (Fieldset | FormInput)[];

  private submitButton!: InputDomComponent;

  private onInit: boolean;

  public constructor({ inputs, validationCallbacks, title }: FormParams) {
    super(FormComponent.FORM_PARAMS);
    this.onInit = true;

    if (title) {
      this.title = new DOMComponent<HTMLHeadingElement>({
        ...FormComponent.TITLE_PARAMS,
        textContent: title,
        parent: this,
      });
    }

    this.inputs = inputs.map((group) => {
      if (Object.prototype.hasOwnProperty.call(group, 'label')) return new FormInput(group as InputData);
      const fieldset = new Fieldset(group as FormFieldsetData);
      return fieldset;
    });

    this.append(...this.inputs);

    if (title !== 'Profile') {
      this.submitButton = new InputDomComponent(FormComponent.SUBMIT_BUTTON_PARAMS);
      this.append(this.submitButton);
    }

    this.onInit = false;

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

  public override prepend(...elements: DOMComponent<HTMLElement>[]): void {
    if (this.title)
      elements.forEach((element) => {
        if (this.title) this.title.insert(InsertPositions.After, element);
        else super.prepend(element);
      });
  }

  public override append(...elements: DOMComponent<HTMLElement>[]): void {
    elements.forEach((element) => {
      if (!this.onInit) {
        if (this.submitButton) {
          this.submitButton.insert(InsertPositions.Before, element);
        } else {
          super.append(element);
        }
        if (element instanceof Fieldset || element instanceof FormInput) {
          this.inputs.push(element);
        }
      } else {
        super.append(element);
      }
    });
  }

  public removeFormElement(element: Fieldset | FormInput): void {
    element.remove();
    const index = this.inputs.indexOf(element);
    if (index === -1) throw Error('No such element in form');
    this.inputs.splice(index, 1);
  }

  public addSubmitCallback(callback: FormSubmitCallback): void {
    this.addEventListener(Events.Submit, (event: Event) => {
      event.preventDefault();
      const notValid = this.inputs.filter((group) => !group.isValid);
      if (notValid.length) {
        notValid.forEach((input) => (input instanceof Fieldset ? input.signalNotValidFields() : input.emitInput()));
        window.scrollTo({
          left: 0,
          top: notValid[0].pageY - 150, // 150 = header height
          behavior: 'smooth',
        });
      } else callback(this.data);
    });
  }
}
