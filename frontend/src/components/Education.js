import React, { useState } from 'react';

function Education({ onBack, onStartAssessment, initialTopic }) {
  const [selectedTopic, setSelectedTopic] = useState(initialTopic || null);

  const topics = {
    heart: {
      title: 'Heart Disease',
      emoji: '❤️',
      color: 'red',
      definition: 'Heart disease refers to several types of heart conditions, including coronary artery disease, which can lead to heart attacks.',
      whyItMatters: 'Heart disease is the leading cause of death globally. The good news? Many risk factors are controllable through lifestyle choices.',
      lifestyleImpact: 'Your daily habits significantly affect your heart health. Diet, exercise, stress management, and avoiding smoking are crucial.',
      riskFactors: [
        'High blood pressure',
        'High cholesterol',
        'Smoking and tobacco use',
        'Lack of physical activity',
        'Poor diet (high in processed foods, saturated fats)',
        'Being overweight or obese',
        'Excessive alcohol consumption',
        'Chronic stress',
        'Family history of heart disease'
      ],
      healthyHabits: [
        'Eat 5+ servings of fruits and vegetables daily',
        'Exercise for at least 150 minutes per week',
        'Maintain a healthy weight',
        'Don\'t smoke or quit if you do',
        'Limit alcohol consumption',
        'Manage stress through meditation, yoga, or hobbies',
        'Get 7-9 hours of quality sleep',
        'Reduce sodium intake',
        'Choose whole grains over refined grains'
      ],
      smallChanges: [
        'Take a 10-minute walk after each meal',
        'Replace one processed snack with fresh fruit',
        'Use stairs instead of elevators',
        'Practice 5 minutes of deep breathing daily',
        'Swap butter for olive oil'
      ]
    },
    diabetes: {
      title: 'Type 2 Diabetes',
      emoji: '🩺',
      color: 'blue',
      definition: 'Type 2 diabetes is a chronic condition that affects how your body processes blood sugar (glucose), often linked to insulin resistance.',
      whyItMatters: 'Diabetes affects over 400 million people worldwide and can lead to serious complications including heart disease, kidney failure, and vision loss.',
      lifestyleImpact: 'Type 2 diabetes is largely preventable and manageable through lifestyle choices. Physical activity and diet are powerful tools.',
      riskFactors: [
        'Being overweight or obese',
        'Physical inactivity',
        'Poor diet high in sugar and refined carbs',
        'Family history of diabetes',
        'Age over 45',
        'High blood pressure',
        'Abnormal cholesterol levels',
        'Polycystic ovary syndrome (PCOS)',
        'Previous gestational diabetes'
      ],
      healthyHabits: [
        'Maintain a healthy body weight',
        'Exercise regularly (at least 30 minutes, 5 days/week)',
        'Choose whole grains over refined carbohydrates',
        'Eat plenty of fiber-rich foods',
        'Limit sugary drinks and desserts',
        'Control portion sizes',
        'Include lean proteins in meals',
        'Eat vegetables with every meal',
        'Stay hydrated with water'
      ],
      smallChanges: [
        'Replace sugary drinks with water or unsweetened tea',
        'Choose brown rice instead of white rice',
        'Add a 15-minute walk after dinner',
        'Eat breakfast to stabilize blood sugar',
        'Snack on nuts instead of chips'
      ]
    },
    kidney: {
      title: 'Kidney Disease',
      emoji: '🫘',
      color: 'purple',
      definition: 'Chronic kidney disease (CKD) is the gradual loss of kidney function over time, affecting your body\'s ability to filter waste and excess fluids.',
      whyItMatters: 'Kidneys are vital organs that clean your blood, balance fluids, and regulate blood pressure. Early kidney disease often has no symptoms.',
      lifestyleImpact: 'Many kidney disease risk factors are preventable through healthy lifestyle choices, especially managing blood pressure and blood sugar.',
      riskFactors: [
        'Diabetes',
        'High blood pressure',
        'Heart disease',
        'Family history of kidney disease',
        'Smoking',
        'Obesity',
        'Age over 60',
        'Prolonged use of certain medications (NSAIDs)',
        'Frequent urinary tract infections'
      ],
      healthyHabits: [
        'Control blood pressure and blood sugar',
        'Stay well-hydrated (6-8 glasses of water daily)',
        'Don\'t smoke or quit if you do',
        'Maintain a healthy weight',
        'Exercise regularly',
        'Limit sodium intake',
        'Limit processed foods',
        'Be cautious with over-the-counter pain medications',
        'Get regular checkups and blood tests'
      ],
      smallChanges: [
        'Carry a water bottle and sip throughout the day',
        'Use herbs and spices instead of salt',
        'Read food labels to check sodium content',
        'Limit processed and packaged foods',
        'Take breaks during long periods of sitting'
      ]
    },
    obesity: {
      title: 'Weight Management & Obesity',
      emoji: '⚖️',
      color: 'amber',
      definition: 'Obesity is a condition characterized by excess body fat that increases the risk of health problems. It\'s measured by Body Mass Index (BMI) and other factors.',
      whyItMatters: 'Maintaining a healthy weight reduces risk for many diseases including heart disease, diabetes, certain cancers, and improves overall quality of life.',
      lifestyleImpact: 'Weight is influenced by the balance of calories consumed versus calories burned, along with sleep, stress, and other lifestyle factors.',
      riskFactors: [
        'Poor diet (high in calories, processed foods, sugar)',
        'Physical inactivity',
        'Insufficient sleep',
        'High stress levels',
        'Certain medications',
        'Genetics and family history',
        'Age (metabolism slows with age)',
        'Medical conditions (hypothyroidism, PCOS)',
        'Environmental factors (lack of safe places to exercise)'
      ],
      healthyHabits: [
        'Eat a balanced diet with plenty of vegetables',
        'Control portion sizes',
        'Exercise for at least 150 minutes per week',
        'Get 7-9 hours of quality sleep',
        'Manage stress through healthy coping mechanisms',
        'Drink water before meals',
        'Eat mindfully without distractions',
        'Cook at home more often',
        'Keep healthy snacks available'
      ],
      smallChanges: [
        'Use smaller plates to control portions',
        'Start meals with a vegetable or salad',
        'Park farther away to add more walking',
        'Take the stairs whenever possible',
        'Replace one unhealthy snack per day',
        'Drink water 30 minutes before meals',
        'Get 15 more minutes of sleep each night'
      ]
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: 'bg-red-50',
        border: 'border-red-700',
        text: 'text-red-900',
        button: 'bg-red-700 hover:bg-red-800'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-700',
        text: 'text-blue-900',
        button: 'bg-blue-700 hover:bg-blue-800'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-700',
        text: 'text-purple-900',
        button: 'bg-purple-700 hover:bg-purple-800'
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-700',
        text: 'text-amber-900',
        button: 'bg-amber-700 hover:bg-amber-800'
      }
    };
    return colors[color];
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 text-teal-700 hover:bg-teal-50 rounded-lg transition flex items-center gap-2"
          >
            ← Back to Home
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Learn About Health
            </h1>
            <p className="text-xl text-slate-600">
              Explore how lifestyle choices affect your long-term health
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(topics).map(([key, topic]) => (
              <button
                key={key}
                onClick={() => setSelectedTopic(key)}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-left"
              >
                <div className="text-6xl mb-4">{topic.emoji}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{topic.title}</h2>
                <p className="text-slate-600 mb-4">{topic.definition}</p>
                <span className="text-teal-700 font-semibold">Learn More →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const topic = topics[selectedTopic];
  
  // Safety check - if topic doesn't exist, show topic selection
  if (!topic) {
    setSelectedTopic(null);
    return null;
  }
  
  const colors = getColorClasses(topic.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => setSelectedTopic(null)}
          className="mb-6 px-4 py-2 text-teal-700 hover:bg-teal-50 rounded-lg transition flex items-center gap-2"
        >
          ← Back to Topics
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{topic.emoji}</span>
            <h1 className="text-4xl font-bold text-slate-900">{topic.title}</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">What is {topic.title}?</h2>
              <p className="text-slate-600 text-lg">{topic.definition}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Why It Matters</h2>
              <p className="text-slate-600 text-lg">{topic.whyItMatters}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Lifestyle Impact</h2>
              <p className="text-slate-600 text-lg">{topic.lifestyleImpact}</p>
            </section>

            <section className={`${colors.bg} border-l-4 ${colors.border} p-6 rounded`}>
              <h2 className={`text-2xl font-bold ${colors.text} mb-4`}>Risk Factors</h2>
              <ul className="space-y-2">
                {topic.riskFactors.map((factor, index) => (
                  <li key={index} className={`${colors.text} flex items-start gap-2`}>
                    <span className="mt-1">⚠️</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Healthy Habits for Prevention</h2>
              <ul className="space-y-2">
                {topic.healthyHabits.map((habit, index) => (
                  <li key={index} className="text-slate-600 flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-teal-50 border-l-4 border-teal-700 p-6 rounded">
              <h2 className="text-2xl font-bold text-teal-900 mb-4">Small Changes, Big Impact</h2>
              <p className="text-teal-800 mb-3">Start with these simple steps today:</p>
              <ul className="space-y-2">
                {topic.smallChanges.map((change, index) => (
                  <li key={index} className="text-teal-800 flex items-start gap-2">
                    <span className="mt-1">💡</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onStartAssessment}
              className={`px-8 py-4 text-white rounded-lg font-semibold text-lg transition ${colors.button}`}
            >
              Check Your Risk
            </button>
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-8 py-4 bg-white text-teal-700 border-2 border-teal-700 rounded-lg font-semibold text-lg hover:bg-teal-50 transition"
            >
              Explore Other Topics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;