import React from 'react';

const ProductCard = (props) => {
    const {
        name,
        tagline,
        first_brewed,
        image_url,
        abv,
        ibu,
        price,
        discounted_price
    } = props.data;

    return (
        <div className="beer-card">
            <div className="beer-card-inner">
                <div className="beer-image">
                    {image_url ? (<img src={image_url} alt={name}/>) : (<img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT04YlXcCWXwVzK7QD-R67tFRRCRfl-YOJeuM9U-Hnc69zygDT5nRG0tBNfjG2Z25p47_Q&usqp=CAU"
                        alt={name}/>)}
                </div>
                <div className="beer-details">
                    <div className="beer-name">
                        {name}
                    </div>
                    <div className="beer-abv-ibu">
                        <span className="abv-value">ABV: <span className="abv-ibu-value">{abv}%</span></span>
                        <span className="ibu-value"> IBU: <span className="abv-ibu-value">{ibu}</span></span>
                    </div>
                    <div className="beer-brewed-date">
                        <span>Brewed Date : {first_brewed}</span>
                    </div>
                    <div className="beer-tagline">
                        {tagline}
                    </div>
                    <div className="beer-price">
                             <span className="target">
                                <span className="fg">
                                ${price}
                            </span>
                            <span className="og">${discounted_price}</span>
                            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
