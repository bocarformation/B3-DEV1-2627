import './App.css'

// Les composants (Question, Answer, puis CreatePoll) sont construits PAR LES TESTS.
// On ne les branchera ici qu'à la fin (bonus CreatePoll de l'énoncé).
function App() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 gap-4">
      <h1 className="text-4xl font-extrabold text-gray-800">Poll Builder App</h1>
      <p className="text-gray-600">Rien à voir ici pour l'instant : lancez <code>npm test</code>.</p>
    </main>
  )
}

export default App
