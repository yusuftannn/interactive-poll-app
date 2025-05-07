"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);
    }
  };

  const validateAndSave = () => {
    const trimmedOptions = options.map((opt) => opt.trim());
    const hasEmpty = trimmedOptions.some((opt) => opt === "");
    const hasDuplicates =
      new Set(trimmedOptions).size !== trimmedOptions.length;

    if (!question.trim()) {
      setError("Soru boş bırakılamaz.");
    } else if (hasEmpty) {
      setError("Boş seçenek olamaz.");
    } else if (hasDuplicates) {
      setError("Seçenekler benzersiz olmalı.");
    } else {
      setError("");
      const newPoll = {
        id: Date.now(),
        question: question.trim(),
        options: trimmedOptions,
        createdAt: new Date().toISOString(),
      };
      const polls = JSON.parse(localStorage.getItem("polls") || "[]");
      localStorage.setItem("polls", JSON.stringify([...polls, newPoll]));
      alert("Anket başarıyla kaydedildi.");
      setQuestion("");
      setOptions(["", ""]);
    }
  };

  return (
    <div className="container">
      <h1>Anket Oluştur</h1>
      <div>
        <label>Soru:</label>
        <div className="option-row">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Cevap Seçenekleri:</label>
        {options.map((opt, i) => (
          <div key={i} className="option-row">
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
            {options.length > 2 && (
              <button onClick={() => handleRemoveOption(i)}>Kaldır</button>
            )}
          </div>
        ))}

        {options.length < 6 && (
          <button onClick={handleAddOption} style={{ marginTop: "10px" }}>
            Seçenek Ekle
          </button>
        )}
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <button
        onClick={validateAndSave}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Kaydet
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Ön İzleme</h2>
      <div>
        <p>
          <strong>{question || "Soru buraya gelecek..."}</strong>
        </p>
        {options.map((opt, i) => (
          <div key={i}>
            <input type="radio" disabled />
            <label style={{ marginLeft: "5px" }}>
              {opt || `Seçenek ${i + 1}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
