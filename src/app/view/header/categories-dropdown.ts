import DOMComponent from '../../../components/base-component';
import DropdownMenu from '../../../components/dropdown-menu/dropdown-menu';
import RoutedLink from '../../../components/routed-link';
import { Tags } from '../../../types/dom-types/enums';
import FontAwesome from '../../../types/font-awesome';
import { LinkCreateCallback } from '../../../types/header-types';
import getLinkIcon from '../../../utils/get-link-icon';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';

enum CategoriesDropdownCssClasses {
  GroupWrapper = 'categories-group',
}

export default class CategoriesDropdown extends DropdownMenu {
  private static TITLE = 'Catalog';

  private static CONTENT_HEIGHT = 150;

  public constructor(router: AppRouter, categoryGroups: GrouppedCategories, callback: LinkCreateCallback) {
    super(
      CategoriesDropdown.TITLE,
      CategoriesDropdown.CONTENT_HEIGHT,
      Object.keys(categoryGroups).map((group) => {
        const groupWrapper = new DOMComponent<HTMLElement>({
          tag: Tags.Div,
          classList: [CategoriesDropdownCssClasses.GroupWrapper],
        });
        categoryGroups[group].forEach((category) => {
          const url = router.buildCategoryUrl(category);
          const link = new RoutedLink({ textContent: category }, url, router);
          link.append(getLinkIcon(category));
          callback(url, link);
          groupWrapper.append(link);
        });
        return groupWrapper;
      })
    );

    this.openButton.append(
      new DOMComponent<HTMLElement>({
        tag: Tags.Icon,
        classList: [FontAwesome.Regular, FontAwesome.ChevronDown],
      })
    );
  }

  public disable(): void {
    this.openButton.setAttribute('disabled', '');
    this.open();
  }

  public enable(): void {
    this.openButton.removeAttribute('disabled');
    this.close();
  }
}
