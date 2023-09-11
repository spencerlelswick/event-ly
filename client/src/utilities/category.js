import { datePickerToday, datePickerAddMonth } from "./dates"

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
    filter.minDate = datePickerToday()
    filter.maxDate = datePickerAddMonth( new Date(),2)
    return filter
}

export function decodeCat(num){
    return Categories[num-1]
}

export const isFiltered = (event, eventFilter) => {
    let result = false
    let hasFilter = false

    if (event.date >= eventFilter.minDate && 
        event.date <= eventFilter.maxDate){
            result = true
        }

    if (result){
        hasFilter = Object.values(eventFilter).find((i) => i === true);
    }

    if (hasFilter && result) {
        const cat = decodeCat(event.category);
        result = eventFilter[cat];
    }

    return result;
  };
