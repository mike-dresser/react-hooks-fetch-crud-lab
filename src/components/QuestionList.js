import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questionList, handleQuestionDelete }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionList.map((question) => (
          <QuestionItem
            question={question}
            key={question.id}
            handleQuestionDelete={handleQuestionDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
