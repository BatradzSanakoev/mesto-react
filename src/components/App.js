import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';
import { ReactComponent } from '*.svg';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false});
  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);

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
    setSelectedCard({isOpen: false});
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name
    });
  }

  return (
    <>
      <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonName={'Сохранить'}>
        <input type="text" name="name" className="pop-up__input pop-up__input_edit-name" id="edit-name-input" placeholder="Введите имя" required minLength={2} maxLength={40} pattern="[A-Za-zА-Яа-яЁё\s\-]{1,}" />
        <span className="pop-up__form-error" id="edit-name-input-error" />
        <input type="text" name="description" className="pop-up__input pop-up__input_edit-desc" id="edit-desc-input" placeholder="Введите описание" required minLength={2} maxLength={200} />
        <span className="pop-up__form-error" id="edit-desc-input-error" />
      </PopupWithForm>

      <PopupWithForm name={'add'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonName={'Обновить'}>
        <input type="url" name="link" className="pop-up__input pop-up__input_avatar-url" id="avatar-url-input" placeholder="Ссылка на картинку" required />
        <span className="pop-up__form-error" id="avatar-url-input-error" />
      </PopupWithForm>

      <PopupWithForm name={'avatar'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonName={'Добавить'}>
        <input type="text" name="name" className="pop-up__input pop-up__input_add-name" id="add-name-input" placeholder="Название" required minLength={1} maxLength={30} />
        <span className="pop-up__form-error" id="add-name-input-error" />
        <input type="url" name="link" className="pop-up__input pop-up__input_add-url" id="add-url-input" placeholder="Ссылка на картинку" required />
        <span className="pop-up__form-error" id="add-url-input-error" />
      </PopupWithForm>

      <PopupWithForm name={'delete'} title={'Вы уверены?'} isOpen={isDelPopupOpen} onClose={closeAllPopups} buttonName={'Да'}>

      </PopupWithForm>

      <ImagePopup cardLink={selectedCard.link} cardName={selectedCard.name} onClose={closeAllPopups} isOpen={selectedCard.isOpen} />

      {/* <section className="pop-up delete-pop">
        <div className="pop-up__container">
          <button className="pop-up__close-button"><img src="./images/close.png" alt="закрыть" className="pop-up__close-icon" /></button>
          <form className="pop-up__form pop-up__form_delete" noValidate>
            <h2 className="pop-up__form-title">Вы уверены ?</h2>
            <fieldset className="pop-up__form-input pop-up__form-input_delete-confirm">
              <button type="submit" className="pop-up__button pop-up__button_delete-confirm" name="default">Да</button>
            </fieldset>
          </form>
        </div>
      </section> */}

      <div className="page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onCardClick={handleCardClick} />
        <Footer />
      </div>
    </>

  );
}

export default App;
