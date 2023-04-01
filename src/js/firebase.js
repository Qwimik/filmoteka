import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, set, ref, onValue, update } from 'firebase/database';

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

// форма реєстрації
const form = document.querySelector('#auth-form');
form.addEventListener('submit', e => {
  e.preventDefault();

  const email = form.authEmail.value;
  const password = form.authPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: email,
        films: [],
      })
        .then(() => {
          // Data saved successfully!
          // notiflix - success
        })
        .catch(error => {
          // The write failed...
          // notiflix - error
          console.log(error);
        });
    })
    .catch(error => {
      // notiflix - error
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// форма входу в аккаунт
const formLogin = document.querySelector('#auth-formLogin');
formLogin.addEventListener('submit', e => {
  e.preventDefault();

  const email = formLogin.authEmail.value;
  const password = formLogin.authPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      // запит в бд за фільмами
      const starCountRef = ref(database, 'users/' + user.uid);
      onValue(starCountRef, snapshot => {
        const data = snapshot.val();
        console.log(data);
      });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

// вийти з акаунту
const btnSignout = document.querySelector('#signout');
btnSignout.addEventListener('click', e => {
  signOut(auth)
    .then(() => {
      // notiflix - вихід з акаунту
    })
    .catch(err => {
      // notiflix - помилка виходу з акаунту
      console.log(err);
    });
});

// функція додавання-видалення в базу данних фільмів
export function onUpdateAuthStorage() {
  const last_date = new Date();
  // стягуємо з localstorage дані
  //const data = [];

  update(ref(database, 'users/' + user.uid), {
    lastLogin: last_date,
    // записуємо в бд
    //films: data;
  })
    .then(() => {
      // notiflix - success
    })
    .catch(err => {
      // notiflix - error
      console.log(err);
    });
}
