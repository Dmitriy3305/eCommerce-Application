import { Tags, Events, InsertPositions } from '../types/dom-types/enums';
import { AnimationParams } from '../types/dom-types/types';

export type ElementParameters = Partial<{
  tag: string;
  textContent: string;
  classList: string[];
  attributes: { [attribute: string]: string };
  parent: Node | DOMComponent<HTMLElement>;
}>;

export default class DOMComponent<T extends HTMLElement> {
  protected element: T;

  public static FromHTML<T extends HTMLElement>(html: string): DOMComponent<T> {
    const template = document.createElement(Tags.Template);
    template.insertAdjacentHTML(InsertPositions.Prepend, html);
    const element = template.firstChild as T;
    const component = new DOMComponent<T>({ tag: element.tagName });
    component.element = element;
    return component;
  }

  public static FromElement<T extends HTMLElement>(element: T): DOMComponent<T> {
    const component = new DOMComponent<T>({});
    component.element = element;
    return component;
  }

  public constructor({ tag = Tags.Div, textContent, classList, attributes, parent }: ElementParameters) {
    this.element = document.createElement(tag) as T;

    if (textContent) this.element.innerText = textContent;

    if (classList) this.addClass(...classList);

    if (attributes) {
      Object.keys(attributes).forEach((attribute) => {
        this.setAttribute(attribute, attributes[attribute]);
      });
    }

    if (parent instanceof Node) parent.appendChild(this.element);
    if (parent instanceof DOMComponent) parent.append(this.element);
  }

  public get HTML(): string {
    return this.element.outerHTML;
  }

  public get textContent(): string {
    return this.element.innerText;
  }

  public set textContent(value: string) {
    this.element.innerText = value;
  }

  public get height(): number {
    return this.element.offsetHeight;
  }

  public get fullHeight(): number {
    const marginTop = parseFloat(this.getCSSProperty('margin-top'));
    const marginBottom = parseFloat(this.getCSSProperty('margin-bottom'));
    return marginTop + this.height + marginBottom;
  }

  public get scrolledY(): number {
    return this.element.scrollTop;
  }

  public insertBeforeNode(node: Node) {
    node.parentNode?.insertBefore(this.element, node);
  }

  public append(...elements: (HTMLElement | DOMComponent<HTMLElement>)[]): void {
    elements.forEach((element) => {
      if (element instanceof DOMComponent) this.element.append(element.element);
      else this.element.append(element);
    });
  }

  public clear(): void {
    this.element.innerHTML = '';
  }

  public addClass(...classNames: string[]): void {
    classNames.forEach((className) => this.element.classList.add(className));
  }

  public removeClass(...classNames: string[]): void {
    classNames.forEach((className) => this.element.classList.remove(className));
  }

  public checkSelectorMatch(selector: string): boolean {
    try {
      return this.element.matches(selector);
    } catch {
      return false;
    }
  }

  public setAttribute(attributeName: string, attributeValue: string): void {
    this.element.setAttribute(attributeName, attributeValue);
  }

  public removeAttribute(attributeName: string): void {
    this.element.removeAttribute(attributeName);
  }

  public addEventListener(event: Events, listener: (e: Event) => void): void {
    this.element.addEventListener(event, listener);
  }

  public removeEventListener(event: Events, listener: (e: Event) => void): void {
    this.element.removeEventListener(event, listener);
  }

  public addText(text: string) {
    this.element.append(document.createTextNode(text));
  }

  public remove(): void {
    this.element.remove();
  }

  public showAnimation({ name, duration, timingFunction = 'ease-in-out' }: AnimationParams): void {
    this.element.style.animation = `${name} ${duration}ms ${timingFunction}`;
  }

  public setCSSProperty(name: string, value: string): void {
    this.element.style.setProperty(name, value);
  }

  public getCSSProperty(name: string): string {
    const computedStyles = this.element.computedStyleMap();
    return computedStyles.get(name)?.toString() || 'undefined';
  }

  public removeCSSProperty(name: string): void {
    this.element.style.removeProperty(name);
  }
}