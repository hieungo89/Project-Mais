import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitCreation = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct, getProductReviews, product, renderBlankCards }) => {
  const [outfits, setOutfits] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    let outfitStorage = localStorage.getItem('outfitStorage');
    outfitStorage = outfitStorage ? JSON.parse(outfitStorage) : [];
    setOutfits(outfitStorage);
  }, []);

  const changeDisplay = (direction) => {
    console.log('clicked', startIndex)
    if (direction === 'left' && startIndex > 0) {
      setStartIndex(startIndex - 1);
      document.getElementById('card-container-outfit').scrollBy(-255, 0);
    }
    if (direction === 'right' && startIndex + 3 <= outfits.length - 1) {
      setStartIndex(startIndex + 1);
      document.getElementById('card-container-outfit').scrollBy(255, 0);
    }
  };

  const addOutfit = () => {
    let outfitAdded = false;
    for (let i = 0; i < outfits.length; i++) {
      if (outfits[i].id === product.id) {
        outfitAdded = true;
      }
    }
    if (outfitAdded === false) {
      setOutfits(currOutfits => {
        return [...currOutfits, product];
      });
      let outfitStorage = localStorage.getItem('outfitStorage');
      outfitStorage = outfitStorage ? JSON.parse(outfitStorage) : [];
      outfitStorage.push(product);
      localStorage.setItem('outfitStorage', JSON.stringify(outfitStorage));

      let toDisplay = [];
      setDisplayItems([]);
      if (outfitStorage.length < 4) {
        setDisplayItems(outfitStorage);
      } else {
        for (let i = outfitStorage.length - 4; i < outfitStorage.length; i++) {
          setDisplayItems(currDisplay => {
            return [...currDisplay, outfitStorage[i]];
          });
        }
        setStartIndex(outfitStorage.length - 4);
      }
    }
  };

  const removeOutfit = (event, productId) => {
    event.stopPropagation();

    const productToRemove = parseInt(productId);
    const newOutfits = outfits.filter((outfit) => outfit.id !== productToRemove);
    setOutfits(newOutfits);

    let outfitStorage = localStorage.getItem('outfitStorage');
    outfitStorage = JSON.parse(outfitStorage);
    const newLocalStorage = outfitStorage.filter((outfit) => outfit.id !== productToRemove);
    localStorage.setItem('outfitStorage', JSON.stringify(newLocalStorage));
  };

  return (
    <div className="display-container">
      <h3>Your Outfits</h3>
      <div className="products-container">
        {outfits.length > 3 && startIndex !== 0 && <i className="fa-solid fa-arrow-left-long cards-arrow-outfit" onClick={() => { changeDisplay('left'); }} />}
        {(outfits.length <= 3 || startIndex === 0) && <i className="fa-solid fa-arrow-left-long cards-arrow-transparent" />}
        <div id="card-container-outfit">
          <div className="card add-outfit card-shadow">
            <i className="fa-solid fa-plus add-outfit-btn" onClick={addOutfit}> Add to Outfit</i>
          </div>
          {outfits.map((outfit) => {
            return (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                calcRating={calcRating}
                saleAndImageSetter={saleAndImageSetter}
                renderPrice={renderPrice}
                updateProduct={updateProduct}
                removeOutfit={removeOutfit}
                getProductReviews={getProductReviews}
              />
            );
          })}
          {outfits.length <= 2 && renderBlankCards(outfits.length)}
        </div>
        {outfits.length > 3 && startIndex + 3 !== outfits.length && <i className="fa-solid fa-arrow-right-long cards-arrow-outfit" onClick={() => { changeDisplay('right'); }} />}
        {(outfits.length <= 3 || startIndex + 3 === outfits.length) && <i className="fa-solid fa-arrow-right-long cards-arrow-transparent" />}
      </div>
    </div>
  );
};

export default OutfitCreation;