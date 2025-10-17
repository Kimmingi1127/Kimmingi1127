
import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './App.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

// Simple SVG icons as components
const UserAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#007bff" className="avatar">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const BotAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#6c757d" className="avatar">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your personal Gemini assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botMessage: Message = { text: data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to fetch:", error);
      const errorMessage: Message = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Container className="chat-window">
        <Card className="flex-grow-1">
          <Card.Header as="h5" className="chat-header">Gemini Chatbot</Card.Header>
          <Card.Body className="chat-body">
            <ul className="message-list">
              {messages.map((msg, index) => (
                <li key={index} className={`message-item ${msg.sender}`}>
                  {msg.sender === 'bot' && <BotAvatar />}
                  <div className="message-content">
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && <UserAvatar />}
                </li>
              ))}
              {isLoading && (
                <li className="message-item bot">
                  <BotAvatar />
                  <div className="message-content typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </li>
              )}
            </ul>
            <div ref={messagesEndRef} />
          </Card.Body>
          <Card.Footer className="chat-footer">
            <Form onSubmit={handleSendMessage} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
              <Button variant="primary" type="submit" disabled={isLoading} className="ms-2">
                Send
              </Button>
            </Form>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default App;
