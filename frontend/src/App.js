import React, { useState } from 'react';
import './App.css';
import Assessment from './components/Assessment';
import Results from './components/Results';
import Education from './components/Education';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [educationTopic, setEducationTopic] = useState(null);
  const [results, setResults] = useState(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setShowEducation(false);
    setEducationTopic(null);
    setResults(null);
  };

  const handleShowEducation = (topic = null) => {
    setShowEducation(true);
    setEducationTopic(topic);
    setShowAssessment(false);
    setResults(null);
  };

  const handleAssessmentComplete = (answers) => {
    console.log('Assessment completed:', answers);
    setResults(answers);
    setShowAssessment(false);
  };

  const handleCancelAssessment = () => {
    setShowAssessment(false);
  };

  const handleRestartAssessment = () => {
    setResults(null);
    setShowAssessment(true);
  };

  const handleBackToHome = () => {
    setShowAssessment(false);
    setShowEducation(false);
    setEducationTopic(null);
    setResults(null);
  };

  if (showAssessment) {
    return <Assessment onComplete={handleAssessmentComplete} onCancel={handleCancelAssessment} />;
  }

  if (showEducation) {
    return <Education onBack={handleBackToHome} onStartAssessment={handleStartAssessment} initialTopic={educationTopic} />;
  }

  if (results) {
    return <Results answers={results} onRestart={handleRestartAssessment} onLearnMore={handleShowEducation} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <nav className="bg-white shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">LifeScope</span>
            </div>
            
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            See how your lifestyle shapes
            <span className="text-teal-700"> your future health</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Understand how your daily habits affect long-term health.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={handleStartAssessment}
              className="px-8 py-4 bg-teal-700 text-white rounded-lg font-semibold text-lg hover:bg-teal-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Check Your Lifestyle Risk
            </button>
            <button 
              onClick={() => handleShowEducation()}
              className="px-8 py-4 bg-white text-teal-700 border-2 border-teal-700 rounded-lg font-semibold text-lg hover:bg-teal-50 transition"
            >
              Learn More
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <button 
              onClick={() => handleShowEducation('heart')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-left"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Heart Health</h3>
              <p className="text-slate-600 text-sm">Assess your cardiovascular risk</p>
            </button>

            <button 
              onClick={() => handleShowEducation('diabetes')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-left"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🩺</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Diabetes Risk</h3>
              <p className="text-slate-600 text-sm">Understand your type 2 diabetes risk</p>
            </button>

            <button 
              onClick={() => handleShowEducation('kidney')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-left"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🫘</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Kidney Health</h3>
              <p className="text-slate-600 text-sm">Learn how habits affect kidney function</p>
            </button>

            <button 
              onClick={() => handleShowEducation('obesity')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-left"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Weight Health</h3>
              <p className="text-slate-600 text-sm">Get insights on healthy weight management</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;