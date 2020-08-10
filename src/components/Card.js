import React from 'react';
import Delete from '../images/del.svg';

function Card({link, name, likes, onCardClick}) {

    function handleClick() {
        const card = {link: link, name: name};
        onCardClick(card);
    }

    return (
        <div className="element">
            <div className="element__container">
                <img src={Delete} alt="удалить" className="element__del" />
                <img className="element__photo" src={link} alt={name} onClick={handleClick} />
            </div>
            <div className="element__bottom">
                <p className="element__name">{name}</p>
                <div className="element__likes">
                    <button className="element__like" />
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;