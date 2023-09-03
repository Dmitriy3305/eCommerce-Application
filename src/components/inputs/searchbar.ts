import { Events, InputTypes, Tags } from '../../types/dom-types/enums';
import FontAwesome from '../../types/font-awesome';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from './input-component';

enum SearchBarCssClasses {
  Wrapper = 'searchbar',
  Input = 'searchbar__input',
  Icon = 'searchbar__icon',
}

export default class SearchBar extends DOMComponent<HTMLElement> {
  private static WRAPPER_PARAMS: ElementParameters = {
    tag: Tags.Div,
    classList: [SearchBarCssClasses.Wrapper],
  };

  private static SEARCHBAR_PARAMS: Omit<ElementParameters, 'tag'> = {
    classList: [SearchBarCssClasses.Input],
    attributes: {
      type: InputTypes.Text,
    },
  };

  private static SEARCH_ICON_PARAMS: ElementParameters = {
    tag: Tags.Icon,
    classList: [SearchBarCssClasses.Icon, FontAwesome.Regular, FontAwesome.Search],
  };

  public constructor(onSearchCallback: (value: string) => void) {
    super(SearchBar.WRAPPER_PARAMS);

    const searchbar = new InputDomComponent({ ...SearchBar.SEARCHBAR_PARAMS, parent: this });
    const searchIcon = new DOMComponent<HTMLElement>({ ...SearchBar.SEARCH_ICON_PARAMS, parent: this });

    const handler = () => {
      onSearchCallback(searchbar.value);
    };
    searchbar.addEnterHanlder(handler);
    searchIcon.addEventListener(Events.Click, () => {
      onSearchCallback(searchbar.value);
    });
  }
}
