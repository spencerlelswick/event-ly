import * as eventsAPI from './events-api'

export async function getEvents(){
    try {
        const data = await eventsAPI.index()
        return data
    }catch(err){
        return err
    }
}

export async function createEvent(newData){
    try {
        const data = await eventsAPI.create(newData)
        return data
    }catch(err){
        return err
    }
}

export async function showEvent(id){
    try{
       const data = await eventsAPI.show(id)
       return data
    }catch(err){
        return err
    }
}

export async function updateEvent(id, data){
    try{
       const resp = await eventAPI.update(id, data)
       return resp
    }catch(err){
        return err
    }
}

export async function deleteEvent(id){
    try{
       const data = await eventAPI.destroy(id)
       return data
    }catch(err){
        return err
    }
}