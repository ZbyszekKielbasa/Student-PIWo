import { addDoc, collection, query, where, serverTimestamp, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "./init";

export const readData = async () => {
    const todos = [];

    const dataCollection = collection(firestore, "hotels");
    const user = auth?.currentUser;

    // if (!user) {
    //     return todos;
    // }

    //const q = query(dataCollection, where("userId", "==", user.uid));
    const q = query(dataCollection);
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
    const q = query(dataCollection, where("id", "==", dataId));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return { success: false, message: 'No matching document found' };
        }

        let updatePermissionDenied = true;
        for (const document of querySnapshot.docs) {
            if (document.data().userId === auth.currentUser.uid) {
                const docRef = doc(firestore, "hotels", document.id);
                await updateDoc(docRef, updatedData);
                updatePermissionDenied = false;
                console.log("Data updated for ID:", document.id);
                return { success: true };  // Return immediately upon successful update
            }
        }

        if (updatePermissionDenied) {
            return { success: false, message: 'Permission denied' };
        }
    } catch (error) {
        console.error("Error updating data:", error);
        return { success: false, message: error.message };
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
