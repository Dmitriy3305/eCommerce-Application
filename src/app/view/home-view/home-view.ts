import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import Feedback from './feedback';
import HomeSeasonSection from './home-season';
import Slider from './slider';
import AppView from '../view';

export default class HomeView extends AppView {
  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const sectionSeason = new HomeSeasonSection();
    const sectionSlider = new Slider(this.router);
    const sectionFeedback = new Feedback();
    main.append(sectionSeason, sectionSlider, sectionFeedback);
    return main;
  }
}
