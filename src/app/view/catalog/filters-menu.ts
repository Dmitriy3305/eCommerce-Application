import filterIcon from '../../../assets/images/Catalog/filter-icon.svg';
import DropdownMenu from '../../../components/dropdown-menu/dropdown-menu';
import DOMComponent, { ElementParameters } from '../../../components/base-component';
import InputDomComponent from '../../../components/inputs/input-component';
import { Events, InputTypes, Tags } from '../../../types/dom-types/enums';
import { ProductFilterQueries } from '../../../types/product-loads';

enum FilterMenuCssClasses {
  Menu = 'filter-menu',
  CriteriaGroup = 'filter-menu__criteria-group',
  CriteriaLabel = 'filter-menu__criteria-label',
  Input = 'filter-menu__criteria-input',
  ActionButton = 'filter-menu__action',
}

export default class ProductFiltersMenu extends DropdownMenu {
  private static readonly FULL_HEIGHT = 125;

  private static CRITERIA_GROUP_PARAMS: ElementParameters = {
    tag: Tags.Label,
    classList: [FilterMenuCssClasses.CriteriaGroup],
  };

  private static CRITERIA_LABEL_PARAMS: ElementParameters = {
    tag: Tags.Label,
    classList: [FilterMenuCssClasses.CriteriaLabel],
  };

  private static PRICE_INPUT_PARAMS: ElementParameters = {
    classList: [FilterMenuCssClasses.Input],
    attributes: {
      type: InputTypes.Number,
    },
  };

  private priceFromInput: InputDomComponent;

  private priceToInput: InputDomComponent;

  private onFilter: () => void;

  public constructor(onFilter: () => void) {
    const openIcon = new DOMComponent({
      tag: Tags.Image,
      attributes: {
        src: filterIcon,
      },
    });

    const label = new DOMComponent<HTMLSpanElement>({
      ...ProductFiltersMenu.CRITERIA_GROUP_PARAMS,
      textContent: 'Price',
    });
    const priceFromLabel = new DOMComponent<HTMLSpanElement>({
      ...ProductFiltersMenu.CRITERIA_LABEL_PARAMS,
      textContent: 'From',
    });
    const priceFrom = new InputDomComponent(ProductFiltersMenu.PRICE_INPUT_PARAMS);
    const priceToLabel = new DOMComponent<HTMLSpanElement>({
      ...ProductFiltersMenu.CRITERIA_LABEL_PARAMS,
      textContent: 'To',
    });
    const priceTo = new InputDomComponent(ProductFiltersMenu.PRICE_INPUT_PARAMS);

    const filterButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [FilterMenuCssClasses.ActionButton],
      textContent: 'Filter',
    });
    filterButton.addEventListener(Events.Click, onFilter);

    const resetButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [FilterMenuCssClasses.ActionButton],
      textContent: 'Reset',
    });
    resetButton.addEventListener(Events.Click, () => this.reset());
    const isDesktop = document.documentElement.offsetWidth > 500;

    super(
      openIcon,
      ProductFiltersMenu.FULL_HEIGHT,
      [label, priceFromLabel, priceFrom, priceToLabel, priceTo, filterButton, resetButton],
      isDesktop
    );
    this.addClass(FilterMenuCssClasses.Menu);
    this.priceFromInput = priceFrom;
    this.priceToInput = priceTo;
    this.onFilter = onFilter;
  }

  public get data(): ProductFilterQueries {
    return {
      priceFrom: +this.priceFromInput.value,
      priceTo: +this.priceToInput.value,
    };
  }

  public reset(): void {
    this.priceFromInput.value = '';
    this.priceToInput.value = '';
    this.onFilter();
  }
}
