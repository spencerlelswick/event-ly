import { useState } from "react"
import { createComment, deleteComment } from "../utilities/comments-service"

export default function EventDetailsComments({event, retrieveData}) {

    const [comment, setComment] = useState("")

    function handleCommentChange(e) {
        const newComment = e.target.value
        setComment(newComment)
    }

    async function newCommentHandler(e){
        e.preventDefault()
        if (comment.trim() === ""){return}
        const data = {body: comment}
        await createComment(event._id, data)
        setComment("")
        retrieveData()
    }

    async function deleteCommentHandler(e, eId, cId){
        e.preventDefault()
        await deleteComment(eId,cId)
        retrieveData()
    }

    return(
        <div>
            Comments
            {event.comments.length  ? (
                <>
                {event.comments.map((c)=>(
                    <div key={c._id}>
                        <button onClick={(e)=>deleteCommentHandler(e, event._id, c._id)} className="btn-xs btn-secondary ">
                        X
                        </button>
                        {c.username}: {c.body}
                        <span className="text-sm ml-5">
                         {c.createdAt.substring(0,10)} {c.createdAt.substring(11,16)}
                        </span>
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
                placeholder="Type a comment"
                value={comment}
                onChange={handleCommentChange}
                className='input input-bordered w-full max-w-xs input-primary'
                />
                <div>
                    <button className="btn btn-primary w-full max-w-xs" type="Submit"
                    disabled={comment.trim() === ""}
                    >
                        Comment
                    </button>
                </div>
            </form>
        </div>
    )
}