import React from 'react';
import Delete from '../images/del.svg';

function Card(props) {

    function handleClick() {
        const card = {link: props.link, name: props.name};
        props.onCardClick(card);
    }

    return (
        <div className="element">
            <div className="element__container">
                <img src={Delete} alt="удалить" className="element__del" />
                <img className="element__photo" src={props.link} alt={props.name} onClick={handleClick} />
            </div>
            <div className="element__bottom">
                <p className="element__name">{props.name}</p>
                <div className="element__likes">
                    <button className="element__like" />
                    <p className="element__like-count">{props.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;