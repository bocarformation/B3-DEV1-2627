import type React from "react";
import type { PollModel } from "../models/poll-model";

export const Question: React.FC<{
    question: PollModel.Question
    onChange: (id: string, value: string) => void
}> = ({ question, onChange }) => {
    return (
        <div>
            <input
                value={question.title}
                placeholder="Saisir la question"
                onChange={(e) => onChange(question.id, e.target.value)} />
                
            <button type="button">Ajouter une réponse</button>
        </div>
    )
}
