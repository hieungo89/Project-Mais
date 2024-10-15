/* eslint-disable camelcase */
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import DisplayPhotoModal from './DisplayPhotoModal.jsx';

const IndividualAnswer = ({ answer, handleHelpful, handleReport }) => {
  const [report, setReport] = useState(false);
  const [photoClicked, setPhotoClicked] = useState(false);
  const [image, setImage] = useState();
  const { body, answerer_name, date, photos, helpfulness } = answer;

  const showPhotos = () => {
    return photos?.map(photo => {
      return <img src={photo.url} key={photo.id} width="90" height="60" className="photo"
        onClick={() => { setImage(photo); setPhotoClicked(true); }} />;
    });
  };

  const displayPhotos = () => {
    return <p className="photos">{showPhotos()} <DisplayPhotoModal photoClicked={photoClicked} setPhotoClicked={setPhotoClicked} photo={image} /></p>;
  };

  return (
    <>
      <p className="answer-body">{body}</p>
      {photos.length > 0 && displayPhotos()}
      <p className="answer-info">by {answerer_name}, {format(parseISO(date), 'MMMM dd, yyyy')}</p>
      <p className="answer-helpfulness">
        Helpful? <span className="helpful" onClick={() => handleHelpful(answer)}>Yes</span> ({helpfulness})
      </p>
      <p className="answer-report">
        {!report && <button onClick={() => { setReport(true); handleReport(answer); }}>Report</button>}
        {report && <span>Reported</span>}
      </p>
    </>
  );
};

export default IndividualAnswer;