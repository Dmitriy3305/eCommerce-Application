import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import { AboutUsInfo } from '../../../types/dom-types/types';
import cardInfo from './card-info.json';
import imgAlexandr from '../../../assets/images/Alexandr.jpg';
import imgDmitriy from '../../../assets/images/Dmitriy.jpg';
import imgVeronika from '../../../assets/images/Veronika.jpg';

enum CardsCssClasses {
  Section = 'sections__cards',
  Card = 'card',
  Img = 'card__img',
  Name = 'card__name',
  Role = 'card__role',
  AboutMe = 'card__about-me',
  GithubLink = 'card__githubLink',
}

enum Developers {
  Alexandr = 'Alexandr',
  Veronika = 'Veronika',
  Dmitriy = 'Dmitriy',
}

export default class Cards extends DOMComponent<HTMLElement> {
  private static CARDS_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [CardsCssClasses.Section],
  };

  public constructor() {
    super(Cards.CARDS_PARAMS);
    Object.values(cardInfo).forEach((item: AboutUsInfo) => {
      const img = new DOMComponent<HTMLImageElement>({
        tag: Tags.Image,
        classList: [CardsCssClasses.Img],
        attributes: {
          alt: 'photo',
        },
      });
      switch (item.name) {
        case Developers.Alexandr:
          img.setAttribute('src', imgAlexandr);
          break;
        case Developers.Veronika:
          img.setAttribute('src', imgVeronika);
          break;
        case Developers.Dmitriy:
          img.setAttribute('src', imgDmitriy);
          break;
        default:
          break;
      }

      const name = new DOMComponent<HTMLParagraphElement>({
        tag: Tags.Paragraph,
        classList: [CardsCssClasses.Name],
        textContent: item.name,
      });

      const role = new DOMComponent<HTMLParagraphElement>({
        tag: Tags.Paragraph,
        classList: [CardsCssClasses.Role],
        textContent: item.role,
      });

      const aboutMe = new DOMComponent<HTMLParagraphElement>({
        tag: Tags.Paragraph,
        classList: [CardsCssClasses.AboutMe],
        textContent: item.aboutMe,
      });

      const githubLink = new DOMComponent<HTMLAnchorElement>({
        tag: Tags.Anchor,
        classList: [CardsCssClasses.GithubLink],
        textContent: 'link my github',
        attributes: {
          href: item.github,
        },
      });

      const card = new DOMComponent<HTMLDivElement>({
        tag: Tags.Div,
        classList: [CardsCssClasses.Card],
      });
      card.append(img, name, role, aboutMe, githubLink);
      this.append(card);
    });
  }
}
