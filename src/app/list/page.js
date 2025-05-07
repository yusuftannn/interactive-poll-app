'use client';
import { useEffect, useState } from 'react';

export default function ListPollsPage() {
  const [polls, setPolls] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('polls') || '[]');
    setPolls(stored);
  }, []);

  const handleOptionChange = (pollId, option) => {
    setAnswers(prev => ({ ...prev, [pollId]: option }));
  };

  const handleSaveAnswer = (pollId) => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    localStorage.setItem(
      'answers',
      JSON.stringify({ ...savedAnswers, [pollId]: answers[pollId] })
    );
    alert('Cevap kaydedildi.');
  };

  return (
    <div className="container">
      <h1>Anketler</h1>
      {polls.length === 0 ? (
        <p>Henüz anket oluşturulmamış.</p>
      ) : (
        polls.map(poll => (
          <div key={poll.id} style={{ marginBottom: '30px' }}>
            <p><strong>{poll.question}</strong></p>
            {poll.options.map((option, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  id={`${poll.id}-${idx}`}
                  name={`poll-${poll.id}`}
                  value={option}
                  checked={answers[poll.id] === option}
                  onChange={() => handleOptionChange(poll.id, option)}
                />
                <label htmlFor={`${poll.id}-${idx}`} style={{ marginLeft: '5px' }}>{option}</label>
              </div>
            ))}
            <button
              style={{ marginTop: '10px' }}
              onClick={() => handleSaveAnswer(poll.id)}
              disabled={!answers[poll.id]}
            >
              Cevabı Kaydet
            </button>
          </div>
        ))
      )}
    </div>
  );
}
