import DOMComponent from '../../../components/base-component';
import DropdownMenu from '../../../components/dropdown-menu/dropdown-menu';
import { Events, Tags } from '../../../types/dom-types/enums';
import FontAwesome from '../../../types/font-awesome';

enum SortMenuCssClasses {
  Menu = 'sort-menu',
  Option = 'sort-menu__option',
}

export default class SortMenu extends DropdownMenu {
  private static readonly HEIGHT = 200;

  private readonly selectHandler: () => void;

  private buttons: DOMComponent<HTMLButtonElement>[];

  private selectedButton?: DOMComponent<HTMLElement>;

  public constructor(onSelect: () => void) {
    const options = ['Name', 'Name', 'Price', 'Price'].map((option, index) => {
      const button = new DOMComponent<HTMLButtonElement>({
        tag: Tags.Button,
        classList: [SortMenuCssClasses.Option],
        textContent: option,
      });
      button.append(
        new DOMComponent<HTMLElement>({
          tag: Tags.Icon,
          classList: [FontAwesome.Solid, index % 2 === 0 ? FontAwesome.SortUp : FontAwesome.SortDown],
        })
      );
      if (!index) button.setAttribute('disabled', '');
      return button;
    });
    super('Sort', SortMenu.HEIGHT, options, document.documentElement.offsetWidth > 500);
    this.addClass(SortMenuCssClasses.Menu);

    this.buttons = options;
    [this.selectedButton] = this.buttons;
    this.selectHandler = onSelect;

    this.contentBody.addEventListener(Events.Click, (event: Event) => {
      const clicked = DOMComponent.FromElement(event.target as HTMLElement);
      if (clicked.checkSelectorMatch('button')) {
        if (this.selectedButton) this.selectedButton.removeAttribute('disabled');
        this.selectedButton = clicked;
        this.selectedButton.setAttribute('disabled', '');
        this.selectHandler();
      }
    });
  }

  public get data() {
    return {
      criteria: this.selectedButton?.textContent || '',
      isDescending: this.selectedButton?.checkSelectorMatch(`:has(.${FontAwesome.SortDown})`),
    };
  }
}
