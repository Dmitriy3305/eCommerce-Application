import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import logo from '../../../assets/images/header/logo-color.svg';
import { AppLink } from '../../router/router-types';
import AppRouter from '../../router/router';
import RoutedLink from '../../../components/routed-link';

enum LogoCssClasses {
  Name = 'logo__name',
  Icon = 'logo__icon',
}

export default class HeaderLogo extends RoutedLink {
  private static NAME_PARAMS: ElementParameters = {
    tag: Tags.Heading1,
    classList: [LogoCssClasses.Name],
  };

  private static ICON_PARAMS: ElementParameters = {
    tag: Tags.Image,
    classList: [LogoCssClasses.Icon],
    attributes: {
      src: logo,
      alt: 'App logo',
    },
  };

  private name: DOMComponent<HTMLHeadingElement>;

  private icon: DOMComponent<HTMLImageElement>;

  public constructor(router: AppRouter, logoText: string) {
    super({}, AppLink.Main, router);

    this.name = new DOMComponent<HTMLHeadingElement>({
      ...HeaderLogo.NAME_PARAMS,
      textContent: logoText.replace(' ', '\n'),
      parent: this,
    });
    this.icon = new DOMComponent<HTMLImageElement>({ ...HeaderLogo.ICON_PARAMS, parent: this });
  }
}
