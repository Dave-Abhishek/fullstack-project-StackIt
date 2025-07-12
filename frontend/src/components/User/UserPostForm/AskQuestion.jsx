import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; // Import axios

const AskQuestion = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState(''); // Input for new tags
  const [tags, setTags] = useState([]); // Array to store tags
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:7777/api/question/add-question', {
        title,
        description,
        tags,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add token if required
      });
      console.log('Question created:', response.data);
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create question');
      console.error('Error creating question:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding tags when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      const newTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag && !tags.includes(tag));
      setTags([...tags, ...newTags]);
      setTagsInput(''); // Clear input after adding
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[1000px]">
        <h2 className="text-xl font-bold mb-4">Ask Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="mt-1 border rounded h-[200px] overflow-y-scroll"
              placeholder="Enter your description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Type tags and press Enter (e.g., tag1, tag2)"
            />
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-0.5 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#714B67] text-white rounded hover:bg-[#5a3b56]"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;