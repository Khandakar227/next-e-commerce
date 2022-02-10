import { auth, db } from "../config/firebase";
import { sendEmailVerification } from 'firebase/auth'

function emailRegister({ email, password }) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function registerDatabase({ id, email, name, surname }) {
  return db.collection("Users").doc(id).set({
    name,
    surname,
    email,
    addresses: [],
    cart: {},
    favorites: [],
    orders: [],
    phoneNumber: "",
    photoUrl: null,
  });
}

/**
 * @param {import("firebase/auth").User} user
 */
async function sendVerificationLink(user) {
  await sendEmailVerification(user);
  return "Almost done. You need to verify your email. A verification link was sent to your email.";
}

export { emailRegister, registerDatabase, sendVerificationLink };
