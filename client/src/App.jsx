import React, { useState } from "react";
import Home from "./pages/Home";
import FormBuilder from "./pages/FormBuilder";
import LiveForm from "./pages/LiveForm";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [formId, setFormId] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} setFormId={setFormId} />;
      case "formBuilder":
        return <FormBuilder formId={formId} setCurrentPage={setCurrentPage} />;
      case "liveForm":
        return <LiveForm formId={formId} setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setFormId={setFormId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <header className="bg-white shadow-sm p-4 md:p-6 mb-4 md:mb-8 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Form Builder</h2>
          <button
            onClick={() => {
              setCurrentPage("home");
              setFormId(null);
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full transition-colors duration-200"
          >
            Home
          </button>
        </div>
      </header>
      {renderPage()}
    </div>
  );
};

export default App;
