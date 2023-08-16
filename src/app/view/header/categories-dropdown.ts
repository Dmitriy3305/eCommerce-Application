import DOMComponent from '../../../components/base-component';
import DropdownMenu from '../../../components/dropdown-menu/dropdown-menu';
import { Tags } from '../../../types/dom-types/enums';
import FontAwesome from '../../../types/font-awesome';
import getLinkIcon from '../../../utils/get-link-icon';

export default class CategoriesDropdown extends DropdownMenu {
  private static TITLE = 'Catalog';

  private static CONTENT_HEIGHT = 150;

  public constructor() {
    // TODO : add real categories here
    const categories = ['rain', 'summer', 'boots'];
    super(
      CategoriesDropdown.TITLE,
      CategoriesDropdown.CONTENT_HEIGHT,
      categories.map((category) => {
        const link = new DOMComponent<HTMLAnchorElement>({
          tag: Tags.Anchor,
          textContent: category,
          attributes: {
            href: '',
          },
        });
        link.append(getLinkIcon(category));
        return link;
      })
    );

    this.openButton.append(
      new DOMComponent<HTMLElement>({
        tag: Tags.Icon,
        classList: [FontAwesome.Regular, FontAwesome.ChevronDown],
      })
    );
  }
}
