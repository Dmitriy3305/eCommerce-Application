import DOMComponent, { ElementParameters } from '../../../components/base-component';
import RoutedLink from '../../../components/routed-link';
import { Tags } from '../../../types/dom-types/enums';
import { AppLink } from '../../router/router-types';
import AppView from '../view';
import layout from './not-found.html';

enum NotFoundCssClasses {
  Main = 'not-found',
  HomeButton = 'not-found__go-back',
}

export default class NotFoundView extends AppView {
  private static MAIN_PARAMS: ElementParameters = {
    tag: Tags.Main,
    classList: [NotFoundCssClasses.Main],
  };

  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>(NotFoundView.MAIN_PARAMS);
    const contentWrapper = DOMComponent.FromHTML(layout);
    const returnToHomeButton = new RoutedLink(
      {
        classList: [NotFoundCssClasses.HomeButton],
        textContent: 'Return to home',
      },
      AppLink.Main,
      this.router
    );
    contentWrapper.append(returnToHomeButton);
    main.append(contentWrapper);
    return main;
  }
}
