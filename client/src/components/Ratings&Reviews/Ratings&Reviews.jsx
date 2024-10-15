import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingsBreakdownSidebar from './Ratings/RatingsBreakdownSidebar.jsx';
import ReviewsList from './Reviews/ReviewsList.jsx';

const RatingsAndReviews = ({ productId, currentProduct, rating, ratingsData, totalReviews, images, setImages, photoWidget }) => {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [prodName, setProdName] = useState('');
  const [star, setStar] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios.get(`/reviews/${productId}/count`)
      .then((results) => {
        let productReviews = results.data.results;
        let totalRating = 0;
        productReviews.forEach((review) => {
          totalRating += review.rating;
        });
        let averageRating = totalRating / productReviews.length;
        averageRating = Math.round(averageRating * 10) / 10;
        setReviews(productReviews);
      })
      .catch((error) => { console.log(err); });

    setOneStar(ratingsData[1]);
    setTwoStar(ratingsData[2]);
    setThreeStar(ratingsData[3]);
    setFourStar(ratingsData[4]);
    setFiveStar(ratingsData[5]);

    setProdName(currentProduct.name);
    setProducts(currentProduct);
  }, [ratingsData]);

  const addReview = (data) => {
    axios.post('/reviews', data)
      .catch((error) => { console.log(error); });
  };

  return (
    <>
      <div className="ratings-breakdown">
        < RatingsBreakdownSidebar setDisplayedReviews={setDisplayedReviews} reviews={reviews} fiveStar={fiveStar} fourStar={fourStar} threeStar={threeStar} twoStar={twoStar} oneStar={oneStar} totalNumberOfReviews={totalReviews} rating={rating} />
      </div>
      <div className="reviews-list">
        {displayedReviews.length > 0
          ?
          <ReviewsList product_id={productId} prodName={prodName} metaData={metaData} addReview={addReview} displayedReviews={displayedReviews} totalNumberOfReviews={totalReviews} photoWidget={photoWidget} images={images} setImages={setImages} />
          : <ReviewsList product_id={productId} prodName={prodName} metaData={metaData} addReview={addReview} reviews={reviews} totalNumberOfReviews={totalReviews} photoWidget={photoWidget} images={images} setImages={setImages} />
        }
      </div>
    </>
  );
};

export default RatingsAndReviews;
