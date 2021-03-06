interface DomAttributes {
  [propsName: string]: any;
}

export function getElementById(elementId: string): HTMLElement {
  return document.getElementById(elementId);
}

export function setDomAttributes(element: HTMLElement, attributes: DomAttributes): void {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function isDomNode(element: any): boolean {
  return (
    element != null &&
    typeof element === 'object' &&
    !!element.tagName &&
    element instanceof HTMLElement
  );
}
