export function fullDateDisplay(date){
    return(
        new Date(date).toLocaleTimeString([],{
            year: 'numeric',
            month: 'numeric',
            day:'numeric', hour: '2-digit',
            minute: '2-digit'})
    )           
}   

export function timeDisplay(date){
    return new Date(date).toLocaleTimeString(
        [],
        {hour: '2-digit', minute: '2-digit'}
    );
}

export function dateDisplay(date){
    return new Date(date).toLocaleDateString()
}

export function datePicker(date){
    const y = new Date(date).getFullYear()

    let m = new Date(date).getMonth()
    m = m + 1
    m.toString().length === 1 ? m = "0"+m : null

    let d = new Date(date).getDate()
    d.toString().length === 1 ? d = "0"+d : null

    let h = new Date(date).getHours()
    h.toString().length === 1 ? h = "0"+h : null

    let mi = new Date(date).getMinutes()
    mi.toString().length === 1 ? mi = "0"+mi : null

    return `${y}-${m}-${d}T${h}:${mi}`
}