import React from 'react';
import Close from '../images/close.png';

function ImagePopup(props) {
    return (
        <section className={`pop-up image-popup ${props.isOpen ? 'pops-visible' : ''}`}>
            <div className="image-popup__container">
                <button className="pop-up__close-button image-popup__close-button" onClick={props.onClose}>
                    <img src={Close} alt="закрыть" className="image-popup__close-icon pop-up__close-icon" />
                </button>
                <img className="image-popup__image" src={props.cardLink} alt={props.cardName} />
                <p className="image-popup__name">{props.cardName}</p>
            </div>
        </section>
    )
}

export default ImagePopup;