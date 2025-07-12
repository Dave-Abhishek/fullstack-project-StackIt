import React, { useState, useEffect } from 'react';
import PostNew from '../../components/User/Dashboard/PostNew';

const Window = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3; // Group size of 3 posts per page

  // Fetch posts from the backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:7777/api/question/get-all-questions'); // Replace with your API endpoint
        const data = await response.json();
        setPosts(data.questions);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Calculate total pages and paginated posts
  console.log(posts)
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = [];
  for (let i = 0; i < posts.length; i += postsPerPage) {
    paginatedPosts.push(posts.slice(i, i + postsPerPage));
  }
  console.log(paginatedPosts)

  return (
    <div className='w-screen text-center h-full'>
      <div className='text-blue-400 w-full text-left px-16'>
        <a href="http://localhost:5173/market-place">Questions</a>
      </div>
      <div className='flex flex-col items-center justify-center w-full'>
        {paginatedPosts.length > 0 ? (
          <PostNew posts={paginatedPosts[currentPage] || []} />
        ) : (
          <p>Loading posts...</p>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2 text-lg w-full">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`px-3 py-1 rounded ${
              index === currentPage ? 'bg-[#714B67] text-white' : 'bg-gray-200 text-gray-700'
            }`}
            disabled={paginatedPosts.length === 0}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Window;