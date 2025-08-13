import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://formbuilder-hs9k.onrender.com/api/forms';

const Home = ({ setCurrentPage, setFormId }) => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch forms.');
        const data = await response.json();
        setForms(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchForms();
  }, []);

  const handleLiveFormClick = (id) => {
    setFormId(id);
    setCurrentPage('liveForm');
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Your Forms</h1>
        <button
          onClick={() => {
            setFormId(null);
            setCurrentPage('formBuilder');
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
        >
          + Create New Form
        </button>
      </div>
      
      {isLoading && <p className="text-center text-gray-500">Loading forms...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      
      {!isLoading && forms.length === 0 && (
        <p className="text-center text-gray-500 mt-10">You haven't created any forms yet. Click the button above to start!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map(form => (
          <div key={form._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{form.title || 'Untitled Form'}</h2>
              <p className="text-gray-500 text-sm">Created: {new Date(form.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleLiveFormClick(form._id)}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                View Live Form
              </button>
              <button
                onClick={() => { setFormId(form._id); setCurrentPage('formBuilder'); }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
