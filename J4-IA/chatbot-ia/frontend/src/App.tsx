import { useEffect, useRef, useState } from 'react'
import './App.css'
import type { Message } from './types/message'
import MessageBubble from './components/MessageBubble';
import { sendChat } from './services/chatService';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {id: "welcome", role: "assistant", content: "Bonjour, posez-moi une question !"}
  ]);

  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])
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
      setLoading(true);
      setError("");
      const reply = await sendChat(updatedMessage);
      setMessages(p =>  [...p, {
        id: crypto.randomUUID(), role: "assistant", content: reply
      }]);
    } catch (e) {
      setMessages(p => [...p, {id: crypto.randomUUID(), role:"assistant", content: "Serveur indisponible, réessayez"}])
    }finally{
      setLoading(false);
    }

  }

  return (
      <main className="app">
      <header className="chat-header">
        <h1>Mon assistant IA</h1>
        <p>Conversation locale</p>
        <button type='button' className='reset'
          onClick={() => setMessages([
            {id: "welcome", role:"assistant","content": "Bonjour, de quoi avez vous besoin ?"}
          ])}>
            Nouvelle conversation
          </button>
        </header>
      <section className="messages" aria-live="polite">
        {messages.map(message => <MessageBubble key={message.id} message={message} />)}
        <div ref={bottomRef} />
        {loading && <p role='status'>L'assistant rédige sa réponse...</p>}
        {error && <p role="alert" className='error'>{error}</p>}
      </section>
      <form className="composer" onSubmit={sendMessage}>
        <input aria-label="Votre message" value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Écrivez votre question..." disabled={loading}/>
        <button disabled={loading || !input.trim()}>Envoyer</button>
      </form>
      <p className="disclaimer">
        Les réponses sont générées par IA et peuvent contenir des erreurs.
        Pas de données perso et confidentielles
      </p>
    </main>
  )
}

export default App
