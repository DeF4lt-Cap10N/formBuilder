import React, { useState, useEffect } from 'react';

const ClozeFiller = ({ question, onChange }) => {
  const [userAnswers, setUserAnswers] = useState({});
  
  useEffect(() => {
    onChange(userAnswers);
  }, [userAnswers]);

  const handleInputChange = (blankWord, e) => {
    setUserAnswers(prev => ({
      ...prev,
      [blankWord]: e.target.value
    }));
  };
  
  const renderPassage = () => {
    const parts = question.cloze.passage.split(/(\[\[.*?\]\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[[')) {
        const blankWord = part.slice(2, -2);
        return (
          <input
            key={index}
            type="text"
            className="w-24 p-1 border-b-2 text-center mx-1 focus:outline-none focus:border-green-500"
            placeholder="______"
            onChange={(e) => handleInputChange(blankWord, e)}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <p className="text-lg leading-relaxed">{renderPassage()}</p>
    </div>
  );
};

export default ClozeFiller;
