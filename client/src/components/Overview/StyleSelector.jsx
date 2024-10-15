const StyleSelector = ({currentStyle, styles, changeCurrentStyle, changeSkuSelected, changeQuantitySelected, toggleMessage}) => {
  const onChange = (event) => {
    let style;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].name === event.target.name) {
        style = styles[i];
        break;
      }
    }
    changeCurrentStyle(style);
    changeSkuSelected(false);
    changeQuantitySelected(0);
    toggleMessage(false);
  };

  const renderStyleSelectorThumbnails = () => {
    let thumbnails = [];
    let currentRow = 0;
    for (let i = 0; i < styles.length; i++) {
      if (Math.floor(i / 4) !== currentRow) {
        currentRow = Math.floor(i / 4);
        thumbnails.push(<br key={`row ${currentRow}`}/>);
      }
      thumbnails.push(
        <span
          data-testid={`style${i}-selector`}
          key={styles[i].style_id}
          className="style-selector">
          <img
            data-testid={`style${i}`}
            name={styles[i].name}
            className="style-selector-thumbnail"
            src={styles[i].photos[0].thumbnail_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Empty_set_symbol.svg/640px-Empty_set_symbol.svg.png'}
            onClick={onChange}>
          </img>
          {renderCheckmark(styles[i].style_id)}
        </span>
      );
    }
    return thumbnails;
  };

  const renderCheckmark = (styleId) => {
    if (styleId === currentStyle.style_id) {
      return <span data-testid="checkmark" className="checkmark">✓</span>;
    }
  };

  return (
    <div className="styles">
      <p className="style-description">
        <b>STYLE {'>'} </b>
        {currentStyle.name}
      </p>
      {renderStyleSelectorThumbnails()}
    </div>
  );
};

export default StyleSelector;
