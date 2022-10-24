import React from 'react';
import ReactDom from 'react-dom';

const AskAQuestionModal = ({ open, onClose, product, submitQuestion }) => {
  if (!open) { return null; }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="modal-styles">
        <form onSubmit={(e) => submitQuestion(e)}>
          <h3 className="question-title">
            Ask Your Question
          </h3>
          <p className="question-subtitle">
            About the <em>{product}</em> Here.
          </p>

          <p className="modal-question-body">
            <label>Your Question:</label><br />
            <textarea name="question" maxLength="1000" rows="4" cols="50" required />
          </p>

          <p className="question-nickname">
            <label>What is your nickname:</label><br />
            <input type="text" name="name" size="60" maxLength="60" placeholder="Example: jackson11" required /><br />
            <em>For privacy reasons, do not use your full name or email address.</em>
          </p>

          <p className="question-email">
            <input type="email" name="email" size="60" maxLength="60" placeholder="Example: jackson11@email.com" required /><br />
            <em>For authentication reasons, you will not be emailed.</em>
          </p>

          <input type="submit" />
        </form>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default AskAQuestionModal;