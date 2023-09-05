import { useState,useEffect } from "react"
import { createComment } from "../utilities/comments-service"

export default function EventDetailsComments({comments,  eventId, retrieveData}) {

    const [comment, setComment] = useState("")

    function handleCommentChange(e) {
        const newComment = e.target.value
        setComment(newComment)
    }

    async function newCommentHandler(e){
        e.preventDefault()
        const data = {body: comment}
        await createComment(eventId, data)
        setComment("")
        retrieveData()
    }



    return(
        <div>
            Comments
            {comments.length  ? (
                <>
                {comments.map((c)=>(
                    <div key={c._id}>
                        <button onClick={()=>deleteCommentHandler(c._id)}>X</button>
                        {c.username}: {c.body}
                    </div>
                ))}
               </>
            ) : (
                <div>No Comments yet</div>
            )}
            <form onSubmit={newCommentHandler}>
                <label className='label'>
                <span className='label-text'>Enter a comment:</span>
                </label>
                <input
                type='text'
                value={comment}
                onChange={handleCommentChange}
                className='input input-bordered w-full max-w-xs input-primary'
                />

                <button className="btn btn-primary w-full max-w-xs" type="Submit">Comment</button>
            </form>
        </div>

    )
}