import {AbstractComponent} from './AbstractComponent';

// get sort list markup
export class NoTasks extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<p class="board__no-tasks">
      Congratulations, all tasks were completed! To create a new click on
      «add new task» button.
    </p>`;
  }
}

