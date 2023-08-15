import DOMComponent, { ElementParameters } from './base-component';

enum DropdownMenuCssClasses {
  Menu = 'dropdown-menu',
}

export default class DropdownMenu extends DOMComponent<HTMLDivElement> {
  private static MENU_PARAMS: ElementParameters = {
    classList: [DropdownMenuCssClasses.Menu],
  };

  public constructor() {
    super(DropdownMenu.MENU_PARAMS);
  }

  public show(): void {}

  public hide(): void {}
}
