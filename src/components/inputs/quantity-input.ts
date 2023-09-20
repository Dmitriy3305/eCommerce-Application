import { Events, InputTypes, Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from './input-component';

enum QuantityInputCssClasses {
  Wrapper = 'quantity-input',
  Input = 'quantity-input__input',
  ChangeButton = 'quantity-input__change',
}

export type QuantityCallback = (value: number) => void;

export default class QuantityInput extends DOMComponent<HTMLDivElement> {
  private static readonly INPUT_PARAMS = {
    classList: [QuantityInputCssClasses.Input],
    attributes: { type: InputTypes.Text },
  };

  private static readonly CHANGE_BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [QuantityInputCssClasses.ChangeButton],
  };

  private minusButton: DOMComponent<HTMLButtonElement>;

  private numberInput: InputDomComponent;

  private plusButton: DOMComponent<HTMLButtonElement>;

  public constructor(valueCallback: QuantityCallback, startValue?: number) {
    super({ classList: [QuantityInputCssClasses.Wrapper] });

    const changeHandler = (valueChanger: (value: number) => number) => {
      const newValue = valueChanger(+this.numberInput.value);
      valueCallback(newValue);
      this.numberInput.value = newValue.toString();
    };

    this.numberInput = new InputDomComponent(QuantityInput.INPUT_PARAMS);
    this.numberInput.addEnterHanlder(changeHandler.bind(null, (value) => value));
    if (startValue) this.numberInput.value = startValue.toString();

    this.minusButton = new DOMComponent<HTMLButtonElement>({
      ...QuantityInput.CHANGE_BUTTON_PARAMS,
      textContent: '-',
    });
    this.minusButton.addEventListener(
      Events.Click,
      changeHandler.bind(null, (value) => value - 1)
    );

    this.plusButton = new DOMComponent<HTMLButtonElement>({
      ...QuantityInput.CHANGE_BUTTON_PARAMS,
      textContent: '+',
    });
    this.plusButton.addEventListener(
      Events.Click,
      changeHandler.bind(null, (value) => value + 1)
    );

    this.append(this.minusButton, this.numberInput, this.plusButton);
  }
}
