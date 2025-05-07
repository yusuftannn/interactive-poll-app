'use client';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [polls, setPolls] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    const storedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    setPolls(storedPolls);
    setAnswers(storedAnswers);
  }, []);

  const answeredPolls = polls.filter(poll => answers[poll.id]);

  return (
    <div className="container">
      <h1>Cevaplanan Anketler</h1>
      {answeredPolls.length === 0 ? (
        <p>Henüz cevaplanan bir anket bulunmuyor.</p>
      ) : (
        answeredPolls.map(poll => (
          <div key={poll.id} style={{ marginBottom: '30px' }}>
            <p><strong>{poll.question}</strong></p>
            <p style={{ color: 'green' }}>Cevabınız: {answers[poll.id]}</p>
          </div>
        ))
      )}
    </div>
  );
}
