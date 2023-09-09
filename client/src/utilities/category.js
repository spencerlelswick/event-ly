const Categories = [
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

export function decodeCat(num){
    return Categories[num-1]
}