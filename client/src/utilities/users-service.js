import * as usersAPI from './users-api'

export async function getAllUsers(){
    try {
        const data = await usersAPI.index()
        return data
    }catch(err){
        return err
    }
}

export async function showUser(id){
    try{
       const data = await usersAPI.show(id)
       return data
    }catch(err){
        return err
    }
}

export async function updateUser(id, data){
    try{
       const resp = await usersAPI.update(id, data)
       return resp
    }catch(err){
        return err
    }
}

export async function createUser(data){
    try{
       const resp = await usersAPI.create(data)
       return resp
    }catch(err){
        return err
    }
}