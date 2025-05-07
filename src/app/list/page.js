"use client";
import { useEffect, useState } from "react";
import PollCard from "../../components/PollCard";

export default function ListPollsPage() {
  const [polls, setPolls] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("polls") || "[]");
    setPolls(stored);
  }, []);

  const handleOptionChange = (pollId, option) => {
    setAnswers((prev) => ({ ...prev, [pollId]: option }));
  };

  const handleSaveAnswer = (pollId) => {
    const savedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
    localStorage.setItem(
      "answers",
      JSON.stringify({ ...savedAnswers, [pollId]: answers[pollId] })
    );
    alert("Cevap kaydedildi.");
  };

  return (
    <div className="container">
      <h1>Anketler</h1>
      {polls.length === 0 ? (
        <p>Henüz anket oluşturulmamış.</p>
      ) : (
        polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            selected={answers[poll.id]}
            onChange={(opt) => handleOptionChange(poll.id, opt)}
            onSave={() => handleSaveAnswer(poll.id)}
          />
        ))
      )}
    </div>
  );
}
