// get Menu markup
import {getMenuHTML} from './components/menu';

// get Serch markup
import {getSearchHTML} from './components/search';

// get Filters markup
import {getFiltersHTML} from './components/filter';

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

(function () {
  const mainElem = document.querySelector(`.main`);
  const mainControl = mainElem.querySelector(`.main__control`);

  // create board section
  const boardSection = document.createElement(`section`);
  boardSection.className = `board container`;

  // create .board__tasks
  const boardTasks = document.createElement(`div`);
  boardTasks.className = `board__tasks`;

  // tasks list
  const tasks = [
    {
      cardText: `Example default task with default color.`,
      cardDate: `23 SEPTEMBER`,
      cardTime: `11:15 PM`,
      classList: `card--black`
    },
    {
      cardText: `Example default task with custom color.`,
      cardDate: `23 SEPTEMBER`,
      cardTime: `11:15 PM`,
      classList: `card--blue`
    },
    {
      cardText: `Example default task with custom color and without date.`,
      cardDate: ``,
      cardTime: ``,
      classList: `card--yellow`
    },
  ];

  // menu
  renderElem(mainControl, getMenuHTML());

  // search
  renderElem(mainElem, getSearchHTML());

  // filters
  renderElem(mainElem, getFiltersHTML());

  // sort list
  renderElem(boardSection, getSortByHTML());

  // edit form
  renderElem(boardTasks, getTaskEditFormHTML(`Here is a card with filled data`, `23 SEPTEMBER 11:15 PM`));

  // render tasks
  for (const task of tasks) {
    renderElem(boardTasks, getTaskCardHTML(task.cardText, task.cardDate, task.cardTime, task.classList));
  }

  // append tasks to the board
  boardSection.append(boardTasks);

  // render Load More button
  renderElem(boardSection, getLoadMoreHTML());

  // append board to the main element
  mainElem.append(boardSection);
})();
