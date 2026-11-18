// DÉMO 3 : simuler un clic avec user-event, puis vérifier le nouvel affichage.
// npm run demo:click
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function Compteur() {
  const [n, setN] = useState(0);
  return (
    <div>
      <p>Compteur : {n}</p>
      <button onClick={() => setN(n + 1)}>Plus un</button>
    </div>
  );
}

describe("Compteur", () => {
  it("commence à 0", () => {
    render(<Compteur />);
    expect(screen.getByText("Compteur : 0")).toBeInTheDocument();
  });

  // async + await : user-event renvoie une promesse (il simule souris, focus, clavier... pas à pas)
  it("passe à 2 après deux clics", async () => {
    render(<Compteur />);
    const bouton = screen.getByRole("button", { name: "Plus un" });
    await userEvent.click(bouton);
    await userEvent.click(bouton);
    expect(screen.getByText("Compteur : 2")).toBeInTheDocument();
  });

  it("tape du texte dans un champ", async () => {
    render(<input placeholder="Nom" />);
    const champ = screen.getByPlaceholderText("Nom");
    await userEvent.type(champ, "Ada");
    expect(champ).toHaveValue("Ada");
  });
});
