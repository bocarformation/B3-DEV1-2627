// ERREUR VOLONTAIRE 2 : oublier le await devant userEvent.
// npm run erreur:await  => 1 rouge, 1 vert
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function Compteur() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Clics : {n}</button>;
}

describe("await userEvent", () => {
  it("ROUGE : sans await, on vérifie AVANT que le clic soit fini", async () => {
    render(<Compteur />);
    userEvent.click(screen.getByRole("button")); // promesse non attendue (VS Code ne dit rien)
    expect(screen.getByRole("button")).toHaveTextContent("Clics : 1"); // reçoit encore « Clics : 0 »
  });

  it("VERT : avec await", async () => {
    render(<Compteur />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("Clics : 1");
  });
});
