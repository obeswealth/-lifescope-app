import React from 'react';

function Results({ answers, onRestart, onLearnMore }) {
  const [risks, setRisks] = React.useState({
    heartRisk: 'low',
    diabetesRisk: 'low',
    kidneyRisk: 'low',
    weightRisk: 'low'
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRisks = async () => {
      try {
        const backendUrl = window.location.hostname === 'localhost' 
  ? 'http://127.0.0.1:8000' 
  : 'http://192.168.5.14:8000';
const response = await fetch(`${backendUrl}/api/assessment/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eating_habits: answers.eatingHabits,
            physical_activity: answers.physicalActivity,
            body_indicators: answers.bodyIndicators || {},
            sleep_routine: answers.sleepRoutine,
            substances: answers.substances,
            family_history: answers.familyHistory || {}
          })
        });
        
        const data = await response.json();
        
        setRisks({
          heartRisk: data.risk_results.heart.risk_tier,
          diabetesRisk: data.risk_results.diabetes.risk_tier,
          kidneyRisk: data.risk_results.kidney.risk_tier,
          weightRisk: data.risk_results.obesity.risk_tier
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching risks:', error);
        setLoading(false);
      }
    };
    
    fetchRisks();
  }, [answers]);

  const getRiskColor = (risk) => {
    if (risk === 'low') return 'bg-green-100 text-green-800 border-green-300';
    if (risk === 'moderate') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getRiskEmoji = (risk) => {
    if (risk === 'low') return '✅';
    if (risk === 'moderate') return '⚠️';
    return '🔴';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-700 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Analyzing your lifestyle habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Your Lifestyle Health Assessment
          </h1>
          <p className="text-lg text-slate-600">
            Based on your answers, here's your personalized health risk profile
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overall Lifestyle Insight</h2>
          <p className="text-slate-600 text-lg">
            Your assessment is complete! Review your risk levels below and explore actionable steps to improve your health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">❤️</span>
                <h3 className="text-xl font-bold text-slate-900">Heart Disease</h3>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getRiskColor(risks.heartRisk)}`}>
                {getRiskEmoji(risks.heartRisk)} {risks.heartRisk.charAt(0).toUpperCase() + risks.heartRisk.slice(1)} Risk
              </span>
            </div>
            <p className="text-slate-600 mb-4">
              Your heart health risk is influenced by your eating habits, physical activity, and lifestyle choices.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-700 p-4 rounded">
              <p className="text-sm font-semibold text-teal-900 mb-2">💡 Improvement Tips:</p>
              <ul className="text-sm text-teal-800 space-y-1">
                <li>• Eat more vegetables and fruits daily</li>
                <li>• Reduce processed food intake</li>
                <li>• Stay physically active for 30+ minutes daily</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🩺</span>
                <h3 className="text-xl font-bold text-slate-900">Type 2 Diabetes</h3>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getRiskColor(risks.diabetesRisk)}`}>
                {getRiskEmoji(risks.diabetesRisk)} {risks.diabetesRisk.charAt(0).toUpperCase() + risks.diabetesRisk.slice(1)} Risk
              </span>
            </div>
            <p className="text-slate-600 mb-4">
              Your diabetes risk relates to physical activity levels, eating patterns, and body weight management.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Improvement Tips:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Reduce sugar and refined carbohydrate intake</li>
                <li>• Exercise regularly to improve insulin sensitivity</li>
                <li>• Maintain a healthy body weight</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🫘</span>
                <h3 className="text-xl font-bold text-slate-900">Kidney Disease</h3>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getRiskColor(risks.kidneyRisk)}`}>
                {getRiskEmoji(risks.kidneyRisk)} {risks.kidneyRisk.charAt(0).toUpperCase() + risks.kidneyRisk.slice(1)} Risk
              </span>
            </div>
            <p className="text-slate-600 mb-4">
              Kidney health is affected by blood pressure, blood sugar control, and lifestyle factors like smoking.
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-700 p-4 rounded">
              <p className="text-sm font-semibold text-purple-900 mb-2">💡 Improvement Tips:</p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Stay well-hydrated throughout the day</li>
                <li>• Avoid smoking and excessive alcohol</li>
                <li>• Control blood pressure and blood sugar</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">⚖️</span>
                <h3 className="text-xl font-bold text-slate-900">Weight Management</h3>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getRiskColor(risks.weightRisk)}`}>
                {getRiskEmoji(risks.weightRisk)} {risks.weightRisk.charAt(0).toUpperCase() + risks.weightRisk.slice(1)} Risk
              </span>
            </div>
            <p className="text-slate-600 mb-4">
              Weight management depends on balanced eating, regular physical activity, and healthy lifestyle habits.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-700 p-4 rounded">
              <p className="text-sm font-semibold text-amber-900 mb-2">💡 Improvement Tips:</p>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Focus on portion control and balanced meals</li>
                <li>• Increase daily physical activity</li>
                <li>• Get adequate sleep (7-8 hours nightly)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-teal-700 text-white rounded-lg font-semibold text-lg hover:bg-teal-800 transition"
          >
            Take Assessment Again
          </button>
          <button 
            onClick={onLearnMore}
            className="px-8 py-4 bg-white text-teal-700 border-2 border-teal-700 rounded-lg font-semibold text-lg hover:bg-teal-50 transition"
          >
            Learn More About Health
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;