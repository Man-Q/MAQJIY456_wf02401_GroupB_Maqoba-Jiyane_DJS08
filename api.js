import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc
} from "firebase/firestore/lite"

// const firebaseConfig = {
//     apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
//     authDomain: "vanlife-a1af5.firebaseapp.com",
//     projectId: "vanlife-a1af5",
//     storageBucket: "vanlife-a1af5.appspot.com",
//     messagingSenderId: "803007000356",
//     appId: "1:803007000356:web:446cd3a1ca406839258db1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCzD1DBpfGi4nJwQpYD2l06xeMMj5tohSg",
  authDomain: "djs08-ce542.firebaseapp.com",
  projectId: "djs08-ce542",
  storageBucket: "djs08-ce542.appspot.com",
  messagingSenderId: "205327929015",
  appId: "1:205327929015:web:bd7a45fb2c7e6752f4c732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}