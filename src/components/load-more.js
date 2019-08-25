import {AbstractComponent} from './AbstractComponent';

// get Load More button markup
export class LoadMore extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
