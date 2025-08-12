import React, { useState, useEffect } from 'react';

const CategorizeFiller = ({ question, onChange }) => {
  const [unassignedItems, setUnassignedItems] = useState(question.categorize.items);
  const [categoriesWithItems, setCategoriesWithItems] = useState(
    question.categorize.categories.reduce((acc, cat) => ({ ...acc, [cat]: [] }), {})
  );

  useEffect(() => {
    onChange(categoriesWithItems);
  }, [categoriesWithItems]);

  const moveItem = (item, fromCategory, toCategory) => {
    if (fromCategory === 'unassigned') {
      setUnassignedItems(unassignedItems.filter(i => i !== item));
    } else {
      setCategoriesWithItems(prev => ({
        ...prev,
        [fromCategory]: prev[fromCategory].filter(i => i !== item)
      }));
    }
    if (toCategory !== 'unassigned') {
      setCategoriesWithItems(prev => ({
        ...prev,
        [toCategory]: [...prev[toCategory], item]
      }));
    } else {
      setUnassignedItems(prev => [...prev, item]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed">
        <h4 className="font-semibold text-gray-700 mb-2">Unassigned Items</h4>
        <div className="flex flex-wrap gap-2">
          {unassignedItems.map((item, index) => (
            <span key={index} className="bg-white p-2 rounded-full shadow-md text-sm cursor-pointer" onClick={() => moveItem(item, 'unassigned', '')}>
              {item}
            </span>
          ))}
        </div>
      </div>
      {question.categorize.categories.map((category, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg border-2 border-dashed">
          <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {categoriesWithItems[category].map((item, i) => (
              <span key={i} className="bg-white p-2 rounded-full shadow-md text-sm cursor-pointer" onClick={() => moveItem(item, category, 'unassigned')}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorizeFiller;
