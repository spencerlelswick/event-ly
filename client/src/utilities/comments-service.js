import * as commentsAPI from './comments-api'

export async function createComment(eId, data){
    try{
       const resp = await commentsAPI.create(eId, data)
       return resp
    }catch(err){
        return err
    }
}

export async function deleteComment(eId,cId){
    try{
       const data = await commentsAPI.destroy(eId,cId)
       return data
    }catch(err){
        return err
    }
}