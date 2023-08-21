import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppRouter from '../router/router';
import Feedback from './home-page/feedback';
import HomeSeasonSection from './home-page/home-season';
import Slider from './home-page/slider';
import AppView from './view';

export default class MainView extends AppView {
  public constructor(router: AppRouter) {
    super(router);
  }

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
