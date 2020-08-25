import React from 'react';
import api from '../utils/api';
import Avaedit from '../images/avaedit.png';
import Edit from '../images/edit.png';
import Add from '../images/add.png';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [cards, setCards] = React.useState([]);
    const context = React.useContext(CurrentUserContext);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === context._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                const newCards = cards.map(c => c._id === card._id ? newCard : c);
                setCards(newCards);
            });
    }

    function handleCardDelete(card) {
        api.delCard(card._id)
        .then(() => {
            setCards(cards.filter(c => c !== card));
        })
    }

    React.useEffect(() => {
        api.loadCards()
            .then(cards => {
                setCards(cards);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__edit-part">
                    <div className="profile__avatar-column">
                        <img alt="аватар" className="profile__avatar" src={context.avatar} />
                        <a className="profile__avatar-overlay" onClick={onEditAvatar}>
                            <img src={Avaedit} alt="icon" className="profile__avatar-icon" />
                        </a>
                    </div>
                    <div className="profile__text">
                        <div className="profile__edit-row">
                            <h1 className="profile__name">{context.name}</h1>
                            <button className="profile__edit-button" onClick={onEditProfile}>
                                <img src={Edit} alt="редактировать" className="profile__edit-icon" />
                            </button>
                        </div>
                        <p className="profile__description">{context.about}</p>
                    </div>
                </div>
                <div className="profile__add-part">
                    <button className="profile__add-button" onClick={onAddPlace}>
                        <img src={Add} alt="добавить" className="profile__add-icon" />
                    </button>
                </div>
            </section>
            <section className="elements">
                {cards.map(({ _id, ...props }) => <Card key={_id} _id={_id} {...props} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />)}
            </section>
        </main>
    )
}

export default Main;
