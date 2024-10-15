import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';
import star from '../../../assets/images//star.png';

const RatingsBreakdownSidebar = ({ setDisplayedReviews, reviews, rating, fiveStar, fourStar, threeStar, twoStar, oneStar, totalNumberOfReviews, product_id }) => {

  const [ recommend, setRecommend ] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [toggleFiveStar, setToggleFiveStar] = useState(false);
  const [toggleFourStar, setToggleFourStar] = useState(false);
  const [toggleThreeStar, setToggleThreeStar] = useState(false);
  const [toggleTwoStar, setToggleTwoStar] = useState(false);
  const [toggleOneStar, setToggleOneStar] = useState(false);

  const starAmount = [
    {
      num: 5,
      star: fiveStar,
    },
    {
      num: 4,
      star: fourStar,
    },
    {
      num: 3,
      star: threeStar,
    },
    {
      num: 2,
      star: twoStar,
    },
    {
      num: 1,
      star: oneStar,
    },
  ];

  const RatingsBreakdown = ({starAmt, num}) => {
    return (
      <div className="flexbox-container" onClick={() => handleStarClick(num)}>
        <div className="breakdown">
          {num} <img className="single-star-outline" src={star}/>
        </div>
        <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={starAmt} />
        <div className="breakdown">
          <span>{starAmt}</span>
          <span>reviews</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    let filtered = [];
    for (let i = 0; i < reviews.length; i++) {
      if (toggleFiveStar && reviews[i].rating === 5) {
        filtered.push(reviews[i]);
      }
      if (toggleFourStar && reviews[i].rating === 4) {
        filtered.push(reviews[i]);
      }
      if (toggleThreeStar && reviews[i].rating === 3) {
        filtered.push(reviews[i]);
      }
      if (toggleTwoStar && reviews[i].rating === 2) {
        filtered.push(reviews[i]);
      }
      if (toggleOneStar && reviews[i].rating === 1) {
        filtered.push(reviews[i]);
      }
    }
    setDisplayedReviews(filtered);
  }, [toggleOneStar, toggleTwoStar, toggleThreeStar, toggleFourStar, toggleFiveStar]);

  const RecommendPercentage = () => {
    let recs = 0;
    reviews.forEach((review) => {
      review.recommend && recs++;
    });
    return Math.trunc(recs / reviews.length * 100);
  };

  const handleStarClick = (num) => {
    switch (num) {
    case 5:
      setToggleFiveStar(!toggleFiveStar);
      break;
    case 4:
      setToggleFourStar(!toggleFourStar);
      break;
    case 3:
      setToggleThreeStar(!toggleThreeStar);
      break;
    case 2:
      setToggleTwoStar(!toggleTwoStar);
      break;
    case 1:
      setToggleOneStar(!toggleOneStar);
      break;
    default:
    }
  };

  return (
    <>
      <h2>Ratings Breakdown</h2>
      <div className="flexbox-container">
        <h2>{rating}</h2>
        <sup className="overall-stars"><StarRating rating={rating} /></sup>
      </div>
      <div className="align-ratings-breakdown-header">
        {RecommendPercentage()}% of reviews recommend this product
      </div>
      {starAmount.map(singleStar => {
        const {num, star} = singleStar;
        return <RatingsBreakdown key={num} starAmt={star} num={num}/>;
      })}
    </>
  );
};

export default RatingsBreakdownSidebar;