import { Events, Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import './styles.scss';

enum DropdownMenuCssClasses {
  Menu = 'dropdown-menu',
  OpenButton = 'dropdown-menu__open',
  ExpandWrapper = 'dropdown-menu__expand-wrapper',
  ExpandWrapperExpanded = 'dropdown-menu__expand-wrapper_expanded',
  ContentBody = 'dropdown-menu__content',
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

  private expandWrapper: DOMComponent<HTMLElement>;

  protected contentBody: DOMComponent<HTMLElement>;

  public constructor(
    title: string | DOMComponent<HTMLElement>,
    fullHeight: number,
    content: DOMComponent<HTMLElement>[],
    onHover = false
  ) {
    super({
      classList: [DropdownMenuCssClasses.Menu],
    });

    this.openButton = new DOMComponent<HTMLButtonElement>({
      ...DropdownMenu.OPEN_BUTTON_PARAMS,
      parent: this,
    });
    if (typeof title === 'string') this.openButton.textContent = title;
    else this.openButton.append(title);

    this.expandWrapper = new DOMComponent<HTMLElement>({
      classList: [DropdownMenuCssClasses.ExpandWrapper],
      parent: this,
    });
    this.expandWrapper.setCSSProperty(DropdownMenu.OPEN_TRANSITION_CSS_PROPERTY, DropdownMenu.OPEN_TRANSITION_PARAMS);
    this.expandWrapper.setCSSProperty(DropdownMenu.FULL_HEIGHT_CSS_PROPERTY, `${fullHeight}px`);

    this.contentBody = new DOMComponent<HTMLElement>({
      classList: [DropdownMenuCssClasses.ContentBody],
      parent: this.expandWrapper,
    });
    this.contentBody.append(...content);
    this.contentBody.setCSSProperty(DropdownMenu.FULL_HEIGHT_CSS_PROPERTY, `${fullHeight}px`);

    if (onHover) this.addHoverHandlers();
    else this.addClickHandlers();
  }

  public open(): void {
    this.expandWrapper.addClass(DropdownMenuCssClasses.ExpandWrapperExpanded);
  }

  public close(): void {
    this.expandWrapper.removeClass(DropdownMenuCssClasses.ExpandWrapperExpanded);
  }

  private addClickHandlers(): void {
    this.openButton.addEventListener(Events.Click, () => {
      if (this.expandWrapper.checkSelectorMatch(`.${DropdownMenuCssClasses.ExpandWrapperExpanded}`)) this.close();
      else this.open();
    });
  }

  private addHoverHandlers(): void {
    this.openButton.addEventListener(Events.MouseOver, () => {
      this.open();
    });

    const mouseLeaveHandler = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const target = DOMComponent.FromElement(mouseEvent.relatedTarget as HTMLElement);
      if (
        !target.checkSelectorMatch(`.${DropdownMenuCssClasses.ExpandWrapper} *`) &&
        !target.checkSelectorMatch(`.${DropdownMenuCssClasses.ExpandWrapper}`)
      )
        this.close();
    };

    this.openButton.addEventListener(Events.MouseOut, mouseLeaveHandler);
    this.expandWrapper.addEventListener(Events.MouseOut, mouseLeaveHandler);
  }
}
