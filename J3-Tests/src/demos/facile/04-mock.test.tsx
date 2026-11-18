// DÉMO 4 : une fausse fonction (mock) pour vérifier qu'un composant appelle bien son callback.
// npm run demo:mock
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function BoutonVote({ choix, onVote }: { choix: string; onVote: (choix: string) => void }) {
  return <button onClick={() => onVote(choix)}>Voter {choix}</button>;
}

describe("BoutonVote", () => {
  it("appelle onVote avec le choix", async () => {
    const onVote = vi.fn(); // Vitest. Dans le cours (Jest) : jest.fn(). Même chose.
    render(<BoutonVote choix="TypeScript" onVote={onVote} />);

    await userEvent.click(screen.getByRole("button", { name: "Voter TypeScript" }));

    expect(onVote).toHaveBeenCalledTimes(1);
    expect(onVote).toHaveBeenCalledWith("TypeScript");
  });

  it("un mock peut aussi renvoyer une valeur", () => {
    const lireNote = vi.fn().mockReturnValue(18);
    expect(lireNote()).toBe(18);
    expect(lireNote).toHaveBeenCalled();
  });
});
