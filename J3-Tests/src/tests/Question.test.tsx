import { render, screen } from "@testing-library/react"
import { Question } from "../components/Question"
import type { PollModel } from "../models/poll-model";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Question", () => {

    const onChange = vi.fn();

    const question: PollModel.Question =  {
        id:"1",
        title: "Quel est ton langage préféré ?"
    }

    const Wrapper = () => {
        const [title, setTitle] = useState(question.title);
        return <Question
                    question={{...question, title}}
                    onChange={(id, value) => {
                        setTitle(value); // ça sert à mettre à jour l'écran (parent)
                        onChange(id, value); // prévenir le mock afin de vérifier l'appel 
                    }}
                    />
    }

    const setup = () => {
        render(<Wrapper />);
    };

    it("should display input", () => {
        setup();
        expect(screen.getByDisplayValue("Quel est ton langage préféré ?")).toBeInTheDocument();
    });


    it("should display add button", () => {
        setup();
        expect(screen.getByRole("button", {name: "Ajouter une réponse"})).toBeInTheDocument();
    });

    it("should call onChange when input is changed", async () => {
        setup();  // Arrange
        const input = screen.getByDisplayValue("Quel est ton langage préféré ?");
        await userEvent.clear(input); // Act
        await userEvent.type(input,"Quel est ta techno que tu détestes le plus ?");
        expect(onChange).toHaveBeenCalledWith("1", "Quel est ta techno que tu détestes le plus ?"); // Assert
    })


})