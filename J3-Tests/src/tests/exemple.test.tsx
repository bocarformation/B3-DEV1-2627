import { render, screen } from '@testing-library/react'
import App from '../App'

// Test 1 : une fonction pure (même entrée => même sortie, rien d'autre).
function addition(a: number, b: number): number {
  return a + b
}

describe('exemple', () => {
  it('additionne correctement deux nombres', () => {
    expect(addition(2, 3)).toBe(5)
  })

  // Test 2 : un composant React affiché dans le faux navigateur (jsdom).
  it("affiche le titre de l'application", () => {
    render(<App />)
    expect(screen.getByText('Poll Builder App')).toBeInTheDocument()
  })
})
