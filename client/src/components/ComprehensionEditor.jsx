import React from 'react';

const ComprehensionEditor = ({ question, onChange }) => {
  const handlePassageChange = (e) => {
    onChange({ ...question, comprehension: { ...question.comprehension, passage: e.target.value } });
  };
  const handleSubQuestionChange = (index, value) => {
    const newSubQuestions = [...question.comprehension.questions];
    newSubQuestions[index].questionText = value;
    onChange({ ...question, comprehension: { ...question.comprehension, questions: newSubQuestions } });
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-700">Comprehension Passage</h4>
        <textarea
          value={question.comprehension.passage}
          onChange={handlePassageChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 h-32"
          placeholder="Enter the comprehension passage here..."
        ></textarea>
      </div>
      <div>
        <h4 className="font-semibold text-gray-700">Sub-Questions</h4>
        {question.comprehension.questions.map((q, index) => (
          <input
            key={index}
            type="text"
            value={q.questionText}
            onChange={(e) => handleSubQuestionChange(index, e.target.value)}
            className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-purple-500"
            placeholder={`Question ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ComprehensionEditor;
