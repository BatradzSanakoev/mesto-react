import React from 'react';
import Close from '../images/close.png';

function PopupWithForm(props) {
    return (
        <section className={`pop-up ${props.name}-pop ${props.isOpen ? 'pops-visible' : ''}`}>
            <div className="pop-up__container">
                <button className="pop-up__close-button" onClick={props.onClose}>
                    <img src={Close} alt="закрыть" className="pop-up__close-icon" />
                </button>
                <form className={`pop-up__form pop-up__form_${props.name}`} noValidate>
                    <h2 className="pop-up__form-title">{props.title}</h2>
                    <fieldset className={`pop-up__form-input pop-up__form-input_${props.mod}`}>
                        {props.children}
                        <button type="submit" className="pop-up__button">Сохранить</button>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;