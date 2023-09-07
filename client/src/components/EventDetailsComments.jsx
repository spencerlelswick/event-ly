import { useState, useContext } from "react"
import { createComment, deleteComment } from "../utilities/comments-service"
import { UserContext } from "./App"

export default function EventDetailsComments({event, setEvent}) {
    const currUser = useContext(UserContext) 
    
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    function handleCommentChange(e) {
        const newComment = e.target.value
        setComment(newComment)
    }

    async function newCommentHandler(e){
        try{
            e.preventDefault()
            setLoading(true)
            if (comment.trim() === ""){return}
            const data = {
                body: comment,
                createdBy: currUser.ID
            }
            setComment("")
            const updatedEvent = await createComment(event._id, data)
            if (updatedEvent._id){
                setEvent(updatedEvent)
                setLoading(false)
            }else {
                throw Error("Something went wrong with adding a comment.")
            }
        }catch(err){
            console.log(err)
        }
    }

    async function deleteCommentHandler(e, eId, cId){
        try{
            e.preventDefault()
            const updatedEvent = await deleteComment(eId,cId)
            if (updatedEvent._id){
                setEvent(updatedEvent)
            }else {
                throw Error("Something went wrong with removing a comment.")
            }
        }catch(err){
            console.log(err)
         }
    }

    return(
        <div>
            Comments

            {event.comments.length > 0  ? (
                <>
                {event.comments.map((c)=>(
                    <div key={c._id}  className="flex flex-row align-middle items-center">

                        <img src={c.createdBy.picture} alt={c.createdBy.name} className="rounded-full w-10"/>
                        {c.createdBy.name}: {c.body}
                        <span className="text-sm ml-5">
                        {c.createdAt.substring(0,10)} {c.createdAt.substring(11,16)}
                        </span>

                        {currUser ? (
                            <button onClick={(e)=>deleteCommentHandler(e, event._id, c._id)} className="btn-xs btn-secondary"
                                hidden={ currUser.ID !== c.createdBy._id}>
                                X
                            </button>
                        ) : null
                        }
                        
                    </div>
                ))}
               </>
            ) : (
                <div>No Comments yet</div>
            )}

            {currUser ? (
                <form onSubmit={newCommentHandler} >
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
                        disabled={comment.trim() === "" || loading}
                        >
                            Comment
                        </button>
                    </div>
                </form>
            ):(
                <p>LOG IN TO ADD A COMMENT</p>
            )}

        </div>
    )
}