import React, { useState } from 'react';

function Assessment({ onComplete, onCancel }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    eatingHabits: {},
    physicalActivity: {},
    bodyIndicators: {},
    sleepRoutine: {},
    substances: {},
    familyHistory: {}
  });

  const questions = [
    {
      id: 'vegetables',
      category: 'eatingHabits',
      question: 'How many servings of vegetables do you eat per day?',
      type: 'choice',
      options: [
        { value: 'none', label: '0 servings', emoji: '🚫' },
        { value: 'one', label: '1-2 servings', emoji: '🥗' },
        { value: 'three', label: '3-4 servings', emoji: '🥦' },
        { value: 'five', label: '5+ servings', emoji: '🌽' }
      ]
    },
    {
      id: 'processedFood',
      category: 'eatingHabits',
      question: 'How often do you eat processed or fast food?',
      type: 'choice',
      options: [
        { value: 'daily', label: 'Daily', emoji: '🍔' },
        { value: 'often', label: '3-5 times/week', emoji: '🍕' },
        { value: 'sometimes', label: '1-2 times/week', emoji: '🌮' },
        { value: 'rarely', label: 'Rarely/Never', emoji: '✅' }
      ]
    },
    {
      id: 'exercise',
      category: 'physicalActivity',
      question: 'How many minutes of exercise do you get per week?',
      type: 'choice',
      options: [
        { value: 'none', label: 'None', emoji: '🛋️' },
        { value: 'low', label: 'Less than 30 min', emoji: '🚶' },
        { value: 'moderate', label: '30-150 min', emoji: '🏃' },
        { value: 'high', label: '150+ min', emoji: '💪' }
      ]
    },
    {
      id: 'sitting',
      category: 'physicalActivity',
      question: 'How many hours per day do you spend sitting?',
      type: 'choice',
      options: [
        { value: 'low', label: 'Less than 4 hours', emoji: '🚶‍♂️' },
        { value: 'moderate', label: '4-8 hours', emoji: '💺' },
        { value: 'high', label: '8-12 hours', emoji: '🪑' },
        { value: 'very_high', label: 'More than 12 hours', emoji: '😴' }
      ]
    },
    {
      id: 'sleep',
      category: 'sleepRoutine',
      question: 'How many hours of sleep do you get per night?',
      type: 'choice',
      options: [
        { value: 'low', label: 'Less than 5 hours', emoji: '😫' },
        { value: 'moderate', label: '5-6 hours', emoji: '😪' },
        { value: 'good', label: '7-8 hours', emoji: '😊' },
        { value: 'high', label: 'More than 9 hours', emoji: '😴' }
      ]
    },
    {
      id: 'smoking',
      category: 'substances',
      question: 'Do you smoke or use tobacco products?',
      type: 'choice',
      options: [
        { value: 'never', label: 'Never', emoji: '🚭' },
        { value: 'former', label: 'Former smoker', emoji: '✅' },
        { value: 'occasional', label: 'Occasionally', emoji: '🚬' },
        { value: 'daily', label: 'Daily', emoji: '🔥' }
      ]
    },
    {
      id: 'age',
      category: 'bodyIndicators',
      question: 'What is your age?',
      type: 'choice',
      options: [
        { value: 'young', label: '18-29 years', emoji: '👶' },
        { value: 'adult', label: '30-44 years', emoji: '👤' },
        { value: 'middle', label: '45-59 years', emoji: '👨' },
        { value: 'senior', label: '60+ years', emoji: '👴' }
      ]
    },
    {
      id: 'gender',
      category: 'bodyIndicators',
      question: 'What is your biological sex?',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male', emoji: '♂️' },
        { value: 'female', label: 'Female', emoji: '♀️' },
        { value: 'other', label: 'Prefer not to say', emoji: '⚧' }
      ]
    },
    {
      id: 'height',
      category: 'bodyIndicators',
      question: 'What is your height?',
      type: 'choice',
      options: [
        { value: 'short', label: 'Under 5\'2" (157cm)', emoji: '📏' },
        { value: 'average', label: '5\'2" - 5\'10" (157-178cm)', emoji: '📐' },
        { value: 'tall', label: 'Over 5\'10" (178cm)', emoji: '📊' }
      ]
    },
    {
      id: 'weight',
      category: 'bodyIndicators',
      question: 'What is your current weight status?',
      type: 'choice',
      options: [
        { value: 'underweight', label: 'Underweight', emoji: '⬇️' },
        { value: 'normal', label: 'Normal weight', emoji: '✅' },
        { value: 'overweight', label: 'Overweight', emoji: '⬆️' },
        { value: 'obese', label: 'Significantly overweight', emoji: '🔺' }
      ]
    }
  ];

  const handleAnswer = (questionId, category, value) => {
    setAnswers(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [questionId]: value
      }
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.category][currentQuestion.id];
    
    // Check if current question is answered
    if (!currentAnswer) {
      alert('Please select an answer before continuing.');
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // If on first question, ask if they want to cancel
      if (window.confirm('Are you sure you want to exit the assessment? Your progress will be lost.')) {
        onCancel();
      }
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion.category][currentQuestion.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-teal-700 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  handleAnswer(currentQuestion.id, currentQuestion.category, option.value);
                }}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-md text-left ${
                  currentAnswer === option.value
                    ? 'border-teal-700 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{option.emoji}</span>
                  <span className="text-lg font-semibold text-slate-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white text-teal-700 border-2 border-teal-700 hover:bg-teal-50 rounded-lg font-semibold transition"
          >
            {currentStep === 0 ? '← Cancel' : '← Back'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              currentAnswer
                ? 'bg-teal-700 text-white hover:bg-teal-800'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {currentStep === questions.length - 1 ? 'See Results' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment;