// get Menu markup
import {getMenuHTML} from './components/menu';

// get Serch markup
import {getSearchHTML} from './components/search';

// get Filters markup
import {getFiltersHTML} from './components/filters-bar';

// get sort list markup
import {getSortByHTML} from './components/sort';

// get Task Card markup
import {getTaskCardHTML} from './components/task-card';

// get Task Edit Form markup
// import {getTaskEditFormHTML} from './components/task-edit';

// get Load More button markup
import {getLoadMoreHTML} from './components/load-more';

// render eement
import {renderElem} from './components/render';

// getTask function
import {getTask} from './data/task';

import {getFilters} from './data/filter';

import {render, Position} from './utils';
import {TaskCard} from './components/task-card';

const mainElem = document.querySelector(`.main`);
const mainControl = mainElem.querySelector(`.main__control`);

// create board section
let boardSection = document.createElement(`section`);
boardSection.className = `board container`;

// create .board__tasks
let boardTasks = document.createElement(`div`);
boardTasks.className = `board__tasks`;

// tasks array
const TASK_COUNT = 16;
const tasks = new Array(TASK_COUNT).fill(``).map(getTask);
let curCount = 0;

// menu
renderElem(mainControl, getMenuHTML());

// search
renderElem(mainElem, getSearchHTML());

// filters
renderElem(mainElem, getFiltersHTML(getFilters(tasks)));

// sort list
renderElem(boardSection, getSortByHTML());

// edit form
// renderElem(boardTasks, getTaskEditFormHTML(tasks[curCount++]));

// render tasks
const renderTask = (taskMock) => {
  const taskCard = new TaskCard(taskMock);
  render(boardTasks, taskCard.getElement(), Position.BEFOREEND);
};

tasks.
  slice(curCount, curCount + 8).
  forEach(renderTask);

curCount += 8;

// append tasks to the board
boardSection.append(boardTasks);

// render Load More button
renderElem(boardSection, getLoadMoreHTML());

// append board to the main element
mainElem.append(boardSection);
boardSection = mainElem.querySelector(`.board`);
boardTasks = boardSection.querySelector(`.board__tasks`);

const btnLoadMore = document.querySelector(`.load-more`);
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
