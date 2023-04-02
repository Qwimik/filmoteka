import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, set, ref, onValue, update } from 'firebase/database';
import Notiflix from 'notiflix';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { refs, refsRegistration } from './open-registration';
import { KEYS, getFilms } from './storage-service';
import { isModalOpen } from './open-modal';

const firebaseConfig = {
  apiKey: 'AIzaSyDDNdha_Mwk9RTliXdwrHAWqx0yN9G0Yeo',
  authDomain: 'filmoteka-2bd7c.firebaseapp.com',
  projectId: 'filmoteka-2bd7c',
  storageBucket: 'filmoteka-2bd7c.appspot.com',
  messagingSenderId: '654768201498',
  appId: '1:654768201498:web:67ced8dc5c6682d69fd6a3',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
export let user;

const formReg = document.querySelector('#formReg');
const formSign = document.querySelector('#formSign');
const btnSignOut = document.querySelector('#btnSignOut');

let isUserLogin = getFilms('user');

if (!isUserLogin) {
  refs.open.addEventListener('click', onLibraryClick);
}

function onLibraryClick() {
  if (!isUserLogin) {
    refs.open.removeAttribute('href');
    refs.backdrop.classList.remove('is-hidden');
    Notiflix.Notify.warning('Oops, please Sign In first', {
      position: 'center-top',
    });
  }
}

if (btnSignOut) {
  btnSignOut.addEventListener('click', onBtnSignOutClick);
}

function onBtnSignOutClick() {
  Confirm.show(
    'Filmoteka',
    'Are you sure?',
    'Yes',
    'No',
    () => {
      signOut(auth)
        .then(() => {
          Notiflix.Notify.warning('See you soon!', {
            position: 'center-top',
          });
          // notiflix - вихід з акаунту
          localStorage.removeItem(KEYS.WATCHED);
          localStorage.removeItem(KEYS.QUEUE);
          localStorage.removeItem('user');
          isUserLogin = null;
          const elem = document.querySelector('.header__list-link');
          if (window.location.pathname === '/library.html') {
            setInterval(() => {
              elem.click();
            }, 1000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    () => {
      //  no
    },
    {
      backgroundColor: '#eee',
      titleColor: '#ff6b01',
      okButtonBackground: '#ff6b01',
    }
  );
}

// registration
if (formReg) {
  formReg.addEventListener('submit', e => {
    e.preventDefault();

    const username = formReg.username.value;
    const email = formReg.email.value;
    const password = formReg.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        // тут ховаємо можливість логіну
        user = userCredential.user;
        refs.open.setAttribute('href', './library.html');
        refs.open.removeEventListener('click', onLibraryClick);
        refsRegistration.backdrop.classList.add('is-hidden');
        set(ref(database, 'users/' + user.uid), {
          email: email,
          username: username,
        })
          .then(() => {
            // Data saved successfully!
            Notiflix.Notify.success(`Hello ${username}. Glad to see you!`, {
              position: 'center-top',
            });
          })
          .catch(error => {
            // The write failed...
            console.log(error);
          });
        if (window.location.pathname === '/index.html' && !isModalOpen.isOpen) {
          setInterval(() => {
            refs.open.click();
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Incorrect data. Please, try again.', {
          position: 'center-top',
        });
      });
    formSign.username.value = '';
    formSign.email.value = '';
    formSign.password.value = '';
  });
}

// singIn
if (formSign) {
  formSign.addEventListener('submit', e => {
    e.preventDefault();

    const email = formSign.email.value;
    const password = formSign.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        refs.backdrop.classList.add('is-hidden');
        refs.open.setAttribute('href', './library.html');
        refs.open.removeEventListener('click', onLibraryClick);
        Notiflix.Notify.success('Welcome!', {
          position: 'center-top',
        });
        getFilmsFromDB(user);
        if (window.location.pathname === '/index.html' && !isModalOpen.isOpen) {
          setInterval(() => {
            refs.open.click();
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Incorrect data. Please, try again.', {
          position: 'center-top',
        });
      });
    formSign.email.value = '';
    formSign.password.value = '';
  });
}

// функція оновлення бази данних фільмів
export function updateDB(uid) {
  const last_date = new Date();
  const userWatched = getFilms(KEYS.WATCHED);
  const userQueue = getFilms(KEYS.QUEUE);

  const data = {
    watched: userWatched,
    queue: userQueue,
  };

  update(ref(database, 'users/' + uid), {
    lastLogin: last_date,
    films: data,
  })
    .then(() => {
      Notiflix.Notify.success('Update', {
        position: 'center-top',
      });
    })
    .catch(err => {
      Notiflix.Notify.failure('Try again later...', {
        position: 'center-top',
      });
      console.log(err);
    });
}

function getFilmsFromDB(user) {
  const starCountRef = ref(database, 'users/' + user.uid);
  let dataFilms;
  onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    if (data.films.watched) {
      localStorage.setItem(KEYS.WATCHED, JSON.stringify(data.films.watched));
    }
    if (data.films.queue) {
      localStorage.setItem(KEYS.QUEUE, JSON.stringify(data.films.queue));
    }
  });
  return dataFilms;
}
