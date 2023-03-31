// import { initializeApp } from 'firebase/app';
// import {
//   getDatabase,
//   set,
//   ref,
//   onValue,
//   update,
//   remove,
// } from 'firebase/database';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAve7rnA0rNZ2yYsLwpVyVI_ARUeBe9oLY',
//   authDomain: 'filmoteka-b4806.firebaseapp.com',
//   projectId: 'filmoteka-b4806',
//   storageBucket: 'filmoteka-b4806.appspot.com',
//   messagingSenderId: '503099436389',
//   appId: '1:503099436389:web:8034875e0ecf8a6d41058c',
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// export const auth = getAuth();

// const refs = {
//   btnOpen: document.querySelector('.open-auth'),
//   overlay: document.querySelector('.overlay'),
//   modalLogin: document.querySelector('.modal-auth__login'),
//   formLogin: document.querySelector('.auth-form__login'),
//   emailLogin: document.querySelector('#authEmailLogin'),
//   passwordLogin: document.querySelector('#authPasswordLogin'),
//   btnSubmitLogin: document.querySelector('#authSubmitLogin'),
//   registration: document.querySelector('.registration'),
//   tologin: document.querySelector('.tologin'),
//   modalSingin: document.querySelector('.modal-auth__singin'),
//   formSingin: document.querySelector('.auth-form__singin'),
//   emailSingin: document.querySelector('#authEmailSingin'),
//   passwordSingin: document.querySelector('#authPasswordSingin'),
//   btnSubmitSingin: document.querySelector('#authSubmitSingin'),
// };

// const {
//   btnOpen,
//   overlay,
//   formLogin,
//   emailLogin,
//   passwordLogin,
//   btnSubmitLogin,
//   registration,
//   modalLogin,
//   modalSingin,
//   formSingin,
//   emailSingin,
//   passwordSingin,
//   btnSubmitSingin,
//   tologin,
// } = refs;

// let isModalOpen = false;
// let currentUser = null;

// btnOpen.addEventListener('click', onBtnOpenClick);

// function onBtnOpenClick() {
//   btnOpen.removeEventListener('click', onBtnOpenClick);
//   overlay.classList.remove('visually-hidden');
//   overlay.addEventListener('click', onOverlayClick);
//   window.addEventListener('keydown', onOverlayClick);
//   formLogin.addEventListener('submit', onSubmitLogin);
//   formSingin.addEventListener('submit', onSubmitSingin);
//   registration.addEventListener('click', onRegistClick);
//   tologin.addEventListener('click', onRegistClick);
//   isModalOpen = true;
// }

// function onOverlayClick(e) {
//   if (e.currentTarget === e.target || e.code === 'Escape') {
//     overlay.classList.add('visually-hidden');
//     overlay.removeEventListener('click', onOverlayClick);
//     window.removeEventListener('keydown', onOverlayClick);
//     formLogin.removeEventListener('submit', onSubmitLogin);
//     formSingin.removeEventListener('submit', onSubmitSingin);
//     btnOpen.addEventListener('click', onBtnOpenClick);
//     registration.removeEventListener('click', onRegistClick);
//     tologin.removeEventListener('click', onRegistClick);
//     isModalOpen = false;
//   }
// }

// function onRegistClick() {
//   modalLogin.classList.toggle('visually-hidden');
//   modalSingin.classList.toggle('visually-hidden');
// }

// function onSubmitLogin(e) {
//   e.preventDefault();
//   if (
//     validateEmail(emailLogin) === false ||
//     validatePassword(passwordLogin) === false
//   ) {
//     return;
//   }
//   signInWithEmailAndPassword(auth, email.value, password.value)
//     .then(userData => {
//       const user = userData.user;
//       const dt = new Date();
//       update(ref(db, 'users/' + user.uid), {
//         last_login: dt,
//       });
//       formLogin.reset();
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   currentUser = auth.currentUser;
//   console.log(currentUser);
// }

// function onSubmitSingin(e) {
//   e.preventDefault();
//   if (
//     validateEmail(emailSingin) === false ||
//     validatePassword(passwordSingin) === false
//   ) {
//     return;
//   }
//   createUserWithEmailAndPassword(auth, emailSingin, passwordSingin)
//     .then(userData => {
//       const user = userData.user;
//       set(ref(db, 'users/' + user.uid), {
//         email: emailSingin,
//       });
//       formSingin.reset();
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   currentUser = auth.currentUser;
// }

// // validate
// function validateEmail(email) {
//   const expression = /^[^@]+@\w+(\.\w+)+\w$/;
//   if (expression.test(email) === true) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function validatePassword(password) {
//   if (password.length < 6) {
//     return false;
//   } else {
//     return true;
//   }
// }

// onAuthStateChanged(auth, user => {
//   if (user) {
//     const uid = user.uid;
//     console.log(auth.currentUser);
//     console.log(uid);
//   }
// });
