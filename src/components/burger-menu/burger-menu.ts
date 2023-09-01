import { Events, Tags } from '../../types/dom-types/enums';
import FontAwesome from '../../types/font-awesome';
import DOMComponent, { ElementParameters } from '../base-component';
import './styles.scss';

enum BurgerMenuCssClasses {
  BurgerMenu = 'burger-menu',
  BurgerMenuShown = 'burger-menu_shown',
  BurgerMenuBackground = 'burger-menu__background',
  BurgerMenuBackgroundShown = 'burger-menu__background_shown',
  BurgerMenuButton = 'burger-menu__open-button',
  BurgerMenuButtonClicked = 'burger-menu__open-button_clicked',
}

export default class BurgerMenu extends DOMComponent<HTMLElement> {
  private static OPEN_TRANSITION_PARAMS = '500ms ease-in-out';

  private static OPEN_TRANSITION_CSS_PROPERTY = '--open-transition';

  private background: DOMComponent<HTMLDivElement>;

  private parent: DOMComponent<HTMLElement>;

  public get isShown(): boolean {
    return this.checkSelectorMatch(`.${BurgerMenuCssClasses.BurgerMenuShown}`);
  }

  public constructor(parent: DOMComponent<HTMLElement>) {
    super({
      classList: [BurgerMenuCssClasses.BurgerMenu],
    });
    this.setCSSProperty(BurgerMenu.OPEN_TRANSITION_CSS_PROPERTY, BurgerMenu.OPEN_TRANSITION_PARAMS);

    this.background = new DOMComponent<HTMLDivElement>({
      classList: [BurgerMenuCssClasses.BurgerMenuBackground],
    });
    this.background.setCSSProperty(BurgerMenu.OPEN_TRANSITION_CSS_PROPERTY, BurgerMenu.OPEN_TRANSITION_PARAMS);
    this.background.addEventListener(Events.Click, () => this.hide());
    this.parent = parent;
  }

  public show(): void {
    this.parent.append(this.background, this);
    this.parent.setCSSProperty('overflow', 'hidden');
    setTimeout(() => {
      this.addClass(BurgerMenuCssClasses.BurgerMenuShown);
      this.background.addClass(BurgerMenuCssClasses.BurgerMenuBackgroundShown);
    });
  }

  public hide(): void {
    this.removeClass(BurgerMenuCssClasses.BurgerMenuShown);
    this.background.removeClass(BurgerMenuCssClasses.BurgerMenuBackgroundShown);

    const removeHandler = (event: Event) => {
      if (event.target === this.element) {
        this.remove();
        this.background.remove();
        this.parent.removeCSSProperty('overflow');
        this.removeEventListener(Events.TransitionEnd, removeHandler);
      }
    };
    this.addEventListener(Events.TransitionEnd, removeHandler);
  }

  public generateOpenButton(buttonParams: ElementParameters): DOMComponent<HTMLButtonElement> {
    const button = new DOMComponent<HTMLButtonElement>(buttonParams);
    button.addClass(BurgerMenuCssClasses.BurgerMenuButton);

    button.append(
      new DOMComponent<HTMLElement>({
        tag: Tags.Icon,
        classList: [FontAwesome.Regular, FontAwesome.Bars],
      })
    );

    button.addEventListener(Events.Click, () => {
      if (this.isShown) {
        this.hide();
      } else {
        this.show();
      }
    });

    this.addEventListener(Events.TransitionStart, (event: Event) => {
      if (
        DOMComponent.FromElement(event.target as HTMLElement).checkSelectorMatch(`.${BurgerMenuCssClasses.BurgerMenu}`)
      ) {
        if (this.isShown) {
          button.addClass(BurgerMenuCssClasses.BurgerMenuButtonClicked);
        } else {
          button.removeClass(BurgerMenuCssClasses.BurgerMenuButtonClicked);
        }
      }
    });

    button.setCSSProperty(BurgerMenu.OPEN_TRANSITION_CSS_PROPERTY, BurgerMenu.OPEN_TRANSITION_PARAMS);
    return button;
  }
}
