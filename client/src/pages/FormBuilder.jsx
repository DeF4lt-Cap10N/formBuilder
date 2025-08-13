import React, { useState, useEffect } from 'react';
import QuestionEditor from '../components/QuestionEditor';

const API_BASE_URL = 'https://formbuilder-hs9k.onrender.com/api/forms';

const FormBuilder = ({ formId, setCurrentPage }) => {
  const [formTitle, setFormTitle] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isNewForm, setIsNewForm] = useState(!formId);

  useEffect(() => {
    if (!isNewForm && formId) {
      const fetchForm = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/${formId}`);
          if (!response.ok) throw new Error('Failed to fetch form for editing.');
          const data = await response.json();
          setFormTitle(data.title);
          setHeaderImage(data.headerImageUrl || '');
          setQuestions(data.questions);
        } catch (err) {
          console.error('Error fetching form:', err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchForm();
    }
  }, [formId, isNewForm]);

  const addQuestion = (type) => {
    let newQuestion;
    switch (type) {
      case 'categorize':
        // Corrected: The categorize data is now nested inside the 'categorize' key.
        newQuestion = {
          type,
          title: 'New Categorize Question',
          categorize: { categories: ['Category A', 'Category B'], items: ['Item 1', 'Item 2'] }
        };
        break;
      case 'cloze':
        newQuestion = { type, title: 'New Cloze Question', cloze: { passage: 'This is a sample sentence with a [[missing]] word.', blanks: ['missing'] } };
        break;
      case 'comprehension':
        newQuestion = { type, title: 'New Comprehension Question', comprehension: { passage: 'A long passage goes here...', questions: [{ questionText: 'What is the main idea?', options: ['A', 'B', 'C'], answer: 'A' }] } };
        break;
      default:
        return;
    }
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveMessage('');
    const formToSave = {
      title: formTitle || 'Untitled Form',
      headerImageUrl: headerImage,
      questions,
    };

    try {
      let response;
      if (isNewForm) {
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formToSave),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/${formId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formToSave),
        });
      }

      if (!response.ok) throw new Error('Failed to save form.');
      setSaveMessage('Form saved successfully!');
      if (isNewForm) {
        const savedForm = await response.json();
        setCurrentPage('home');
      }
    } catch (err) {
      setSaveMessage(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          {isNewForm ? 'Create a New Form' : 'Edit Form'}
        </h1>
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
        >
          &larr; Back to Home
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <input 
          type="text"
          className="w-full text-2xl font-bold p-2 border-b-2 mb-4 focus:outline-none"
          placeholder="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Header Image URL (optional)"
          value={headerImage}
          onChange={(e) => setHeaderImage(e.target.value)}
          className="w-full text-sm p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {headerImage && (
          <img src={headerImage} alt="Form Header" className="mt-4 w-full h-48 object-cover rounded-lg" onError={(e) => e.target.src = 'https://placehold.co/1200x400/FFF/000?text=Header+Image+Not+Found'} />
        )}
      </div>

      {questions.map((q, index) => (
        <QuestionEditor
          key={index}
          question={q}
          index={index}
          onChange={handleQuestionChange}
          onRemove={removeQuestion}
        />
      ))}

      <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gray-100 rounded-xl justify-center shadow-inner">
        <button onClick={() => addQuestion('categorize')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
          + Categorize
        </button>
        <button onClick={() => addQuestion('cloze')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
          + Cloze
        </button>
        <button onClick={() => addQuestion('comprehension')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
          + Comprehension
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-xl"
        >
          {isLoading ? 'Saving...' : 'Save Form'}
        </button>
      </div>

      {saveMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg bg-green-500 text-white font-bold shadow-lg transition-transform duration-300 transform scale-100">
          {saveMessage}
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
