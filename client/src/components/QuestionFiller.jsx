import React from 'react';
import CategorizeFiller from './CategorizeFiller';
import ClozeFiller from './ClozeFiller';
import ComprehensionFiller from './ComprehensionFiller';

const QuestionFiller = ({ question, answer, onChange }) => {
  const renderFiller = () => {
    switch (question.type) {
      case 'categorize':
        return <CategorizeFiller question={question} answer={answer} onChange={onChange} />;
      case 'cloze':
        return <ClozeFiller question={question} answer={answer} onChange={onChange} />;
      case 'comprehension':
        return <ComprehensionFiller question={question} answer={answer} onChange={onChange} />;
      default:
        return null;
    }
  };
  return <div className="mt-4">{renderFiller()}</div>;
};

export default QuestionFiller;
