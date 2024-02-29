import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [page, setPage] = useState('List');
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((res) => res.json())
      .then((data) => setQuestionList(data));
  }, []);

  function handleQuestionDelete(question) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then(() => {
        let updatedList = questionList.filter((item) => {
          return item.id !== question.id;
        });
        setQuestionList(updatedList);
      })
      .catch((error) => window.alert(error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === 'Form' ? (
        <QuestionForm
          questionList={questionList}
          setQuestionList={setQuestionList}
        />
      ) : (
        <QuestionList
          questionList={questionList}
          handleQuestionDelete={handleQuestionDelete}
        />
      )}
    </main>
  );
}

export default App;
