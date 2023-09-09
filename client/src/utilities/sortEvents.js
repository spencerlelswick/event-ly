function calcDist(ev,coord) {
    return (
        (ev.coordinates.latitude - coord[0]) ** 2 +
        (ev.coordinates.longitude - coord[1]) ** 2
    );
}

function sortByDist(list,coord){
    const listByDist = list.sort(function(a,b){
        if(calcDist(a,coord) > calcDist(b,coord)){return 1}
        if(calcDist(a,coord) < calcDist(b,coord)){return -1}
        return 0
    })
    return listByDist
}

function sortByDate(list){
    const listByDate = list.sort(function(a,b){
        if(a.date > b.date){return 1}
        if(a.date < b.date){return -1}
        return 0
    })
    return listByDate
}

function sortByName(list,num){
    const listByName = list.sort(function(a,b){
        if(a.name > b.name){return 1*num}
        if(a.name < b.name){return -1*num}
        return 0
    })
    return listByName
}

function sortByGuests(list){
    const listByGuests = list.sort(function(a,b){
        if(a.guests.length > b.guests.length){return -1}
        if(a.guests.length < b.guests.length){return 1}
        return 0
    })
    return listByGuests
}

export function sortEvents(list, coord, sorted) {
    if (list?.length && list.length > 1){
        if (sorted === "dist") {
            return sortByDist(list,coord)
        }else if (sorted ==="date"){
            return sortByDate(list)
        }else if (sorted === "name"){
            return sortByName(list,1)
        }else if (sorted === "nameInv"){
            return sortByName(list,-1)
        }else if (sorted === "guests"){
            return sortByGuests(list)
        }
    } else return list
}

