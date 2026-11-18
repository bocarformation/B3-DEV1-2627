// DÉMO 1 : une fonction pure. Pas de React, pas de navigateur. Le test le plus simple qui existe.
// npm run demo:pure

function prixTTC(prixHT: number): number {
  if (prixHT < 0) throw new Error("Prix négatif");
  return Math.round(prixHT * 1.2 * 100) / 100;
}

describe("prixTTC", () => {
  // Arrange (je prépare) / Act (j'appelle) / Assert (je vérifie)
  it("ajoute 20 % de TVA", () => {
    const resultat = prixTTC(100);
    expect(resultat).toBe(120);
  });

  it("arrondit au centime", () => {
    expect(prixTTC(9.99)).toBe(11.99);
  });

  it("refuse un prix négatif", () => {
    // On passe une FONCTION à expect, sinon l'erreur part avant qu'expect puisse l'attraper.
    expect(() => prixTTC(-1)).toThrow("Prix négatif");
  });

  // À montrer : remplacer 120 par 121 => message « expected 120 to be 121 ». Un test rouge, c'est ÇA.
});
