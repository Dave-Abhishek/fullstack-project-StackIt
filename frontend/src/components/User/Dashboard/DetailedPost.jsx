import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Replies from './Replies';
import { FaRegComment } from 'react-icons/fa';
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from 'react-icons/hi2';
import { IoIosShareAlt } from "react-icons/io";
import Answer from './Answer';
import axios from 'axios';

const DetailedPost = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:7777/api/question/get-question-by-id/${id}`);
      setQuestionData(res.data);
    } catch (err) {
      console.error('Error fetching question:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (type) => {
    try {
      const res = await axios.put(`http://localhost:7777/api/question/vote-question/${type}/${id}`);
      // optimistic update
      setQuestionData((prev) => ({
        ...prev,
        upvotes: type === 'upvote' ? (prev.upvotes || 0) + 1 : prev.upvotes,
        downvotes: type === 'downvote' ? (prev.downvotes || 0) + 1 : prev.downvotes,
      }));
    } catch (error) {
      console.error(`${type} error:`, error);
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading question...</div>;
  if (!questionData) return <div className="text-center mt-10 text-red-500">Question not found.</div>;

  return (
    <div className='flex flex-col h-fit w-full overflow-y-auto px-32'>
      {/* Breadcrumbs */}
      <div className='w-full text-left flex items-center gap-2 mt-2'>
        <a href="/market-place" className='hover:text-blue-400 transition-all duration-200'>Questions</a>
        <p>{">"}</p>
        <a href={`/question/${id}`} className='hover:text-blue-400 transition-all duration-200'>{id}</a>
      </div>

      {/* Post Body */}
      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-col gap-1'>
          {/* User Info */}
          <div className='flex items-center gap-2'>
            <img
              src={questionData.userAvatar || "https://i.pinimg.com/736x/d5/2e/06/d52e06fe2267b9bc789ee7a741cae4c2.jpg"}
              className='h-10 w-10 object-cover rounded-full border'
              alt="User Avatar"
            />
            <div className='flex flex-col text-xs'>
              <p>{questionData.question.username || 'Unknown User'}</p>
              <p>{questionData.createdAt ? new Date(questionData.createdAt).toDateString() : 'Just now'}</p>
            </div>
          </div>

          {/* Question Title & Description */}
          <p className='text-2xl font-semibold text-gray-700 mt-2'>{questionData.question.title}</p>
          <div
            className='text-md font-semibold text-gray-700'
            dangerouslySetInnerHTML={{ __html: questionData.question.description }}
          />

          {/* Metadata Buttons */}
          <div className="flex items-center gap-4 mt-3">
            <button className="cursor-pointer text-sm text-gray-700 flex items-center justify-center gap-1 px-2 py-0.5 bg-gray-300 rounded-full">
              <FaRegComment /> {questionData.commentCount || 0}
            </button>

            <div className="flex items-center justify-center gap-1 px-2 py-0.5 bg-gray-300 rounded-full">
              <button
                onClick={() => handleVote('upvote')}
                className="text-sm text-gray-700 flex items-center gap-1 hover:text-blue-500 transition-all duration-200"
              >
                <HiMiniHandThumbUp /> {questionData.upvotes || 0}
              </button>
              <button
                onClick={() => handleVote('downvote')}
                className="text-sm text-gray-700 px-2 hover:text-red-500 transition-all duration-200"
              >
                <HiMiniHandThumbDown />
              </button>
            </div>

            <div className='px-2 py-0.5 bg-gray-300 rounded-full'>
              <p className="text-sm text-gray-700 flex items-center justify-center gap-1 ">
                <IoIosShareAlt /> Share
              </p>
            </div>
          </div>
        </div>

        {/* Answer box */}
        <Answer questionId={id}/>

        {/* Replies */}
        <Replies id={id} />
      </div>
    </div>
  );
};

export default DetailedPost;
