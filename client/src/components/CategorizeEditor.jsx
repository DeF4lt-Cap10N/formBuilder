import React from 'react';

const CategorizeEditor = ({ question, onChange }) => {
  const handleCategoryChange = (index, value) => {
    const newCategories = [...question.categorize.categories];
    newCategories[index] = value;
    onChange({ ...question, categorize: { ...question.categorize, categories: newCategories } });
  };
  const handleItemChange = (index, value) => {
    const newItems = [...question.categorize.items];
    newItems[index] = value;
    onChange({ ...question, categorize: { ...question.categorize, items: newItems } });
  };
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-700">Categories</h4>
        {question.categorize.categories.map((cat, index) => (
          <input
            key={index}
            type="text"
            value={cat}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
            placeholder={`Category ${index + 1}`}
          />
        ))}
      </div>
      <div>
        <h4 className="font-semibold text-gray-700">Items to Categorize</h4>
        {question.categorize.items.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
            placeholder={`Item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorizeEditor;
