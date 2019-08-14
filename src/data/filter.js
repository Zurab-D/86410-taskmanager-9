let filters = [{
  title: `All`, count: 0
}, {
  title: `Overdue`, count: 0
}, {
  title: `Today`, count: 0
}, {
  title: `Favorites`, count: 0
}, {
  title: `Repeating`, count: 0
}, {
  title: `Tags`, count: 0
}, {
  title: `Archive`, count: 0
}];

export const getFilters = (tasks) => {
  filters.forEach((filter) => {
    switch (filter.title) {
      case `All`: filter.count = tasks.length;
        break;

      case `Overdue`: filter.count = tasks.filter((task) => {
        const dat = new Date(task.dueDate);
        return dat.setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0);
      }).length;
        break;

      case `Today`: filter.count = tasks.filter((task) => {
        const dat = new Date(task.dueDate);
        return dat.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0);
      }).length;
        break;

      case `Favorites`: filter.count = tasks.filter((task) => task.isFavorite).length;
        break;

      case `Repeating`: filter.count = tasks.filter((task) => {
        for (const prop in task.repeatingDays) {
          if (task.repeatingDays.hasOwnProperty(prop)) {
            if (task.repeatingDays[prop]) {
              return true;
            }
          }
        }
        return false;
      }).length;
        break;

      case `Tags`: filter.count = tasks.filter((task) => Array.from(task.tags).length > 0).length;
        break;

      case `Archive`: filter.count = tasks.filter((task) => task.isArchive).length;
        break;
    }
  });
  return filters;
};
