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
  WrapperButtons = 'form__buttons-wrapper',
  EditButton = 'form__edit-button',
  SaveButton = 'form__save-button',
}

export type InputSubmitData = {
  name: string;
  value: string;
};

export type InputEditData = {
  name: string;
  value: string;
};

export type InputSaveData = {
  name: string;
  value: string;
};

export default class FormInput extends DOMComponent<HTMLDivElement> {
  private static WRAPPER_PARAMS: ElementParameters = {
    tag: Tags.Div,
    classList: [FormInputCssClasses.Wrapper],
  };

  private static WRAPPER_BUTTONS_PARAMS: ElementParameters = {
    tag: Tags.Div,
    classList: [FormInputCssClasses.WrapperButtons],
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

  private static EDIT_BUTTONS_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [FormInputCssClasses.EditButton],
  };

  private static SAVE_BUTTONS_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [FormInputCssClasses.SaveButton],
  };

  private label: DOMComponent<HTMLLabelElement>;

  protected input: InputDomComponent | SelectDomComponent;

  protected validationMessage: DOMComponent<HTMLSpanElement>;

  private dataType: InputDataType;

  private resourceName?: string;

  public wrapperButtons?: DOMComponent<HTMLDivElement>;

  public editButton?: DOMComponent<HTMLButtonElement>;

  public saveButton?: DOMComponent<HTMLButtonElement>;

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
    } else {
      const attributes: { [attribute: string]: string } = {
        placeholder: `Input ${inputData.label.toLowerCase()}...`,
        type,
      };
      if (inputData.isRequired) attributes.required = '';
      attributes.value = inputData.value || '';
      if (inputData.dataType === InputDataType.Password) this.input = new PasswordInput({ ...inputParams, attributes });
      else this.input = new InputDomComponent({ ...inputParams, attributes });
    }
    if (inputData.isEditable && this.dataType !== 'toggle') {
      this.wrapperButtons = new DOMComponent<HTMLDivElement>({
        ...FormInput.WRAPPER_BUTTONS_PARAMS,
        parent: this.label,
      });

      this.editButton = new DOMComponent<HTMLButtonElement>({
        ...FormInput.EDIT_BUTTONS_PARAMS,
        parent: this.wrapperButtons,
      });

      this.saveButton = new DOMComponent<HTMLButtonElement>({
        ...FormInput.SAVE_BUTTONS_PARAMS,
        parent: this.wrapperButtons,
      });
      this.input.setAttribute('disabled', '');
    }
    this.editButton?.addEventListener(Events.Click, (event) => {
      this.handleButtonClick(event, true);
    });
    if (this.saveButton) {
      this.saveButton.addEventListener(Events.Click, (event) => {
        this.handleButtonClick(event, false);
      });
    }
    if (inputData.name) this.input.setAttribute('name', inputData.name);
    this.validationMessage = new DOMComponent<HTMLSpanElement>(FormInput.VALIDATION_MESSAGE_PARAMS);
    this.append(this.validationMessage);

    this.resourceName = inputData.resourceName;
  }

  public get data(): InputSubmitData {
    return {
      name: this.name,
      value: this.input instanceof Checkbox ? this.input.checked.toString() : this.input.value,
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
    const attributes: { [attribute: string]: string } = { name: this.name };
    if (this.input.required) attributes.required = '';
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

  public get name(): string {
    return this.input.getAttribute('name') || '';
  }

  public get resource(): string {
    return this.resourceName || '';
  }

  public get isValid(): boolean {
    const validRequired = (this.input.required && this.input.value.length > 0) || !this.input.required;
    return !this.input.checkSelectorMatch(`.${FormInputCssClasses.InputNotValid}`) && validRequired;
  }

  public addValidation(callback: ValidationCallback, resource?: () => string): void {
    this.input.addEventListener(Events.Input, () => {
      let message = '';
      try {
        message = resource
          ? callback(this.input.value, this.input.required, resource())
          : callback(this.input.value, this.input.required);
      } catch (error: unknown) {
        message = (error as Error).message;
      } finally {
        this.validationMessage.textContent = message;
        if (message) this.input.addClass(FormInputCssClasses.InputNotValid);
        else this.input.removeClass(FormInputCssClasses.InputNotValid);
      }
    });
  }

  public addInputListener(listener: (value: string) => void): void {
    this.input.addEventListener(this.isSelect ? Events.Change : Events.Input, () => {
      listener(this.input instanceof Checkbox ? this.input.checked.toString() : this.input.value);
    });
  }

  public emitInput(): void {
    this.input.emitEvent(Events.Input, true);
  }

  public handleButtonClick(event: Event, enable: boolean): void {
    event.preventDefault();
    const currentParent = (event.target as Element).parentNode?.parentNode;
    const currentInput = currentParent?.childNodes[1] as HTMLInputElement;
    if (currentInput) {
      if (enable) {
        currentInput.removeAttribute('disabled');
      } else {
        currentInput.setAttribute('disabled', '');
      }
    }
  }
}
