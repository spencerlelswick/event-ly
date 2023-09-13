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

export function dateTimePicker(date){
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

export function dateTimePickerToday(){
    return dateTimePicker(new Date())
}

export function datePickerAddMonth(date,num){
    const y = new Date(date).getFullYear()

    let m = new Date(date).getMonth()
    m = m + 1 + num
    m.toString().length === 1 ? m = "0"+m : null

    let d = new Date(date).getDate()
    d.toString().length === 1 ? d = "0"+d : null

    return `${y}-${m}-${d}`
}


export function datePickerAddYear(date,num){
    let y = new Date(date).getFullYear()
    y = y + num
    
    let m = new Date(date).getMonth()
    m = m + 1
    m.toString().length === 1 ? m = "0"+m : null

    let d = new Date(date).getDate()
    d.toString().length === 1 ? d = "0"+d : null

    return `${y}-${m}-${d}`
}

export function datePickerToday(){
    return datePickerAddMonth(new Date(),0)
}