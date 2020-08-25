import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.loadUserInfo()
      .then(result => setCurrentUser(result));
  }, []);

  React.useEffect(() => {
    api.loadCards()
      .then(cards => {
        setCards(cards);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        console.log(card._id);
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch ((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onDelCard() {
    setIsDelPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false });
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name
    });
  }

  function handleUpdateUser(name, description) {
    api.editUserProfile(name, description)
      .then(result => setCurrentUser(result));

    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    api.editUserAvatar({ url: avatar })
      .then(result => setCurrentUser(result));

    closeAllPopups();
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard({ name: name, link: link })
      .then(newCard => setCards([...cards, newCard]));

    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm name="delete" title={'Вы уверены?'} isOpen={isDelPopupOpen} onClose={closeAllPopups} buttonName={'Да'}>
      </PopupWithForm>

      <ImagePopup cardLink={selectedCard.link} cardName={selectedCard.name} onClose={closeAllPopups} isOpen={selectedCard.isOpen} />

      <div className="page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
