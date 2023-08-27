import { Events, InputTypes, Tags } from '../../types/dom-types/enums';
import { InputData, InputDataType } from '../../types/input-datas';
import ValidationCallback from '../../types/validation-callback';
import { Countries } from '../../utils/validators/postalCode-validator';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from '../input-component';
import SelectDomComponent from '../select-components';

export enum FormInputCssClasses {
  Wrapper = 'form__input-wrapper',
  Label = 'form__label',
  Input = 'form__input',
  InputNotValid = 'form__input_invalid',
  ValidationMessage = 'form__validation-message',
}

export type InputSubmitData = {
  dataType: InputDataType;
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

  protected input: InputDomComponent | SelectDomComponent;

  protected validationMessage: DOMComponent<HTMLSpanElement>;

  private dataType: InputDataType;

  private resourceLabel?: string;

  public constructor(inputData: InputData) {
    super(FormInput.WRAPPER_PARAMS);

    this.label = new DOMComponent<HTMLLabelElement>({
      ...FormInput.LABEL_PARAMS,
      textContent: inputData.label,
      parent: this,
    });

    this.dataType = inputData.dataType;

    let type: InputTypes = InputTypes.Text;

    switch (inputData.dataType) {
      case InputDataType.BirthDate:
        type = InputTypes.Date;
        break;
      case InputDataType.Password:
        type = InputTypes.Password;
        break;
      case InputDataType.Country:
        type = InputTypes.Select;
        break;
      case InputDataType.City:
      case InputDataType.Email:
      case InputDataType.Name:
      case InputDataType.Street:
      case InputDataType.PostalCode:
      default:
        type = InputTypes.Text;
        break;
    }

    if (inputData.dataType === InputDataType.Country) {
      this.input = new SelectDomComponent(
        {
          classList: [FormInputCssClasses.Input],
          parent: this,
        },
        Object.values(Countries)
      );
    } else {
      const attributes: { [attribute: string]: string } = {
        placeholder: `Input ${inputData.label.toLowerCase()}...`,
        type,
      };
      if (inputData.isRequired) attributes.required = '';
      attributes.value = inputData.value || '';
      this.input = new InputDomComponent({
        ...FormInput.INPUT_PARAMS,
        parent: this.label,
        attributes,
      });
    }

    this.validationMessage = new DOMComponent<HTMLSpanElement>(FormInput.VALIDATION_MESSAGE_PARAMS);
    this.append(this.validationMessage);

    this.resourceLabel = inputData.resourceLabel;
  }

  public get data(): InputSubmitData {
    return {
      dataType: this.dataType,
      value: this.input.value,
      required: this.input.required,
    };
  }

  public get type(): InputDataType {
    return this.dataType;
  }

  public get isSelect(): boolean {
    return this.input instanceof SelectDomComponent;
  }

  public get labelText(): string {
    return this.label.textContent;
  }

  public get resource(): string {
    return this.resourceLabel || '';
  }

  public addValidation(callback: ValidationCallback, resource?: () => string): void {
    this.input.addEventListener(Events.Input, () => {
      const message = resource
        ? callback(this.input.value, this.input.required, resource())
        : callback(this.input.value, this.input.required);
      this.validationMessage.textContent = message;
      if (message) this.input.addClass(FormInputCssClasses.InputNotValid);
      else this.input.removeClass(FormInputCssClasses.InputNotValid);
    });
  }
}
