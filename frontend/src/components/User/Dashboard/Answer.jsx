import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; // Import axios

const Answer = ({ questionId }) => { // Assume questionId is passed as a prop
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("description is: ", description);

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Description cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:7777/api/answer/add-answer/${questionId}`,
        {
          content: description, // Use 'content' as the field name (adjust based on API)
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add token if required
        }
      );
      console.log('Answer created:', response.data);
      setDescription(''); // Clear the editor on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create answer');
      console.error('Error creating answer:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-2'>
      <div className="">
        <label className="block text-sm font-medium text-gray-700">Add your Answer</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mt-1 h-[120px] pb-[40px]"
          placeholder="Enter your description"
        />
      </div>
      <div className='w-full flex items-center justify-end'>
        <button
          className='bg-gray-600 text-white px-4 py-1 rounded-full mt-2'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Answer'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Answer;