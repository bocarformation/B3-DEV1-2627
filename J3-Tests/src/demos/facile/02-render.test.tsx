// DÉMO 2 : afficher un composant et vérifier ce que l'UTILISATEUR voit.
// npm run demo:render
import { render, screen } from "@testing-library/react";

function Bonjour({ prenom }: { prenom: string }) {
  return (
    <div>
      <h1>Bonjour {prenom}</h1>
      <input placeholder="Votre email" defaultValue="ada@3wa.fr" />
    </div>
  );
}

describe("Bonjour", () => {
  it("affiche le prénom", () => {
    render(<Bonjour prenom="Ada" />); // dessine le composant dans un faux navigateur (jsdom)
    // screen.debug()
    expect(screen.getByText("Bonjour Ada")).toBeInTheDocument();
  });
 
  it("trouve les éléments comme un utilisateur", () => {
    render(<Bonjour prenom="Ada" />);
    expect(screen.getByRole("heading", { name: "Bonjour Ada" })).toBeInTheDocument(); // par rôle (le meilleur)
    expect(screen.getByPlaceholderText("Votre email")).toBeInTheDocument(); // par placeholder
    expect(screen.getByDisplayValue("ada@3wa.fr")).toBeInTheDocument(); // par valeur affichée dans un input
  });

});
