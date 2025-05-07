'use client';
import React from 'react';

export default function PollCard({ poll, selected, onChange, onSave }) {
  return (
    <div style={{ marginBottom: '30px' }}>
      <p><strong>{poll.question}</strong></p>
      {poll.options.map((option, idx) => (
        <div key={idx}>
          <input
            type="radio"
            id={`${poll.id}-${idx}`}
            name={`poll-${poll.id}`}
            value={option}
            checked={selected === option}
            onChange={() => onChange(option)}
          />
          <label htmlFor={`${poll.id}-${idx}`} style={{ marginLeft: '5px' }}>{option}</label>
        </div>
      ))}
      <button
        style={{ marginTop: '10px' }}
        onClick={onSave}
        disabled={!selected}
      >
        Cevabı Kaydet
      </button>
    </div>
  );
}
