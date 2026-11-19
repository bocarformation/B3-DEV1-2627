import type { Message } from "../types/message";

interface Props {
    message: Message
}

export default function MessageBubble({message}: Props) {

    return (
        <div className={`bubble ${message.role}`}>
            <strong>{message.role === "user" ? "Vous" : "Assistant"}</strong>
            <p>{message.content}</p>
        </div>
    )
}