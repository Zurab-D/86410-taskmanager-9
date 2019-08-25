export const Position = {
  beforeBegin: `beforeBegin`,
  afterBegin: `afterBegin`,
  beforeEnd: `beforeEnd`,
  afterEnd: `afterEnd`
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.beforeBegin:
      container.before(element);
      break;
    case Position.afterBegin:
      container.prepend(element);
      break;
    case Position.beforeEnd:
      container.append(element);
      break;
    case Position.afterEnd:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
