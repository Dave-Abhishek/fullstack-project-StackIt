import { FaRegComment } from "react-icons/fa";
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const PostNew = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[85%] gap-1">
      {posts.map((post, index) => (
        <div key={index} className="rounded bg-gray-100 flex flex-col items-start justify-center px-10 py-2">
          <p className="">{post.userName}</p>
          <p className="text-[#714B67] text-xl font-semibold">{post.question}</p>
          <div
            className="text-gray-600 text-start text-sm"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <div className="flex space-x-2 mt-2">
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="bg-gray-200 text-[#714B67] rounded-full px-2 py-0.5 text-xs">
                # {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="cursor-pointer mt-1 text-sm text-gray-700 flex items-center justify-center gap-1 px-2 py-0.5 bg-gray-300 rounded-full"
              onClick={() => navigate(`/question/${post._id}`)}
            >
              <FaRegComment />{post.answer}
            </button>
            <div className="flex items-center justify-center gap-1">
              <p className="mt-1 text-sm text-gray-700 flex items-center justify-center gap-1 px-2 py-0.5 bg-gray-300 rounded-full">
                <HiMiniHandThumbUp />{post.likes}
              </p>
              <p className="mt-1 text-sm text-gray-700 px-2 py-1 bg-gray-300 rounded-full">
                <HiMiniHandThumbDown />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostNew;