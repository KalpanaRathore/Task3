import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [tweets, setTweets] = useState([]);

    const handleSendMessage = async () => {
        if (input.trim() !== '') {
            const newMessage = { text: input, user: 'user' };
            setMessages([...messages, newMessage]);

            try {
                const response = await axios.post('http://localhost:8080/api/getTweets', { query: input });
                setTweets(response.data);
            } catch (error) {
                console.error('Error fetching tweets:', error);
            }

            setInput('');
        }
    };

    return (
        <div>
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div key={index} className={message.user === 'user' ? 'user-message' : 'bot-message'}>
                        {message.text}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
            <div className="tweets">
                {tweets.map((tweet, index) => (
                    <div key={index} className="tweet">
                        <p>{tweet.text}</p>
                        <small>{tweet.created_at}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chatbot;
