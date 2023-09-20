import DOMComponent from '../../components/base-component';
import RoutedLink from '../../components/routed-link';
import { Tags } from '../../types/dom-types/enums';
import AppView from './view';

enum BreadcrumbCssClasses {
  BreadcrumbNavigation = 'breadcrumb-navigation',
  BreadcrumbLink = 'breadcrumb-navigation__link',
}

export default abstract class BreadcrumbedView extends AppView {
  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const breadcrumbNavigation = new DOMComponent<HTMLDivElement>({
      classList: [BreadcrumbCssClasses.BreadcrumbNavigation],
    });
    main.append(breadcrumbNavigation);

    let link = '';

    const links = this.router.locationHistory.map((part, index) => {
      if (index) link += `${part.toLowerCase()}/`;
      if (Object.values(BreadcrumbedView.HEADER?.categoryGroups || {}).some((group) => group.includes(part)))
        link = this.router.buildCategoryUrl(part);
      return new RoutedLink({ classList: [BreadcrumbCssClasses.BreadcrumbLink], textContent: part }, link, this.router);
    });
    links[0].textContent = 'Home';

    const lastLink = links.at(-1);
    if (lastLink) {
      lastLink.setAttribute('disabled', '');
      lastLink.textContent = lastLink.textContent.replaceAll('-', ' ');
    }

    breadcrumbNavigation.append(...links);
    return main;
  }
}
