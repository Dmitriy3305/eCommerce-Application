import DOMComponent from '../../components/base-component';
import FormComponent from '../../components/form/form-component';
import { AppInfo, AuthorizationParameters, FormParameters } from '../../types/app-parameters';
import { Tags } from '../../types/dom-types/enums';
import { FormFieldsetData } from '../../types/dom-types/types';
import { InputData, InputDataType, InputValues } from '../../types/input-datas';
import { GrouppedCategories } from '../api/products';
import AppRouter from '../router/router';
import AppView from './view';

export default abstract class FormView extends AppView {
  protected form: FormComponent;

  protected abstract get formTitle(): string;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    formParams: FormParameters
  ) {
    super(router, appInfo, categories, authParams);
    this.form = this.createForm(formParams.inputValues);
    FormView.MAIN?.append(this.form);

    if (formParams.countries) this.form.addOptions(InputDataType.Country, formParams.countries);
    this.form.addValidation(formParams.validationCallbacks);
    this.form.addSubmitCallback(formParams.submitCallback);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    return new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
  }

  protected createForm(inputValues?: InputValues): FormComponent {
    const inputs = this.createInputs(inputValues);
    const form = new FormComponent({
      inputs,
      title: this.formTitle,
    });
    form.setAttribute('novalidate', '');
    return form;
  }

  abstract createInputs(inputValues?: InputValues): (InputData | FormFieldsetData)[];
}
