import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import FormComponent from '../../../components/form/form-component';
import registrationInputs from './registration-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';

export default class RegistrationView extends AppView {
  private static FORM_TITLE = 'Registration';

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const inputs = registrationInputs as FormFieldsetData[];
    if (inputs.length === 2)
      inputs.push({
        title: 'Billing Address',
        inputs: inputs[1].inputs,
      });
    const form = new FormComponent({
      inputs,
      onSubmit() {},
      title: RegistrationView.FORM_TITLE,
    });

    main.append(form);
    return main;
  }
}
