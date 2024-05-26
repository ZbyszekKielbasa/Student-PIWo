import {addDoc, collection, doc, getDocs, query, serverTimestamp, where} from "firebase/firestore";
import { firestore, auth } from "./init";

export const createMessage = async (messageData) => {
    // Ensure that the messageData object includes necessary properties such as recipientId, text, etc.
    const fullMessageData = {
        ...messageData,
        senderId: auth?.currentUser?.uid, // Assuming the current user is the sender
        timestamp: serverTimestamp(), // Adds a timestamp for when the message is created
    };

    // Reference the "messages" collection instead of "hotels"
    const messagesCollection = collection(firestore, "messages");

    // Add the message to the Firestore collection
    try {
        const docRef = await addDoc(messagesCollection, fullMessageData);
        console.log("Message added with ID:", docRef.id);
        return docRef; // Optionally return the document reference
    } catch (error) {
        console.error("Error adding message:", error);
        throw error; // Rethrow to handle the error in the calling function
    }
};


export const fetchUsersWithMessages = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error("No user logged in");
        return;
    }

    const userId = currentUser.uid;
    const usersSet = new Set(); // To hold unique user IDs

    try {
        // Fetch messages where the current user is the sender
        const sentMessagesQuery = query(
            collection(firestore, "messages"),
            where("senderId", "==", userId)
        );
        const receivedMessagesQuery = query(
            collection(firestore, "messages"),
            where("recipientId", "==", userId)
        );

        // Execute the queries
        const [sentMessages, receivedMessages] = await Promise.all([
            getDocs(sentMessagesQuery),
            getDocs(receivedMessagesQuery)
        ]);

        // Extract user IDs from received messages
        sentMessages.forEach(doc => {
            const data = doc.data();
            usersSet.add(data.recipientId); // Add recipient IDs to the set
        });

        // Extract user IDs from sent messages
        receivedMessages.forEach(doc => {
            const data = doc.data();
            usersSet.add(data.senderId); // Add sender IDs to the set
        });

        return Array.from(usersSet); // Convert set to array to remove duplicates
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

export const fetchMessagesBetweenUsers = async (otherUserId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return [];

    const messagesCollection = collection(firestore, "messages");
    const sentMessagesQuery = query(messagesCollection, where("senderId", "==", currentUser.uid), where("recipientId", "==", otherUserId));
    const receivedMessagesQuery = query(messagesCollection, where("recipientId", "==", currentUser.uid), where("senderId", "==", otherUserId));

    try {
        const [sentMessagesSnapshot, receivedMessagesSnapshot] = await Promise.all([
            getDocs(sentMessagesQuery),
            getDocs(receivedMessagesQuery)
        ]);

        const messages = [];
        sentMessagesSnapshot.forEach(doc => {
            messages.push(doc.data());
        });
        receivedMessagesSnapshot.forEach(doc => {
            messages.push(doc.data());
        });

        return messages;
    } catch (error) {
        console.error("Error fetching messages: ", error);
        return [];
    }
};
