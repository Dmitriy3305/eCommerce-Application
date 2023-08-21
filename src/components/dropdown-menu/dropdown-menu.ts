import { Events, Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import './styles.scss';

enum DropdownMenuCssClasses {
  Menu = 'dropdown-menu',
  OpenButton = 'dropdown-menu__open',
  ContentBody = 'dropdown-menu__content',
  ContentBodyExpanded = 'dropdown-menu__content_expanded',
}

export default class DropdownMenu extends DOMComponent<HTMLDivElement> {
  private static OPEN_BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [DropdownMenuCssClasses.OpenButton],
  };

  private static OPEN_TRANSITION_PARAMS = '500ms ease-in-out';

  private static OPEN_TRANSITION_CSS_PROPERTY = '--open-transition';

  private static FULL_HEIGHT_CSS_PROPERTY = '--full-height';

  protected openButton: DOMComponent<HTMLButtonElement>;

  protected contentBody: DOMComponent<HTMLElement>;

  public constructor(title: string, fullHeight: number, content: DOMComponent<HTMLElement>[]) {
    super({
      classList: [DropdownMenuCssClasses.Menu],
    });

    this.openButton = new DOMComponent<HTMLButtonElement>({
      ...DropdownMenu.OPEN_BUTTON_PARAMS,
      textContent: title,
      parent: this,
    });
    this.openButton.addEventListener(Events.Click, () => {
      if (this.contentBody.checkSelectorMatch(`.${DropdownMenuCssClasses.ContentBodyExpanded}`)) this.close();
      else this.open();
    });

    this.contentBody = new DOMComponent<HTMLElement>({
      classList: [DropdownMenuCssClasses.ContentBody],
      parent: this,
    });
    this.contentBody.setCSSProperty(DropdownMenu.OPEN_TRANSITION_CSS_PROPERTY, DropdownMenu.OPEN_TRANSITION_PARAMS);
    this.contentBody.append(...content);
    this.contentBody.setCSSProperty(DropdownMenu.FULL_HEIGHT_CSS_PROPERTY, `${fullHeight}px`);
  }

  public open(): void {
    this.contentBody.addClass(DropdownMenuCssClasses.ContentBodyExpanded);
  }

  public close(): void {
    this.contentBody.removeClass(DropdownMenuCssClasses.ContentBodyExpanded);
  }
}
