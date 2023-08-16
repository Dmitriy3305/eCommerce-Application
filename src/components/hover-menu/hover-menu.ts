import { Events } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import './styles.scss';

enum HoverMenuCssClasses {
  Menu = 'hover-menu',
  MenuShown = 'hover-menu_shown',
}

export default class HoverMenu extends DOMComponent<HTMLDivElement> {
  private static MENU_PARAMS: ElementParameters = {
    classList: [HoverMenuCssClasses.Menu],
  };

  private static OPACITY_TRANSITION_TIME = 500;

  private static APPEAR_TIME_CSS_PROPERTY = '--appear-time';

  public constructor() {
    super(HoverMenu.MENU_PARAMS);
    this.setCSSProperty(HoverMenu.APPEAR_TIME_CSS_PROPERTY, `${HoverMenu.OPACITY_TRANSITION_TIME}ms`);

    this.addEventListener(Events.MouseOut, () => this.hide());
  }

  public show(coordinates: { x: number; y: number }): void {
    this.setCSSProperty('left', `${coordinates.x}px`);
    this.setCSSProperty('top', `${coordinates.y}px`);

    this.addClass(HoverMenuCssClasses.MenuShown);
  }

  public hide(): void {
    this.removeClass(HoverMenuCssClasses.MenuShown);
  }

  public generateHoverButton(buttonParams: ElementParameters): DOMComponent<HTMLButtonElement> {
    const button = new DOMComponent<HTMLButtonElement>(buttonParams);

    button.addEventListener(Events.MouseOver, (event) => {
      const mouseEvent = event as MouseEvent;
      this.show({
        x: mouseEvent.clientX - button.width,
        y: mouseEvent.clientY - button.height,
      });
    });
    button.addEventListener(Events.MouseOut, (event) => {
      const mouseEvent = event as MouseEvent;
      if (
        !DOMComponent.FromElement(mouseEvent.relatedTarget as HTMLElement).checkSelectorMatch(
          `.${HoverMenuCssClasses.Menu}`
        )
      )
        this.hide();
    });
    return button;
  }
}
