// get data
import {getTask} from './data/task';

import {BoardController} from './BoardController';

// tasks array
const TASK_COUNT = 16;
const tasks = new Array(TASK_COUNT).fill(``).map(getTask);

const mainElem = document.querySelector(`.main`);
const boardController = new BoardController(mainElem, tasks);
boardController.init();
