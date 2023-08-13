import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppView from './view';

export default class MainView extends AppView {
  public get pageName(): string {
    return 'Main';
  }

  public constructor(appName: string) {
    super(appName);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    return new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
  }
}
