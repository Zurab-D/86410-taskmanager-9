// get Menu
import {Menu} from './components/menu';

// get Serch
import {Search} from './components/search';

// get Filters
import {Filters} from './components/filters-bar';

// get sort list
import {Sort} from './components/sort';

// get Task Card
import {TaskCard} from './components/task-card';

// get Task Edit Form
import {TaskEdit} from './components/task-edit';

// get Load More button
import {LoadMore} from './components/load-more';

// get data
import {getTask} from './data/task';
import {getFilters} from './data/filter';

// utils
import {render, Position} from './utils';

const mainElem = document.querySelector(`.main`);
const mainControl = mainElem.querySelector(`.main__control`);

// board section
const boardSection = mainElem.querySelector(`.board`);

// board__tasks
const boardTasks = mainElem.querySelector(`.board__tasks`);

// tasks array
const TASK_COUNT = 16;
const tasks = new Array(TASK_COUNT).fill(``).map(getTask);
let curCount = 0;

// ~~~ render the page ~~~

// menu
const menu = new Menu();
render(mainControl, menu.getElement(), Position.beforeEnd);

// filters
const filters = new Filters(getFilters(tasks));
render(mainControl, filters.getElement(), Position.afterEnd);

// search
const search = new Search();
render(mainControl, search.getElement(), Position.afterEnd);

// sort list
const sort = new Sort();
render(boardSection, sort.getElement(), Position.afterBegin);

// render task function
const renderTask = (taskMock) => {
  const taskCard = new TaskCard(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      boardTasks.replaceChild(taskCard.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskCard.getElement().
    querySelector(`.card__btn--edit`).
    addEventListener(`click`, () => {
      boardTasks.replaceChild(taskEdit.getElement(), taskCard.getElement());
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

  render(boardTasks, taskCard.getElement(), Position.beforeEnd);
};

tasks.
  slice(curCount, curCount + 8).
  forEach(renderTask);

// inc counter
curCount += 8;

// render Load More button
const loadMore = new LoadMore();
render(boardSection, loadMore.getElement(), Position.beforeEnd);

const btnLoadMore = boardSection.querySelector(`.load-more`);
btnLoadMore.addEventListener(`click`, () => {
  // render next 8 tasks
  tasks.
    slice(curCount, curCount + 8).
    forEach(renderTask);

  // inc the counter
  curCount += 8;

  // hide button if all tasks are shown
  if (curCount >= tasks.length) {
    btnLoadMore.style.display = `none`;
  }
});
