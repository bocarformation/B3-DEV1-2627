import type { Message } from "../types/message"

export async function sendChat(messages: Message[]): Promise<string> {
    const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            messages: messages.map(({role, content}) => ({role, content}))
        })
    })

    if(!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data: unknown = await response.json();

    if(!data || typeof data !== "object" || !("reply" in data) || typeof data.reply !== "string") {
        throw new Error("Réponse du serveur invalide");
    }
    console.log(data.reply);
    
    return data.reply
}