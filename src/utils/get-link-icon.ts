import DOMComponent from '../components/base-component';
import { Tags } from '../types/dom-types/enums';
import FontAwesome from '../types/font-awesome';

export default function getLinkIcon(title: string): DOMComponent<HTMLElement> {
  const icon = new DOMComponent<HTMLElement>({
    tag: Tags.Icon,
    classList: [FontAwesome.Regular],
  });

  switch (title) {
    case 'Register':
      icon.addClass(FontAwesome.UserPlus);
      break;
    case 'Login':
      icon.addClass(FontAwesome.Key);
      break;
    case 'Profile':
      icon.addClass(FontAwesome.User);
      break;
    case 'Cart':
      icon.addClass(FontAwesome.Cart);
      break;
    case FontAwesome.SignOut:
      icon.addClass(FontAwesome.SignOut);
      break;
    case 'Catalog':
      icon.addClass(FontAwesome.Plus);
      break;
    default:
      break;
  }

  return icon;
}
