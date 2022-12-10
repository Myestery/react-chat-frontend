import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";

// import { setAuthorization } from "../api/apiCore";

// Add the Firebase products that you want to use

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setLoggeedInUser(user);
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
              setLoggeedInUserToken(idToken);
            });
        } else {
          localStorage.removeItem("authUser");
          localStorage.removeItem("authUser:Token");
          console.log("User is signed out.");
        }
      });
    }
  }

  /**
   * Registers the user with given details
   */
  registerUser = (email, password, data = {}) => {
    // console.log("registerUser", email, password, data);
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            // create some initial records
            // bookmarks
            this.db
              .collection("users")
              .doc(user.user.uid)
              .set({
                firstName: data.firstname,
                lastName: data.lastname,
                title: "",
                description: "active for chats and calls",
                fullName: data.firstname + " " + data.lastname,
                email,
                location: "",
                avatar: "",
                coverImage: "",
              });
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            const currentUser = JSON.stringify(firebase.auth().currentUser);
            resolve(currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * forget Password user with given details
   */
  forgetPassword = email => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Social Login user with given details
   */
  socialLoginUser = (data, type) => {
    let credential = {};
    if (type === "google") {
      credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.token
      );
    } else if (type === "facebook") {
      credential = firebase.auth.FacebookAuthProvider.credential(data.token);
    }
    return new Promise((resolve, reject) => {
      if (!!credential) {
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            let userL = this.addNewUserToFirestore(user);
            userL = JSON.stringify(userL);
            resolve(userL);
          })
          .catch(error => {
            reject(this._handleError(error));
          });
      } else {
        // reject(this._handleError(error));
      }
    });
  };

  addNewUserToFirestore = user => {
    const collection = firebase.firestore().collection("users");
    const { profile } = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return { user, details };
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem("authUser")) return null;
    return JSON.parse(localStorage.getItem("authUser"));
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend = null;

const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

const setLoggeedInUserToken = user => {
  localStorage.setItem("authUser:Token", user.data.access_token);
};

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export {
  initFirebaseBackend,
  getFirebaseBackend,
  setLoggeedInUser,
  setLoggeedInUserToken,
};
