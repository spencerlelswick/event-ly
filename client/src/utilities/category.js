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
    filter.minDate = new Date().toISOString().slice(0, -14)
    filter.maxDate =new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().slice(0, -14)
    return filter
}

export function decodeCat(num){
    return Categories[num-1]
}

export const isFiltered = (event, eventFilter) => {
    let result = false

    if (event.date >= eventFilter.minDate && 
        event.date <= eventFilter.maxDate){
            result = true
        }

    const hasFilter = Object.values(eventFilter).find((i) => i === true);
    if (hasFilter && result) {
        const cat = decodeCat(event.category);
        result = eventFilter[cat];
    }

    return result;
  };
