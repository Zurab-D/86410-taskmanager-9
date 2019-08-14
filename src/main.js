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
import {getTaskEditFormHTML} from './components/task-edit';

// get Load More button markup
import {getLoadMoreHTML} from './components/load-more';

// render eement
import {renderElem} from './components/render';

// getTask function
import {getTask} from './data/task';

import {getFilters} from './data/filter';

const mainElem = document.querySelector(`.main`);
const mainControl = mainElem.querySelector(`.main__control`);

// create board section
const boardSection = document.createElement(`section`);
boardSection.className = `board container`;

// create .board__tasks
const boardTasks = document.createElement(`div`);
boardTasks.className = `board__tasks`;

// tasks array
const TASK_COUNT = 3;
const tasks = new Array(TASK_COUNT).fill(``).map(getTask);

// menu
renderElem(mainControl, getMenuHTML());

// search
renderElem(mainElem, getSearchHTML());

// filters
renderElem(mainElem, getFiltersHTML(getFilters(tasks)));

// sort list
renderElem(boardSection, getSortByHTML());

// edit form
renderElem(boardTasks, getTaskEditFormHTML(`Here is a card with filled data`, `23 SEPTEMBER 11:15 PM`));

// render tasks
renderElem(boardTasks, tasks.map(getTaskCardHTML).join(``));

// append tasks to the board
boardSection.append(boardTasks);

// render Load More button
renderElem(boardSection, getLoadMoreHTML());

// append board to the main element
mainElem.append(boardSection);
