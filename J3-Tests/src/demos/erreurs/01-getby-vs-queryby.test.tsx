// ERREUR VOLONTAIRE 1 : getBy... sur un élément qui N'EXISTE PAS.
// npm run erreur:getby  => 1 rouge, 1 vert
import { render, screen } from "@testing-library/react";

function Formulaire({ erreur }: { erreur?: string }) {
  return <div>{erreur && <p role="alert">{erreur}</p>}</div>;
}

describe("getBy vs queryBy", () => {
  it("ROUGE : getByRole lève une erreur AVANT même d'arriver à .not", () => {
    render(<Formulaire />);
    // TestingLibraryElementError: Unable to find an accessible element with the role "alert"
    expect(screen.getByRole("alert")).not.toBeInTheDocument();
  });

  it("VERT : queryByRole renvoie null, et .not.toBeInTheDocument() passe", () => {
    render(<Formulaire />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

// Mémo : getBy = « doit exister » (sinon erreur) · queryBy = « peut ne pas exister » (null)
//        findBy = « va apparaître » (async, à awaiter) · getAllBy / queryAllBy / findAllBy = plusieurs
