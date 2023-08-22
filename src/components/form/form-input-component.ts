import { Tags } from '../../types/dom-types/enums';
import { InputData } from '../../types/dom-types/types';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from '../input-component';

enum FormInputCssClasses {
  Wrapper = 'form__input-wrapper',
  Label = 'form__label',
  Input = 'form__input',
  ValidationMessage = 'form__validation-message',
}

export type InputSubmitData = {
  label: string;
  value: string;
  required: boolean;
};

export default class FormInput extends DOMComponent<HTMLDivElement> {
  private static WRAPPER_PARAMS: ElementParameters = {
    tag: Tags.Div,
    classList: [FormInputCssClasses.Wrapper],
  };

  private static LABEL_PARAMS: ElementParameters = {
    tag: Tags.Label,
    classList: [FormInputCssClasses.Label],
  };

  private static INPUT_PARAMS: ElementParameters = {
    tag: Tags.Input,
    classList: [FormInputCssClasses.Input],
  };

  private static VALIDATION_MESSAGE_PARAMS: ElementParameters = {
    tag: Tags.Span,
    classList: [FormInputCssClasses.ValidationMessage],
  };

  private label: DOMComponent<HTMLLabelElement>;

  private input: InputDomComponent;

  private validationMessage: DOMComponent<HTMLSpanElement>;

  public constructor(inputData: InputData) {
    super(FormInput.WRAPPER_PARAMS);

    this.label = new DOMComponent<HTMLLabelElement>({
      ...FormInput.LABEL_PARAMS,
      textContent: inputData.label,
      parent: this,
    });

    const attributes: { [attribute: string]: string } = {
      type: inputData.type,
      placeholder: `Input ${inputData.label.toLowerCase()}...`,
    };
    if (inputData.isRequired) attributes.required = '';
    attributes.value = inputData.value || '';
    this.input = new InputDomComponent({
      ...FormInput.INPUT_PARAMS,
      parent: this.label,
      attributes,
    });

    this.validationMessage = new DOMComponent<HTMLSpanElement>(FormInput.VALIDATION_MESSAGE_PARAMS);
    this.append(this.validationMessage);
  }

  public get data(): InputSubmitData {
    return {
      label: this.label.textContent,
      value: this.input.value,
      required: this.input.required,
    };
  }
}
