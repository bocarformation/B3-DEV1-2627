import { useState } from 'react'
import './App.css'
import type { Message } from './types/message'
import MessageBubble from './components/MessageBubble';
import { sendChat } from './services/chatService';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {id: "welcome", role: "assistant", content: "Bonjour, posez-moi une question !"}
  ]);

  const [input, setInput] = useState("");

  async function sendMessage(event: React.SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    const content = input.trim();

    if(!content) return; 
    
    const userMessage: Message = {
      id: crypto.randomUUID(), role: "user", content
    };
    
    const updatedMessage = [...messages, userMessage];
    setMessages(updatedMessage);
    setInput("");
    try {
      const reply = await sendChat(updatedMessage);
      setMessages(p =>  [...p, {
        id: crypto.randomUUID(), role: "assistant", content: reply
      }]);
    } catch (e) {
      setMessages(p => [...p, {id: crypto.randomUUID(), role:"assistant", content: "Serveur indisponible, réessayez"}])
    }
  }

  return (
      <main className="app">
      <header className="chat-header">
        <h1>Mon assistant IA</h1>
        <p>Conversation locale</p>
        </header>
      <section className="messages" aria-live="polite">
        {messages.map(message => <MessageBubble key={message.id} message={message} />)}
      </section>
      <form className="composer" onSubmit={sendMessage}>
        <input aria-label="Votre message" value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Écrivez votre question..." />
        <button disabled={!input.trim()}>Envoyer</button>
      </form>
    </main>
  )
}

export default App
