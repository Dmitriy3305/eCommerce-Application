import { Events } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import './styles.scss';

enum DropdownMenuCssClasses {
  Menu = 'dropdown-menu',
  MenuShown = 'dropdown-menu_shown',
}

export default class DropdownMenu extends DOMComponent<HTMLDivElement> {
  private static MENU_PARAMS: ElementParameters = {
    classList: [DropdownMenuCssClasses.Menu],
  };

  private static OPACITY_TRANSITION_TIME = 500;

  private static APPEAR_TIME_CSS_PROPERTY = '--appear-time';

  public constructor() {
    super(DropdownMenu.MENU_PARAMS);
    this.setCSSProperty(DropdownMenu.APPEAR_TIME_CSS_PROPERTY, `${DropdownMenu.OPACITY_TRANSITION_TIME}ms`);

    this.addEventListener(Events.MouseOut, () => this.hide());
  }

  public show(coordinates: { x: number; y: number }): void {
    this.setCSSProperty('left', `${coordinates.x}px`);
    this.setCSSProperty('top', `${coordinates.y}px`);

    this.addClass(DropdownMenuCssClasses.MenuShown);
  }

  public hide(): void {
    this.removeClass(DropdownMenuCssClasses.MenuShown);
  }
}
