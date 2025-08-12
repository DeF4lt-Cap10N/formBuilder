import React, { useState, useEffect } from 'react';

const ComprehensionFiller = ({ question, onChange }) => {
  const [userAnswers, setUserAnswers] = useState({});
  
  useEffect(() => {
    onChange(userAnswers);
  }, [userAnswers]);

  const handleInputChange = (questionIndex, e) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: e.target.value
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-800 leading-relaxed font-serif">{question.comprehension.passage}</p>
      </div>
      {question.comprehension.questions.map((subQ, index) => (
        <div key={index}>
          <p className="font-semibold text-gray-700 mb-2">{index + 1}. {subQ.questionText}</p>
          <input
            type="text"
            onChange={(e) => handleInputChange(index, e)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            placeholder="Your answer..."
          />
        </div>
      ))}
    </div>
  );
};

export default ComprehensionFiller;
