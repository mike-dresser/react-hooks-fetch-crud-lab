import React, { useState } from 'react';

function QuestionItem({ question, handleQuestionDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correct, setCorrect] = useState(correctIndex);
  function handleQuestionUpdate(index) {
    setCorrect(index);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: index }),
    }).then((res) => {
      if (res.ok) return res.json();
      else throw new Error(`${res.status}: ${res.statusText}`);
    });
    // .then((updatedQuestion) => setCorrect(updatedQuestion.correctIndex));
    // ^^ This was failing the tests when I updated state AFTER fetching
    // I guess it was too slow?
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correct}
          onChange={(e) => handleQuestionUpdate(e.target.value)}
        >
          {options}
        </select>
      </label>
      <button onClick={() => handleQuestionDelete(question)}>
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
