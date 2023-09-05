import { useState } from "react"


export default function EventDetailsComments({comments, setComments}) {

    const [comment, setComment] = useState("")

    function handleCommentChange(e) {
        const newComment = e.target.value
        setComment(newComment)
    }

    function handleCommentSubmit(e){
        e.preventDefault()
        console.log(e)
    }

    return(

        <div>
            Comments
            { comments.length  ? (


                <div>{comments[0].username}:{comments[0].body}</div>


            ) : (
                <div>No Comments yet</div>
            )}
            <form onSubmit={handleCommentSubmit}>
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