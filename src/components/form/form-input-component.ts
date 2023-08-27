import { Events, InputTypes, Tags } from '../../types/dom-types/enums';
import { InputData, InputDataType } from '../../types/input-datas';
import ValidationCallback from '../../types/validation-callback';
import { Countries } from '../../utils/validators/postalCode-validator';
import DOMComponent, { ElementParameters } from '../base-component';
import Checkbox from '../inputs/checkbox';
import InputDomComponent from '../inputs/input-component';
import PasswordInput from '../inputs/password';
import SelectDomComponent from '../inputs/select-component';

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
      case InputDataType.Toggle:
        type = InputTypes.Checkbox;
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

    const inputParams = { ...FormInput.INPUT_PARAMS, parent: this.label };
    if (inputData.dataType === InputDataType.Country) {
      const attributes = inputData.isRequired ? { required: '' } : undefined;
      this.input = new SelectDomComponent(
        {
          ...inputParams,
          attributes,
        },
        inputData.options || Object.values(Countries)
      );
    } else if (inputData.dataType === InputDataType.Toggle) {
      this.input = new Checkbox(this);
    } else if (inputData.dataType === InputDataType.Password) {
      this.input = new PasswordInput(inputParams);
    } else {
      const attributes: { [attribute: string]: string } = {
        placeholder: `Input ${inputData.label.toLowerCase()}...`,
        type,
      };
      if (inputData.isRequired) attributes.required = '';
      attributes.value = inputData.value || '';
      this.input = new InputDomComponent({
        ...inputParams,
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

  public set options(value: string[]) {
    this.input.remove();
    const attributes = this.input.required ? { required: '' } : undefined;
    this.input = new SelectDomComponent(
      {
        classList: [FormInputCssClasses.Input],
        parent: this.label,
        attributes,
      },
      value
    );
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

  public addInputListener(listener: (value: string) => void): void {
    this.input.addEventListener(Events.Input, () => {
      listener(this.input instanceof Checkbox ? this.input.checked.toString() : this.input.value);
    });
  }
}
