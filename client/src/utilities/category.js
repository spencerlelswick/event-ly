export const Categories = [
    "Art",
    "Business",
    "Exercise",
    "Food",
    "Games",
    "Language",
    "Music",
    "Party",
    "Politics",
    "Science",
    "Sport",
    "Tech",
]


export function initFilter() {
    const filter = {}
    Categories.forEach(c => {
        filter[c] = false
    })
    return filter
}


export function decodeCat(num){
    return Categories[num-1]
}

export const isFiltered = (event, eventFilter) => {
    const hasFilter = Object.values(eventFilter).find((i) => i === true);
    if (hasFilter) {
      const cat = decodeCat(event.category);
      const result = eventFilter[cat];
      return result;
    }
    return true;
  };
