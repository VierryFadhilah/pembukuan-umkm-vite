import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const getDataList = async (table, search, perPage, lastData) => {
  const fetchData = async (q) => {
    try {
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  const docRef = collection(db, table);

  if (lastData) {
    const q = query(
      docRef,
      orderBy("search"),
      startAfter(lastData),
      limit(perPage)
    );
    return fetchData(q);
  } else if (search) {
    const q = query(
      docRef,
      orderBy("search"),
      startAt(search.toLowerCase()),
      endAt(search.toLowerCase() + "\uf8ff"),
      limit(perPage)
    );

    return fetchData(q);
  } else {
    const q = query(docRef, orderBy("search"), limit(perPage));

    return fetchData(q);
  }
};

const deleteData = async (table, id) => {
  try {
    const docRef = doc(db, table, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
const getData = async (table, id) => {
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

const insertData = async (table, data, id) => {
  try {
    if (id) {
      const rolesRef = doc(db, table, id);
      const docRef = await setDoc(rolesRef, data);
      return id;
    } else {
      const rolesRef = collection(db, table);

      const docRef = await addDoc(rolesRef, data);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

const createUser = (email, password) => {
  const csu = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
    });

  return csu;
};

const currentUser = () => {
  const user = auth.currentUser;
};

const loginEmployee = async (email, password) => {
  const userRef = collection(db, "user");
  const q = query(
    userRef,
    where("email", "==", email),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);
  let data;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = { id: doc.id, data: doc.data() };
  });

  return data;
};

const Api = {
  loginEmployee,
  currentUser,
  insertData,
  getData,
  getDataList,
  deleteData,
  createUser,
};

export default Api;
