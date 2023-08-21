import DOMComponent from '../../../components/base-component';
import DropdownMenu from '../../../components/dropdown-menu/dropdown-menu';
import { Tags } from '../../../types/dom-types/enums';
import FontAwesome from '../../../types/font-awesome';
import { LinkCreateCallback } from '../../../types/header-types';
import createLink from '../../../utils/create-link';
import getLinkIcon from '../../../utils/get-link-icon';
import AppRouter from '../../router/router';

export default class CategoriesDropdown extends DropdownMenu {
  private static TITLE = 'Catalog';

  private static CONTENT_HEIGHT = 150;

  public constructor(router: AppRouter, categories: string[], callback: LinkCreateCallback) {
    super(
      CategoriesDropdown.TITLE,
      CategoriesDropdown.CONTENT_HEIGHT,
      categories.map((category) => {
        const url = router.buildCategoryUrl(category);
        const link = createLink({ textContent: category }, router, url);
        callback(url, link);
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
