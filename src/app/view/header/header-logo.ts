import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import logo from '../../../assets/images/logo-color.svg';

enum LogoCssClasses {
  Name = 'logo__name',
  Icon = 'logo__icon',
}

export default class HeaderLogo extends DOMComponent<HTMLElement> {
  private static NAME_PARAMS: ElementParameters = {
    tag: Tags.Heading1,
    classList: [LogoCssClasses.Name],
  };

  private static ICON_PARAMS: ElementParameters = {
    tag: Tags.Image,
    classList: [LogoCssClasses.Name],
    attributes: {
      src: logo,
      alt: 'App logo',
    },
  };

  private name: DOMComponent<HTMLHeadingElement>;

  private icon: DOMComponent<HTMLImageElement>;

  public constructor(logoText: string) {
    super({});
    this.name = new DOMComponent<HTMLHeadingElement>({
      ...HeaderLogo.NAME_PARAMS,
      textContent: logoText,
      parent: this,
    });
    this.icon = new DOMComponent<HTMLImageElement>({ ...HeaderLogo.ICON_PARAMS, parent: this });
  }
}
