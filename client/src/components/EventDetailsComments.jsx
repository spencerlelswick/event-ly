import { useState, useContext } from 'react';
import { createComment, deleteComment } from '../utilities/comments-service';
import { UserContext } from './App';
import { FaTrash } from 'react-icons/fa';

export default function EventDetailsComments({ event, setEvent }) {
  const currUser = useContext(UserContext);

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  function handleCommentChange(e) {
    const newComment = e.target.value;
    setComment(newComment);
  }

  async function newCommentHandler(e) {
    try {
      e.preventDefault();
      setLoading(true);
      if (comment.trim() === '') {
        return;
      }
      const data = {
        body: comment,
        createdBy: currUser.ID,
      };
      setComment('');
      const updatedEvent = await createComment(event._id, data);
      if (updatedEvent._id) {
        setEvent(updatedEvent);
        setLoading(false);
      } else {
        throw Error('Something went wrong with adding a comment.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCommentHandler(e, eId, cId) {
    try {
      e.preventDefault();
      const updatedEvent = await deleteComment(eId, cId);
      if (updatedEvent._id) {
        setEvent(updatedEvent);
      } else {
        throw Error('Something went wrong with removing a comment.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {currUser ? (
        <form onSubmit={newCommentHandler}>
          <div className='flex flex-row gap-1 my-5'>
            <input
              type='text'
              placeholder='Type a comment'
              value={comment}
              onChange={handleCommentChange}
              className='input input-bordered w-full input-primary'
            />
            <button
              className='btn btn-primary'
              type='Submit'
              disabled={comment.trim() === '' || loading}
            >
              Comment
            </button>
          </div>
        </form>
      ) : (
        <p>LOG IN TO ADD A COMMENT</p>
      )}

      {event.comments.length > 0 ? (
        <div className='flex flex-col-reverse'>
          {event.comments.map((c) => (
            <div className='flex flex-col justify-center relative top-1/3'>
              <div className='relative grid grid-cols-1 gap-4 p-4 mb-4 border rounded-lg bg-white shadow'>
                <div className='relative flex gap-4'>
                  <img
                    src={c.createdBy.picture}
                    className='relative rounded-lg top-0 -mb-4 bg-white border h-20 w-20'
                    alt={c.createdBy.name}
                  />
                  <div className='flex flex-col w-full'>
                    <div className='flex flex-col justify-between'>
                      <p className='relative text-xl whitespace-normal truncate overflow-hidden'>
                        {c.createdBy.name}
                      </p>
                      <span className='text-gray-300 text-sm'>
                        {c.createdAt.substring(0, 10)}{' '}
                        {c.createdAt.substring(11, 16)}
                      </span>
                      {currUser ? (
                        <span
                          onClick={(e) =>
                            deleteCommentHandler(e, event._id, c._id)
                          }
                          className='text-xl absolute right-2 top-2'
                          hidden={
                            currUser.ID !== event.createdBy._id &&
                            currUser.ID !== c.createdBy._id
                          }
                        >
                          <FaTrash className='text-neutral-300' />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Comments yet</div>
      )}
    </div>
  );
}
