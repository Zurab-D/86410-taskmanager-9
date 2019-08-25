// utils
import {render, Position} from './utils';

// import components
import {Menu} from './components/menu';
import {Search} from './components/search';
import {Filters} from './components/filters-bar';
import {Sort} from './components/sort';
import {TaskCard} from './components/task-card';
import {TaskEdit} from './components/task-edit';
import {LoadMore} from './components/load-more';
import {NoTasks} from './components/no-tasks';

// import filters
import {getFilters} from './data/filter';


export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
  }

  // method: init
  init() {
    this._mainControl = this._container.querySelector(`.main__control`);
    this._boardSection = this._container.querySelector(`.board`);
    this._boardTasks = this._container.querySelector(`.board__tasks`);

    this._curCount = 0;

    // render menu
    const menu = new Menu();
    render(this._mainControl, menu.getElement(), Position.beforeEnd);

    // render filters
    const filters = new Filters(getFilters(this._tasks));
    render(this._mainControl, filters.getElement(), Position.afterEnd);

    // render search
    const search = new Search();
    render(this._mainControl, search.getElement(), Position.afterEnd);

    // render tasks
    this.renderAllTasks();
  }

  // method: render a task
  renderTask(taskMock) {
    const taskCard = new TaskCard(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._boardTasks.replaceChild(taskCard.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskCard.getElement().
      querySelector(`.card__btn--edit`).
      addEventListener(`click`, () => {
        this._boardTasks.replaceChild(taskEdit.getElement(), taskCard.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().
      querySelector(`textarea`).
        addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

    taskEdit.getElement().
      querySelector(`textarea`).
        addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });

    render(this._boardTasks, taskCard.getElement(), Position.beforeEnd);
  }

  // method: render all tasks
  renderAllTasks() {
    this._boardTasks.innerHTML = ``;
    if (this._tasks.length) {
      this._tasks.
        slice(this._curCount, this._curCount + 8).
        forEach(this.renderTask.bind(this));

      // inc counter
      this._curCount += 8;

      // sort list
      const sort = new Sort();
      render(this._boardSection, sort.getElement(), Position.afterBegin);

      // render Load More button
      const loadMore = new LoadMore();
      render(this._boardSection, loadMore.getElement(), Position.beforeEnd);

      const btnLoadMore = this._boardSection.querySelector(`.load-more`);

      btnLoadMore.addEventListener(`click`, () => {
        // render next 8 tasks
        this._tasks.
          slice(this._curCount, this._curCount + 8).
          forEach(this.renderTask.bind(this));

        // inc the counter
        this._curCount += 8;

        // hide button if all tasks are shown
        if (this._curCount >= this._tasks.length) {
          btnLoadMore.style.display = `none`;
        }
      });
    } else {
      render(this._boardTasks, (new NoTasks()).getElement(), Position.beforeBegin);
    }
  }
}
