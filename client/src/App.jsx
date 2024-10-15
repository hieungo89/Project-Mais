import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
import RatingsAndReviews from './components/Ratings&Reviews/Ratings&Reviews.jsx';

const App = () => {
  const [productId, setProductId] = useState(40352);
  const [currentProduct, setCurrentProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [ratingsData, setRatingsData] = useState([]);
  const [images, setImages] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateProduct = (e, prodId) => { setProductId(prodId); };

  const photoWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dqk77sezi',
      uploadPreset: 'FEC-add-photo'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        setImages(prev => prev.length >= 5 ? prev : [...prev, result.info.url]);
      }
      if (error) { console.log(error); }
    }
  );

  const handleResize = () => {
    const currentWidth = window.outerWidth;
    setWindowWidth(currentWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [windowWidth]);

  useEffect(() => {
    // Single Product
    axios.get(`/products/${productId}`)
      .then(result => setCurrentProduct(result.data))
      .catch(err => console.log(err));

    // Ratings Metadata
    axios.get(`/reviews/meta/${productId}`)
      .then(results => {
        let ratings = results.data.ratings;
        let rating = 0;
        let total = 0;
        for (let key in ratings) {
          total += Number(ratings[key]);
          rating += Number(key) * Number(ratings[key]);
        }
        rating = (Math.round((rating / total) * 4) / 4);
        setRating(rating);
        setTotalReviews(total);
        setRatingsData(ratings);
      })
      .catch(err => console.log(err));
  }, [productId]);

  return (
    <div id="app-container">
      <div id="banner">
        <div className="logo-container">
          <img className="logo" src="https://media.istockphoto.com/vectors/corn-cob-in-a-green-husk-isolated-on-white-background-sweet-golden-vector-id1208173277?k=20&m=1208173277&s=612x612&w=0&h=XFqTQ-8JTjptNr2j8Hdfc2df2bfrVq-UenUwVef-yCg=" />
          <h1>ATELIER MAÏS</h1>
        </div>
        <div className="banner-icons">
          {windowWidth < 768 ?
            <i className="fa-solid fa-bars"></i> :
            <>
              <div className="search-container">
                <span>________</span>
                <i className="fa-solid fa-magnifying-glass"> </i>
              </div>
              <i className="fa-solid fa-house"></i>
              <i className="fa-solid fa-cart-shopping"></i>
              <i className="fa-solid fa-user"></i>
            </>
          }
        </div>
      </div>

      <div id="overview">
        <Overview productId={productId} currentProduct={currentProduct} rating={rating} totalReviews={totalReviews} />
      </div>

      <div id="related-items-and-outfits">
        <RelatedItemsAndOutfits productId={productId} updateProduct={updateProduct} currentProduct={currentProduct} />
      </div>

      <div id="qa">
        <QuestionsAndAnswers productId={productId} productName={currentProduct.name} photoWidget={photoWidget} images={images} setImages={setImages} />
      </div>

      <div id="rateAndReview">
        <RatingsAndReviews productId={productId} ratingsData={ratingsData} rating={rating} currentProduct={currentProduct} totalReviews={totalReviews} photoWidget={photoWidget} images={images} setImages={setImages} />
      </div>
    </div>
  );
};

export default App;