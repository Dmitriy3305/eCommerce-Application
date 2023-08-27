import { Events, InputTypes, InsertPositions, Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import InputDomComponent from './input-component';
import hidePasswordIcon from '../../assets/images/icon_hidePassword.svg';
import showPasswordIcon from '../../assets/images/icon_showPassword.svg';

enum PasswordCssClasses {
  VisibilityButton = 'password__toggle-visibility-button',
  VisibilityButtonImage = 'visibility-button__image',
}

export default class PasswordInput extends InputDomComponent {
  private static VISIBILITY_BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [PasswordCssClasses.VisibilityButton],
    attributes: {
      type: 'button',
    },
  };

  private static BUTTON_IMAGE_PARAMS: ElementParameters = {
    tag: Tags.Image,
    classList: [PasswordCssClasses.VisibilityButtonImage],
    attributes: {
      src: showPasswordIcon,
    },
  };

  private toggleVisibilityButton: DOMComponent<HTMLButtonElement>;

  public constructor(params: Omit<ElementParameters, 'tag'>) {
    super(params);
    this.setAttribute('type', InputTypes.Password);

    this.toggleVisibilityButton = new DOMComponent<HTMLButtonElement>(PasswordInput.VISIBILITY_BUTTON_PARAMS);
    this.insert(InsertPositions.After, this.toggleVisibilityButton);

    const buttonImg = new DOMComponent<HTMLImageElement>({
      ...PasswordInput.BUTTON_IMAGE_PARAMS,
      parent: this.toggleVisibilityButton,
    });

    this.toggleVisibilityButton.addEventListener(Events.Click, () => {
      const currentType = this.getAttribute('type') as InputTypes;
      if (currentType === InputTypes.Text) {
        this.setAttribute('type', InputTypes.Password);
        buttonImg.setAttribute('src', showPasswordIcon);
      } else {
        this.setAttribute('type', InputTypes.Text);
        buttonImg.setAttribute('src', hidePasswordIcon);
      }
    });
  }
}
