import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppRouter from '../router/router';
import Feedback from './home-page/feedback';
import Season from './home-page/season';
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
    const sectionSeason = new Season(this.router);
    const sectionSlider = new Slider(this.router);
    const sectionFeedback = new Feedback(this.router);
    main.append(sectionSeason, sectionSlider, sectionFeedback);
    return main;
  }
}
