// ERREUR VOLONTAIRE 3 : le warning « not wrapped in act(...) ».
// npm run erreur:act  => les 2 tests sont VERTS, mais le 1er affiche un gros message rouge dans le terminal.
import { render, screen } from "@testing-library/react";
import { useEffect, useState } from "react";

// Faux appel réseau (comme une gateway dans EventHub)
const chargerPrenom = () => new Promise<string>((resolve) => setTimeout(() => resolve("Ada"), 10));

function Profil() {
  const [prenom, setPrenom] = useState<string | null>(null);
  useEffect(() => {
    chargerPrenom().then(setPrenom);
  }, []);
  return <p>{prenom ? `Bonjour ${prenom}` : "Chargement..."}</p>;
}

describe("act warning", () => {
  it("WARNING : le composant se met à jour APRÈS ce que le test regarde", async () => {
    render(<Profil />);
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
    // Le test « attend » autre chose pendant que la promesse se résout : la mise à jour arrive hors de act()
    await new Promise((r) => setTimeout(r, 50));
  });

  it("VERT et silencieux : findBy attend l'affichage final (il enveloppe tout dans act)", async () => {
    render(<Profil />);
    expect(await screen.findByText("Bonjour Ada")).toBeInTheDocument();
  });
});

// Règle : un warning act = « quelque chose a changé à l'écran et ton test ne l'a pas attendu ».
// Remède : attendre ce que voit l'utilisateur (await findBy..., await userEvent..., await waitFor(...)).
// Ne PAS envelopper soi-même dans act() en premier réflexe.
