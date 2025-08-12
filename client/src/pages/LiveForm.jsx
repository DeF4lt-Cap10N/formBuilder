import React, { useState, useEffect } from 'react';
import QuestionFiller from '../components/QuestionFiller';

const API_BASE_URL = 'http://localhost:5000/api/forms';

const LiveForm = ({ formId, setCurrentPage }) => {
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/${formId}`);
        if (!response.ok) throw new Error('Form not found.');
        const data = await response.json();
        setForm(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (formId) {
      fetchForm();
    }
  }, [formId]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId: form._id, answers }),
      });
      if (!response.ok) throw new Error('Failed to submit form.');
      setSubmitMessage('Your response has been submitted successfully!');
      setAnswers({});
    } catch (err) {
      setSubmitMessage(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center text-gray-500 p-8">Loading form...</p>;
  if (error) return <p className="text-center text-red-500 p-8">Error: {error}</p>;
  if (!form) return <p className="text-center text-gray-500 p-8">Form data is missing.</p>;
  
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">{form.title || 'Untitled Form'}</h1>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
          >
            &larr; Back to Home
          </button>
        </div>
        {form.headerImageUrl && (
          <img src={form.headerImageUrl} alt="Form Header" className="mt-4 mb-8 w-full rounded-xl object-cover h-64" onError={(e) => e.target.style.display = 'none'} />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {form.questions.map((question, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{index + 1}. {question.title}</h2>
              {question.imageUrl && (
                <img src={question.imageUrl} alt="Question" className="my-4 w-full rounded-lg h-48 object-cover" onError={(e) => e.target.style.display = 'none'} />
              )}
              <QuestionFiller
                question={question}
                answer={answers[index]}
                onChange={(answer) => handleAnswerChange(index, answer)}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-4 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-xl"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
          {submitMessage && (
            <div className="text-center text-green-600 font-bold mt-4">
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LiveForm;
