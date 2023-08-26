// eslint-disable-next-line import/no-cycle
import FormInput from './form-input-component';
import { InputData } from '../../types/input-datas';
import SelectDomComponent from '../select-components';
import { Events } from '../../types/dom-types/enums';
import ValidationCallback from '../../types/validation-callback';

enum FormInputCssClasses {
  Wrapper = 'form__input-wrapper',
  Label = 'form__label',
  Input = 'form__input',
  InputNotValid = 'form__input_invalid',
  ValidationMessage = 'form__validation-message',
}

export default class PostalCodeInput extends FormInput {
  private selectDomComponent: SelectDomComponent;

  constructor(inputData: InputData, selectDomComponent: SelectDomComponent) {
    super(inputData);
    this.selectDomComponent = selectDomComponent;
  }

  public addValidation(callback: ValidationCallback): void {
    this.input.addEventListener(Events.Input, () => {
      const message = callback(this.input.value, this.input.required, this.selectDomComponent.value);
      this.validationMessage.textContent = message;
      if (message) this.input.addClass(FormInputCssClasses.InputNotValid);
      else this.input.removeClass(FormInputCssClasses.InputNotValid);
    });
  }
}
