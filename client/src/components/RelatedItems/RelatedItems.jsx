import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx';

const RelatedItems = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct, renderBlankCards, currentProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setRelatedItems([]);
    axios.get(`/products/${productId}/related`)
      .then(relatedProducts => {
        for (let id of relatedProducts.data) {
          axios.get(`/products/${id}`)
            .then(product => {
              setRelatedItems(currProducts => {
                return [...currProducts, product.data];
              });
            });
        }
      })
      .catch(err => console.log(err));
  }, [productId]);

  const changeDisplay = (direction) => {
    if (direction === 'left' && startIndex > 0) {
      setStartIndex(startIndex - 1);
      document.getElementById('card-container-related').scrollBy(-255, 0);
    }
    if (direction === 'right' && startIndex + 4 <= relatedItems.length - 1) {
      setStartIndex(startIndex + 1);
      document.getElementById('card-container-related').scrollBy(255, 0);
    }
  };

  return (
    <div className="display-container">
      <h3>Related Products</h3>
      <div className="products-container">
        {relatedItems.length > 4 && startIndex !== 0 && <i className="fa-solid fa-arrow-left-long cards-arrow" onClick={() => { changeDisplay('left'); }}/>}
        {(relatedItems.length <= 4 || startIndex === 0) && <i className="fa-solid fa-arrow-left-long cards-arrow-transparent"/>}
        <div id="card-container-related">
          {relatedItems.map((item) => {
            return (
              <RelatedItemsCard
                key={item.id}
                item={item}
                calcRating={calcRating}
                saleAndImageSetter={saleAndImageSetter}
                renderPrice={renderPrice}
                updateProduct={updateProduct}
                currProductId={productId}
                currentProduct={currentProduct}
              />
            );
          })}
          {relatedItems.length <= 1 && renderBlankCards(relatedItems.length)}
        </div>
        {relatedItems.length > 4 && startIndex + 4 !== relatedItems.length && <i className="fa-solid fa-arrow-right-long cards-arrow" onClick={() => { changeDisplay('right'); }}/>}
        {(relatedItems.length <= 4 || startIndex + 4 === relatedItems.length) && <i className="fa-solid fa-arrow-right-long cards-arrow-transparent"/>}
      </div>
    </div>
  );
};


export default RelatedItems;