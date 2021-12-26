import { firebase } from "./initFirebase";

export const storage = firebase.storage();
const db = firebase.firestore();

export const getAllPosts = () => {
  const ref = db.collection("posts");
  return ref;
};

export const addPost = async (formValues) => {
  const ref = db.collection("posts");
  const res = await ref.add({
    ...formValues,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    owner: firebase.auth().currentUser.uid,
  });
  return res;
};

export const getUser = (uid) => {
  const ref = db.collection("users").doc(uid);
  return ref;
};

export const bookPost = async (postId, formValues) => {
  const ref = db.collection("posts").doc(postId);
  const res = await ref.update({
    ...formValues,
    seatLeft: firebase.firestore.FieldValue.increment(-1),
  });
  return res;
};
