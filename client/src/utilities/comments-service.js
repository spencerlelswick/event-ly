import * as commentsAPI from './comments-api'

export async function createComment(id, data){
    try{
       const resp = await commentsAPI.create(id, data)
       return resp
    }catch(err){
        return err
    }
}