import React from 'react';

const ClozeEditor = ({ question, onChange }) => {
  const handlePassageChange = (e) => {
    const newPassage = e.target.value;
    const blanks = (newPassage.match(/\[\[(.*?)\]\]/g) || []).map(b => b.slice(2, -2));
    onChange({ ...question, cloze: { passage: newPassage, blanks } });
  };
  return (
    <div>
      <h4 className="font-semibold text-gray-700">Cloze Passage</h4>
      <textarea
        value={question.cloze.passage}
        onChange={handlePassageChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 h-32"
        placeholder="Type your passage here. Use double brackets to indicate a blank, e.g., The sky is [[blue]]."
      ></textarea>
    </div>
  );
};

export default ClozeEditor;
