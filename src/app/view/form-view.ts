import DOMComponent from '../../components/base-component';
import FormComponent from '../../components/form/form-component';
import { AppInfo, AuthorizationParameters, FormParameters } from '../../types/app-parameters';
import { Tags } from '../../types/dom-types/enums';
import { FormFieldsetData } from '../../types/dom-types/types';
import { InputData, InputDataType } from '../../types/input-datas';
import { GrouppedCategories } from '../api/products';
import AppRouter from '../router/router';
import AppView from './view';

export default abstract class FormView extends AppView {
  protected form?: FormComponent;

  protected abstract get formTitle(): string;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    formParams: FormParameters
  ) {
    super(router, appInfo, categories, authParams);
    if (formParams.countries) this.form?.addOptions(InputDataType.Country, formParams.countries);
    this.form?.addValidation(formParams.validationCallbacks);
    this.form?.addSubmitCallback(formParams.submitCallback);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    this.form = this.createForm();
    main.append(this.form);
    return main;
  }

  protected createForm(): FormComponent {
    const inputs = this.createInputs();
    const form = new FormComponent({
      inputs,
      title: this.formTitle,
    });
    return form;
  }

  abstract createInputs(): (InputData | FormFieldsetData)[];
}
