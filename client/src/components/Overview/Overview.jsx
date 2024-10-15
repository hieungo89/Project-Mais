import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo1 from './ProductInfo1.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductInfo2 from './ProductInfo2.jsx';

const Overview = ({productId, currentProduct, rating, totalReviews}) => {
  const [currentStyle, setCurrentStyle] = useState({});
  const [styles, setStyles] = useState([]);
  const [skuSelected, setSkuSelected] = useState(false);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [failToAdd, setFailToAdd] = useState(false);

  useEffect(() => {
    axios.get(`/products/${productId}/styles`)
      .then(styles => {
        setStyles(styles.data.results);
        let defaultStyle = false;
        for (let i = 0; i < styles.data.results.length; i++) {
          if (styles.data.results[i]['default?']) {
            setCurrentStyle(styles.data.results[i]);
            defaultStyle = true;
            break;
          }
        }
        if (!defaultStyle) {
          setCurrentStyle(styles.data.results[0]);
        }
      })
      .catch(err => console.log(err));

    setSkuSelected(false);
    setQuantitySelected(0);
    setFailToAdd(false);
  }, [productId]);

  const changeCurrentStyle = (style) => {
    setCurrentStyle(style);
  };

  const changeSkuSelected = (sku) => {
    setSkuSelected(sku);
  };

  const changeQuantitySelected = (quantity) => {
    setQuantitySelected(quantity);
  };

  const toggleMessage = (show) => {
    setFailToAdd(show);
  };

  return (
    <>
      <ImageGallery
        currentStyle={currentStyle} />
      <div className="overview-sidebar">
        <ProductInfo1
          currentProduct={currentProduct}
          currentStyle={currentStyle}
          rating={rating}
          totalReviews={totalReviews} />
        <StyleSelector
          currentStyle={currentStyle}
          styles={styles}
          changeCurrentStyle={changeCurrentStyle}
          changeSkuSelected={changeSkuSelected}
          changeQuantitySelected={changeQuantitySelected}
          toggleMessage={toggleMessage} />
        <AddToCart
          currentStyle={currentStyle}
          skuSelected={skuSelected}
          quantitySelected={quantitySelected}
          changeSkuSelected={changeSkuSelected}
          changeQuantitySelected={changeQuantitySelected}
          failToAdd={failToAdd}
          toggleMessage={toggleMessage} />
        <ProductInfo2
          currentProduct={currentProduct} />
      </div>
    </>
  );
};

export default Overview;
