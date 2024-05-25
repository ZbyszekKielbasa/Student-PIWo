import { addDoc, collection, query, where, serverTimestamp, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "./init";

export const readData = async () => {
    const todos = [];

    const dataCollection = collection(firestore, "hotels");
    const user = auth?.currentUser;

    if (!user) {
        return todos;
    }

    const q = query(dataCollection, where("userId", "==", user.uid));
    const results = await getDocs(q);

    results.forEach(doc => {
        // todos.push(doc.data()) // pobiera sam obiekt
        todos.push({ id: doc.id, ...doc.data() }); // pobiera obiekt i jego Firestore'owe ID
    })

    return todos;
}

export const createData = async (newData) => {

    const tempData = {
        ...newData, // {id: ..., text: ... }
        userId: auth?.currentUser.uid,
    }
    const dataCollection = collection(firestore, "hotels");
    const docRef = await addDoc(dataCollection, tempData);
}

export const updateData = async (dataId, updatedData) => {
    const dataCollection = collection(firestore, "hotels");
    const q = query(dataCollection, where("id", "==", dataId)); // Adjust "id" if the field has a different name

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }

        // Assuming there is only one document with this ID, or you only want to update the first found
        querySnapshot.forEach(async (document) => {
            const docRef = doc(firestore, "hotels", document.id);
            await updateDoc(docRef, updatedData);
            console.log("Data updated for ID:", document.id);
        });
    } catch (error) {
        console.error("Error updating data:", error);
    }
};


export const deleteData = async (dataId) => {
    // tak samo jak updateTodo
    const dataDocRef = doc(firestore, "hotels", dataId);
    try {
        await deleteDoc(dataDocRef);
        console.log("Data deleted:", dataId);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}
