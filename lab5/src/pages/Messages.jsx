import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { fetchUsersWithMessages, fetchMessagesBetweenUsers, createMessage } from '../data/messageService';
import TopBar from "../components/TopBar";
import { auth } from "../data/init";

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');  // State for the message input
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUsersWithMessages().then(userIds => {
            setUsers(userIds);
        });
    }, []);

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
        fetchMessagesBetweenUsers(userId).then(fetchedMessages => {
            const sortedMessages = fetchedMessages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
            setMessages(sortedMessages);
            setIsModalOpen(true);
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const sendMessage = async () => {
        if (newMessage.trim() === '') {
            alert('Please enter a message before sending.');
            return;
        }

        try {
            await createMessage({
                recipientId: selectedUser,
                text: newMessage,
                senderId: auth.currentUser.uid
            });
            setMessages([...messages, {
                text: newMessage,
                senderId: auth.currentUser.uid,
                timestamp: {seconds: Math.floor(Date.now() / 1000)} // Simulating the Firebase timestamp
            }]);
            setNewMessage(''); // Reset the input after sending
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message: ' + error.message);
        }
    };

    const currentUserId = auth.currentUser.uid;

    return (
        <div>
            <TopBar/>

            <section>
                <p className="title-large">Users with Messages</p>
            </section>

            <ul className="user-list">
                {users.map(userId => (
                    <li key={userId} onClick={() => handleUserClick(userId)} className="user-list-item">
                        {userId}
                    </li>
                ))}
            </ul>
            {selectedUser && isModalOpen && (
                <Modal key={isModalOpen} isOpen={isModalOpen} onClose={closeModal}>
                    <h2>Messages with {selectedUser}</h2>
                    <ul>
                    {messages.map((msg, index) => (
                            <li key={index} className={`message ${msg.senderId === currentUserId ? 'message-right' : 'message-left'}`}>
                                {msg.text} - {new Date(msg.timestamp.seconds * 1000).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message here..." />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Messages;
