import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { FaRegComment } from 'react-icons/fa';
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from 'react-icons/hi2';

const Replies = ({ id }) => {
  const [replies, setReplies] = useState([]);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [comments, setComments] = useState({}); // Object to store comments for each reply
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch replies from the API when the component mounts or id changes
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:7777/api/answer/get-answers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch replies');
        const data = await response.json();
        setReplies(data.answers || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReplies();
  }, [id]);

  // Fetch comments when a reply is expanded
  useEffect(() => {
    const fetchComments = async (replyId) => {
      if (expandedReplies[replyId]) {
        try {
          const response = await fetch(`http://localhost:7777/api/comment/get-all-comments-for-answerId/${replyId}`);
          if (!response.ok) throw new Error('Failed to fetch comments');
          const data = await response.json();
          setComments(prev => ({
            ...prev,
            [replyId]: data.allCommentsForAnswerId || [],
          }));
        } catch (err) {
          console.error(`Error fetching comments for reply ${replyId}:`, err);
        }
      }
    };

    Object.keys(expandedReplies).forEach(replyId => {
      if (expandedReplies[replyId] && !comments[replyId]) {
        fetchComments(replyId);
      }
    });
  }, [expandedReplies, comments]);

  console.log("Answers: ", comments);

  const toggleExpand = (replyId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  // Handle vote for replies
  const handleReplyVote = async (replyId, type) => {
    try {
      const response = await axios.put(`http://localhost:7777/api/answer/vote-answer/${type}/${replyId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add token if required
      });
      // Optimistic update
      setReplies(prevReplies =>
        prevReplies.map(reply =>
          reply._id === replyId
            ? {
                ...reply,
                upVotes: type === 'upvote' ? (reply.upVotes || 0) + 1 : reply.upVotes,
                downVotes: type === 'downvote' ? (reply.downVotes || 0) + 1 : reply.downVotes,
              }
            : reply
        )
      );
    } catch (error) {
      console.error(`${type} error for reply ${replyId}:`, error);
      // Rollback optimistic update if needed
      setReplies(prevReplies => [...prevReplies]); // Re-fetch or reset if API fails
    }
  };

  // Handle vote for comments
  const handleCommentVote = async (commentId, type) => {
    try {
      const response = await axios.put(`http://localhost:7777/api/comment/vote-comment/${type}/${commentId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add token if required
      });
      // Optimistic update
      setComments(prevComments => {
        const updatedComments = { ...prevComments };
        Object.keys(updatedComments).forEach(replyId => {
          updatedComments[replyId] = updatedComments[replyId].map(comment =>
            comment._id === commentId
              ? {
                  ...comment,
                  upVotedBy: type === 'upvote' ? [...(comment.upVotedBy || []), { /* user info if needed */ }] : comment.upVotedBy,
                  // Note: downVotes might need a separate field; adjust based on API
                }
              : comment
          );
        });
        return updatedComments;
      });
    } catch (error) {
      console.error(`${type} error for comment ${commentId}:`, error);
      // Rollback optimistic update if needed
      setComments(prevComments => ({ ...prevComments })); // Re-fetch or reset if API fails
    }
  };

  if (loading) return <p>Loading replies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4 pl-10">
      {replies.length > 0 ? (
        replies.map((reply) => (
          <div key={reply._id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://i.pinimg.com/736x/d5/2e/06/d52e06fe2267b9bc789ee7a741cae4c2.jpg"
                className="h-8 w-8 object-cover rounded-full border"
                alt=""
              />
              <div className="flex flex-col text-xs">
                <p>{reply.user.username}</p>
                {/* <p>{reply.createdAt ? new Date(reply.createdAt).toDateString() : ''}</p> */}
              </div>
            </div>
            <div
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ __html: reply.content }}
            />
            <div className="flex items-center gap-4 mt-2">
              <button
                className="cursor-pointer text-sm text-gray-700 flex items-center justify-center gap-1 px-2 py-0.5 bg-gray-300 rounded-full"
                onClick={() => toggleExpand(reply._id)}
              >
                <FaRegComment /> {comments[reply._id]?.length || 0}
              </button>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-300 rounded-full">
                <p
                  className="text-sm text-gray-700 flex items-center justify-center gap-1 cursor-pointer"
                  onClick={() => handleReplyVote(reply._id, 'upvote')}
                >
                  <HiMiniHandThumbUp className="hover:text-blue-500 transition-all duration-200" /> {reply.upVotes || 0}
                </p>
                <p
                  className="text-sm text-gray-700 px-2 cursor-pointer"
                  onClick={() => handleReplyVote(reply._id, 'downvote')}
                >
                  <HiMiniHandThumbDown className="hover:text-red-500 transition-all duration-200" />
                </p>
              </div>
            </div>
            {expandedReplies[reply._id] && comments[reply._id]?.length > 0 && (
              <div className="ml-8 mt-2 flex flex-col gap-2">
                {comments[reply._id].map((comment) => (
                  <div key={comment._id} className="bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://i.pinimg.com/736x/d5/2e/06/d52e06fe2267b9bc789ee7a741cae4c2.jpg"
                        className="h-6 w-6 object-cover rounded-full border"
                        alt=""
                      />
                      <div className="flex flex-col text-xs">
                        <p>{comment.userId.username}</p>
                        {/* <p>{comment.createdAt ? new Date(comment.createdAt).toDateString() : '1 day ago'}</p> */}
                      </div>
                    </div>
                    <div
                      className="text-gray-600 text-xs mt-1"
                      dangerouslySetInnerHTML={{ __html: comment.comment }}
                    />
                    <div className="flex items-center gap-1 mt-1">
                      <p
                        className="text-xs text-gray-500 cursor-pointer"
                        onClick={() => handleCommentVote(comment._id, 'upvote')}
                      >
                        <HiMiniHandThumbUp className="hover:text-blue-500 transition-all duration-200" /> {comment.upVotedBy?.length || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No replies yet.</p>
      )}
    </div>
  );
};

export default Replies;