import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

async function isHandleAvailable(handle: string) {
  const res = await firebase.database().ref(`/handles/${handle}`).once('value');
  return !res.exists();
}

async function getUserHandle(uid: string) {
  const res = await firebase.database().ref(`/users/${uid}`).once('value');
  return res.val();
}

async function getUserBio(uid: string) {
  const res = await firebase.database().ref(`/profiles/bio/${uid}`).once('value');
  return res.val();
}

async function getUserAvatar(uid: string) {
  const res = await firebase.database().ref(`/profiles/avatar/${uid}`).once('value');
  return res.val();
}

async function getUserBackground(uid: string) {
  const res = await firebase.database().ref(`/profiles/background/${uid}`).once('value');
  return res.val();
}

async function isSubHandleAvailable(handle: string) {
  const res = await firebase.database().ref(`/subhandles/${handle}`).once('value');
  return !res.exists();
}

async function registerHandle(handle: string, uid: string) {
  try {
    await firebase.database().ref('/users').update({
      [uid]: handle.toLowerCase(),
    });
  } catch (e) {
    throw new Error(e);
  }
  try {
    await firebase.database().ref('/handles').update({
      [handle.toLowerCase()]: uid,
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function updateProfile(uid: string, bio: string, avatar: string, background: string) {
  console.log(21212)
  try {
    await firebase.database().ref('/profiles/bio').update({
      [uid]: bio,
    });

    await firebase.database().ref('/profiles/avatar').update({
      [uid]: avatar,
    });

    await firebase.database().ref('/profiles/background').update({
      [uid]: background,
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function updateAddress(handle: string, coin: string, address: string) {
  return firebase.database().ref(`/coins/${coin}`).update({
    [handle]: address,
  });
}

async function removeAddress(handle: string, coin: string) {
  return firebase.database().ref(`/coins/${coin}/${handle}`).remove();
}

async function registerUser(email: string, password: string) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function logInUser(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

async function logInUserCustom(token: string) {
  return firebase.auth().signInWithCustomToken(token);
}

async function logInUserFromGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

async function resetPassword(email: string) {
  return firebase.auth().sendPasswordResetEmail(email);
}

async function getUserAddresses(handle: string) {
  const res = await firebase.database().ref('/coins').once('value');
  const addresses: AddressesInterface = res.val() === null ? [] : res.val();
  const userAddresses: UserAddressesInterface = {};

  if (Object.keys(addresses).length === 0) {
    return userAddresses;
  }

  for (let i = 0; i < Object.keys(addresses).length; i += 1) {
    const coin = Object.keys(addresses)[i];

    if (addresses[coin][handle]) {
      userAddresses[coin] = addresses[coin][handle];
    }
  }

  return userAddresses;
}

async function sendEmailVerification(user: firebase.User) {
  return user.sendEmailVerification();
}

export {
  isHandleAvailable,
  isSubHandleAvailable,
  registerHandle,
  updateAddress,
  registerUser,
  logInUser,
  logInUserFromGoogle,
  getUserAddresses,
  getUserHandle,
  removeAddress,
  resetPassword,
  sendEmailVerification,
  logInUserCustom,
    getUserAvatar,
    getUserBackground,
    getUserBio,
  updateProfile
};
