// get Filters markup
export const getFiltersHTML = function (filters) {
  return `<section class="main__filter filter container">
    ${Array.from(filters).map((filter) => `
      <input
        type="radio"
        id="filter__${filter.title.toLowerCase()}"
        class="filter__input visually-hidden"
        name="filter"
        checked
      />
      <label for="filter__${filter.title.toLowerCase()}" class="filter__label">
      ${filter.title} <span class="filter__${filter.title.toLowerCase()}-count">${filter.count}</span></label
      >
    `)}
`;
};
