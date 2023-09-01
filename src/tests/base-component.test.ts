import DOMComponent from '../components/base-component';
import { Tags } from '../types/dom-types/enums';

describe('base DOM component', () => {
  it('creates new dom element and adds it to the specified parent into the DOM', () => {
    DOMComponent.FromElement(document.body).append(
      new DOMComponent<HTMLElement>({
        tag: Tags.Span,
        classList: ['test-span'],
        attributes: {
          attr: 'value',
        },
      })
    );
    expect(document.querySelector('span.test-span[attr="value"]')).toBeTruthy();
  });
  it('can add DOM elements to itself', () => {
    const component = new DOMComponent<HTMLDivElement>({ parent: document.body });
    component.append(
      new DOMComponent({
        tag: Tags.Paragraph,
        classList: ['test-p'],
      })
    );
    expect(document.querySelector('div .test-p')).toBeTruthy();
  });
  describe('can check if it matches selector', () => {
    describe('when element matches given selector', () => {
      it('returns true', () => {
        const component = new DOMComponent<HTMLSpanElement>({
          tag: Tags.Span,
          classList: ['super-span', 'span-span'],
          attributes: {
            size: 'big',
            lines: '100',
          },
        });
        expect(component.checkSelectorMatch('.super-span.span-span[size="big"][lines="100"]')).toBe(true);
      });
    });
  });
  it('can add and remove class to / from the element', () => {
    const component = new DOMComponent<HTMLElement>({});
    component.addClass('class');
    expect(component.checkSelectorMatch('.class')).toBe(true);
    component.removeClass('class');
    expect(component.checkSelectorMatch('.class')).toBe(false);
  });
  it('can and and remove attributes to / from the element', () => {
    const component = new DOMComponent<HTMLElement>({});
    component.setAttribute('width', '400');
    expect(component.checkSelectorMatch('[width="400"]')).toBe(true);
    component.removeAttribute('width');
    expect(component.checkSelectorMatch('[width="400"]')).toBe(false);
  });
  it('returns correct HTML', () => {
    const component = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['super-button'],
      attributes: {
        count: '3',
      },
    });
    expect(component.HTML).toBe('<button class="super-button" count="3"></button>');
  });
});
