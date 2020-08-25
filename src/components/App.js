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

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.loadUserInfo()
      .then(result => setCurrentUser(result));
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <PopupWithForm name="avatar" title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonName={'Добавить'}>
        <input type="text" name="name" className="pop-up__input pop-up__input_add-name" id="add-name-input" placeholder="Название" required minLength={1} maxLength={30} />
        <span className="pop-up__form-error" id="add-name-input-error" />
        <input type="url" name="link" className="pop-up__input pop-up__input_add-url" id="add-url-input" placeholder="Ссылка на картинку" required />
        <span className="pop-up__form-error" id="add-url-input-error" />
      </PopupWithForm>

      <PopupWithForm name="delete" title={'Вы уверены?'} isOpen={isDelPopupOpen} onClose={closeAllPopups} buttonName={'Да'}>
      </PopupWithForm>

      <ImagePopup cardLink={selectedCard.link} cardName={selectedCard.name} onClose={closeAllPopups} isOpen={selectedCard.isOpen} />

      <div className="page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onCardClick={handleCardClick} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
