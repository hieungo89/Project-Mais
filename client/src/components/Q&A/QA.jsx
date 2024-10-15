/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
import AskAQuestionModal from './AskAQuestionModal.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import AnswersList from './AnswersList.jsx';
import { validate } from 'react-email-validator';
import axios from 'axios';

const QuestionsAndAnswers = ({ productId, productName, photoWidget, images, setImages }) => {
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [loadQuestionButton, setLoadQuestionButton] = useState(true);
  const [collapseButton, setCollapseButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(2);
  const [reRender, setReRender] = useState(false);

  const handleSearch = (value) => {
    let container = [];
    if (value.length <= 2) {
      for (let i = 0; i < allQuestionsData.length; i++) {
        if (i > 1) { break; }
        container.push(allQuestionsData[i]);
      }
    } else if (value.length > 2) {
      for (let i = 0; i < allQuestionsData.length; i++) {
        if (allQuestionsData[i].question_body.toLowerCase().includes(value.toLowerCase())) {
          container.push(allQuestionsData[i]);
        }
        const currentQuestion = allQuestionsData[i].answers;
        for (let key in currentQuestion) {
          if (currentQuestion[key].body.toLowerCase().includes(value.toLowerCase())) {
            container.push(allQuestionsData[i]);
          }
        }
      }
    }
    setQuestionsList(container);
  };

  const handleQuestionHelpfulClick = (item) => {
    const userLookup = JSON.parse(localStorage.getItem([document.cookie]));
    if (!userLookup[`QID${item.question_id}`]) {
      axios.put(`/qa/questions/${item.question_id}/helpful`)
        .then(() => {
          for (let i = 0; i < questionsList.length; i++) {
            if (item.question_id === questionsList[i].question_id) {
              setQuestionsList((data) => {
                let newData = data.slice();
                newData[i].question_helpfulness += 1;
                return newData;
              });
            }
          }
          userLookup[`QID${item.question_id}`] = true;
          localStorage.setItem(`${document.cookie}`, JSON.stringify(userLookup));
        })
        .catch(err => console.log(err));
    }
  };

  const handleQuestionReport = (item) => {
    axios.put(`/qa/questions/${item.question_id}/report`).catch(err => console.log(err));
  };

  const handleLoadQuestionsButton = (e) => {
    if (e.target.innerText === 'MORE ANSWERED QUESTIONS') { setQuestionCount(prev => prev + 2); }
    if (e.target.innerText === 'COLLAPSE QUESTIONS') { setQuestionCount(2); }
  };

  useEffect(() => {
    if (allQuestionsData.length < 3) {
      setLoadQuestionButton(false);
      setCollapseButton(false);
    } else if (allQuestionsData.length <= questionCount) {
      setLoadQuestionButton(false);
      setCollapseButton(true);
    } else {
      setLoadQuestionButton(true);
      setCollapseButton(false);
    }
    let container = [];
    for (let i = 0; i < allQuestionsData.length; i++) {
      if (i === questionCount) { break; }
      container.push(allQuestionsData[i]);
    }
    setQuestionsList(container);
  }, [questionCount, allQuestionsData]);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const questionData = {
      body: e.target.question.value,
      name: e.target.name.value,
      email: e.target.email.value,
      'product_id': productId
    };

    if (!validate(questionData.email)) { alert('The email address provided is not in correct email format.'); }
    axios.post('/qa/questions', questionData)
      .then(() => {
        setIsOpen(false);
        setReRender(!reRender);
      })
      .catch(err => console.log(err));
  };

  const renderQuestionsList = (data) => {
    if (data.length === 0) {
      return <em>No question found. Try again...</em>;
    }
    if (data.length !== 0) {
      return data.map(item => {
        return <IndividualQuestion
          question={item}
          key={item.question_id}
          handleHelpful={handleQuestionHelpfulClick}
          handleReport={handleQuestionReport}
          product={productName}
          photoWidget={photoWidget}
          images={images} setImages={setImages} />;
      });
    }
  };

  useEffect(() => {
    axios.get(`/qa/questions/${productId}`)
      .then(result => {
        const data = result.data.results;
        let container = [];
        for (let i = 0; i < data.length; i++) {
          if (i === questionCount) { break; }
          container.push(data[i]);
        }
        setAllQuestionsData(data);
        setQuestionsList(data);
      })
      .catch(err => console.log(err));
  }, [productId, reRender]);

  return (
    <>
      <p className="qa-title">Questions & Answers</p>
      <div className="search-question"><SearchQA handleSearch={handleSearch} /></div>
      <div className="questions-list">{renderQuestionsList(questionsList)}</div>
      <div className="button-container">
        <div className="more-answered-questions">
          {loadQuestionButton && <button onClick={(e) => handleLoadQuestionsButton(e)} >MORE ANSWERED QUESTIONS</button>}
          {collapseButton && questionsList.length > 0 && <button onClick={(e) => handleLoadQuestionsButton(e)}>COLLAPSE QUESTIONS</button>}
        </div>
        <div className="ask-question-modal">
          <button onClick={() => setIsOpen(true)}>ASK A QUESTION +</button>
          <AskAQuestionModal open={isOpen} onClose={() => setIsOpen(false)} product={productName} submitQuestion={handleSubmitQuestion} />
        </div>
      </div>
    </>
  );
};

export default QuestionsAndAnswers;