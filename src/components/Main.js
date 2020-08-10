import React from 'react';
import api from '../utils/api';
import Avaedit from '../images/avaedit.png';
import Edit from '../images/edit.png';
import Add from '../images/add.png';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {

        let a = api.loadUserInfo()
            .then(result => {
                setUserAvatar(result.avatar);
                setUserName(result.name);
                setUserDescription(result.about);
            });

        let b = api.loadCards()
        .then(result => {
            setCards(
                result.map(item => ({
                    id: item._id,
                    link: item.link,
                    name: item.name,
                    owner: item.owner,
                    likes: item.likes
                }))
            )
        });
        
        Promise.all([a,b]);
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__edit-part">
                    <div className="profile__avatar-column">
                        <img alt="аватар" className="profile__avatar" src={userAvatar} />
                        <a className="profile__avatar-overlay" onClick={onEditAvatar}>
                            <img src={Avaedit} alt="icon" className="profile__avatar-icon" />
                        </a>
                    </div>
                    <div className="profile__text">
                        <div className="profile__edit-row">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button" onClick={onEditProfile}>
                                <img src={Edit} alt="редактировать" className="profile__edit-icon" />
                            </button>
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <div className="profile__add-part">
                    <button className="profile__add-button" onClick={onAddPlace}>
                        <img src={Add} alt="добавить" className="profile__add-icon" />
                    </button>
                </div>
            </section>
            <section className="elements">
                {cards.map(({ id, ...props }) => <Card key={id} {...props} onCardClick={onCardClick} />)}
            </section>
        </main>
    )
}

export default Main;
