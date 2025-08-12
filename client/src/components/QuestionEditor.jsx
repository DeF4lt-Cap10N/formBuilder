import React from 'react';
import CategorizeEditor from './CategorizeEditor';
import ClozeEditor from './ClozeEditor';
import ComprehensionEditor from './ComprehensionEditor';

const QuestionEditor = ({ question, index, onChange, onRemove }) => {
  const renderSpecificEditor = () => {
    switch (question.type) {
      case 'categorize':
        return (
          <CategorizeEditor question={question} onChange={(q) => onChange(index, q)} />
        );
      case 'cloze':
        return (
          <ClozeEditor question={question} onChange={(q) => onChange(index, q)} />
        );
      case 'comprehension':
        return (
          <ComprehensionEditor question={question} onChange={(q) => onChange(index, q)} />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {index + 1}. {question.title}
        </h3>
        <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">
          &times; Remove
        </button>
      </div>
      <input
        type="text"
        placeholder="Question Title"
        value={question.title}
        onChange={(e) => onChange(index, {...question, title: e.target.value})}
        className="w-full text-lg p-2 border-b-2 mb-4 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={question.imageUrl || ''}
        onChange={(e) => onChange(index, {...question, imageUrl: e.target.value})}
        className="w-full text-sm p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {question.imageUrl && (
        <img src={question.imageUrl} alt="Question" className="mt-4 w-full h-48 object-cover rounded-lg" onError={(e) => e.target.src = 'https://placehold.co/600x400/FFF/000?text=Image+Not+Found'} />
      )}
      <div className="mt-4">
        {renderSpecificEditor()}
      </div>
    </div>
  );
};

export default QuestionEditor;
