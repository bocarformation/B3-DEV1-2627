# Tests unitaires React : le composant `Question` en TDD
Dans EventHub, vous écrirez vos propres tests avec **exactement les mêmes outils** : Vitest, Testing Library, user-event et `vi.fn()`.

---

## 0. Installation (5 min)

```powershell
git pull
cd J3-Tests
npm ci
npm test
```

Résultat attendu : **2 tests verts** (`src/tests/exemple.test.tsx`).
`npm test` reste ouvert (mode watch) et relance les tests à chaque sauvegarde. Laissez-le tourner dans un terminal. `q` pour quitter.

Autres commandes : `npm run test:run` (une seule fois), `npm run typecheck`, `npm run build`, `npm run lint`, `npm run dev`.
Les démos du formateur sont dans `src/demos` : `npm run demos` (10 tests verts). Les fichiers de `src/demos/erreurs` contiennent **exprès** un test rouge : `npm run erreur:getby`, `npm run erreur:await`, `npm run erreur:act`.

## La règle du jeu : TDD

1. **Rouge** : j'écris UN test. Je le lance et je le vois échouer (s'il passe tout de suite, il ne teste rien).
2. **Vert** : j'écris le **minimum** de code pour qu'il passe.
3. **Propre** : je range (noms, types) sans casser les tests.

On ne regarde **jamais** le navigateur pendant ce TP : ce sont les tests qui nous disent si ça marche.

## Correctifs par rapport au livre (à lire avant de copier du code)

| Le livre dit | Vous faites |
|---|---|
| `jest.fn()` (et parfois `vi.fn()`) | **toujours `vi.fn()`** (on utilise Vitest, comme dans EventHub) |
| `import { Input } from "@chakra-ui/react"` puis `<Input ...>` | `<input ...>` (minuscule), **pas d'import**. Chakra n'est pas utilisé. |
| `npm install --save-dev @testing-library/user-event` | rien : c'est déjà installé |
| Installer Tailwind, modifier `vite.config` | rien : c'est déjà fait |
| `<form>` autour de l'input et du bouton | `<div>` (sinon chaque clic soumet le formulaire) |
| `import { PollModel } from ...` | `import type { PollModel } from "../models/poll-model"` |
| Chemins `../ui/components/...`, `domain/model/...`, `src/features/...` | **toujours** `src/components/`, `src/models/poll-model.ts`, `src/tests/` |
| `React.FC<{}>` | `React.FC` (sans `<{}>`) |
| Affichage `✓ src/features/... PASS Waiting for file changes...` | Chez vous, l'affichage est un peu différent : ce qui compte, c'est `Tests  N passed` |

---

## Les 7 tests à écrire, dans l'ordre

Tous les tests vont dans **un seul fichier** à créer : `src/tests/Question.test.tsx`.
Le composant à faire grandir existe déjà : `src/components/Question.tsx` (il renvoie un `<div>` vide).

Après chaque étape, le compteur doit indiquer le nombre de tests verts du tableau (les 2 tests d'exemple compris).

| Étape | Livre | Test | Verts attendus |
|---|---|---|---|
| 1 | 3.1 | affiche l'input de la question | 3 |
| 2 | 3.2 | affiche le bouton « Ajouter une réponse » | 4 |
| 3 | 3.3 | appelle `onChange` quand on tape | 5 |
| 4 | 3.4 | affiche toutes les réponses | 6 |
| 5 | 3.5 | appelle `addAnswer` au clic | 7 |
| 6 | 3.6 | appelle `removeAnswer` et la réponse disparaît | 8 |
| 7 | 3.7 | appelle `updateAnswer` quand on modifie une réponse | 9 |

### Étape 1 · affiche l'input (avec le formateur)

```tsx
import { render, screen } from '@testing-library/react';
import { Question } from '../components/Question';

describe('Question', () => {
    const setup = () => {
        render(<Question question={{ title: "Quel est ton langage préféré ?" }} />);
    };

    it('should display input', () => {
        setup();
        expect(screen.getByDisplayValue('Quel est ton langage préféré ?')).toBeInTheDocument();
    });
});
```

Rouge : `Unable to find an element with the display value: Quel est ton langage préféré ?`
Pour le vert :
- créer `src/models/poll-model.ts` : `export namespace PollModel { export type Question = { title: string } }` ;
- dans `Question.tsx` : une prop `question: PollModel.Question` et `return <input value={question.title} />`.

> Le warning `You provided a 'value' prop to a form field without an 'onChange' handler` est normal ici : il disparaît à l'étape 3.

### Étape 2 · affiche le bouton (avec le formateur)

```tsx
    it("should display add button", () => {
        setup();
        expect(screen.getByRole('button', { name: 'Ajouter une réponse' })).toBeInTheDocument();
    });
```

Pour le vert : entourer l'input d'un `<div>` et ajouter `<button type="button">Ajouter une réponse</button>`.

### Étape 3 · appelle `onChange` (avec le formateur)

Le test a maintenant besoin d'un **mock** (`vi.fn()`), de **user-event**, et d'un **Wrapper** : un petit parent de test qui garde la valeur dans un `useState`, sinon l'input contrôlé ne change jamais à l'écran.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Question } from '../components/Question';
import type { PollModel } from '../models/poll-model';

describe('Question', () => {
    const onChange = vi.fn();

    const question: PollModel.Question = {
        id: "1",
        title: "Quel est ton langage préféré ?",
    };

    const Wrapper = () => {
        const [title, setTitle] = useState(question.title);
        return <Question
            question={{ ...question, title }}
            onChange={(id, value) => {
                setTitle(value);      // le Wrapper met l'écran à jour, comme le ferait le vrai parent
                onChange(id, value);  // et prévient le mock, pour qu'on puisse vérifier l'appel
            }}
        />;
    };

    const setup = () => {
        render(<Wrapper />);
    };

    // ... les tests des étapes 1 et 2 restent ici, inchangés

    it("should call onChange when input is changed", async () => {
        setup();
        const input = screen.getByDisplayValue('Quel est ton langage préféré ?');
        await userEvent.clear(input);
        await userEvent.type(input, "Quel est ton framework préféré ?");
        expect(onChange).toHaveBeenCalledWith("1", "Quel est ton framework préféré ?");
    });
});
```

Pour le vert : ajouter `id: string` au type `Question`, une prop `onChange: (id: string, value: string) => void`, et `onChange={(e) => onChange(question.id, e.target.value)}` sur l'input (avec `placeholder="Saisir la question"`).

**N'oubliez jamais le `await` devant `userEvent.…`** (et `async` devant la fonction du test).

---

### Étape 4 · affiche toutes les réponses (seuls)

1. Modèle : `Question` gagne `answers: Answer[]` ; nouveau type `Answer = { id: string; title: string }`.
2. Dans le test, la `question` reçoit `answers: [{ id: "1", title: "TypeScript" }, { id: "2", title: "JavaScript" }]`.
3. Le test :

```tsx
    it("should display all answers", () => {
        setup();
        expect(screen.getByDisplayValue('TypeScript')).toBeInTheDocument();
        expect(screen.getByDisplayValue('JavaScript')).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText('Réponse possible')).toHaveLength(2);
    });
```

Pour le vert : créer `src/components/Answer.tsx` (prop `title`, un `<input placeholder="Réponse possible" value={title} />`) et, dans `Question`, `question.answers.map((answer) => <Answer key={answer.id} title={answer.title} />)` entre l'input et le bouton.

### Étape 5 · appelle `addAnswer` au clic (seuls)

1. En haut du `describe` : `const addAnswer = vi.fn();` et un type `Props` (copier les props de `Question`).
2. Le Wrapper accepte des props : `const Wrapper = (props?: Partial<Props>) => ...`, avec `addAnswer={props?.addAnswer ?? (() => {})}`. Et `setup = (props?: Partial<Props>) => render(<Wrapper {...props} />)`.
3. Le test :

```tsx
    it("should call addAnswer when click on add button", async () => {
        setup({ addAnswer });
        await userEvent.click(screen.getByRole('button', { name: 'Ajouter une réponse' }));
        expect(addAnswer).toHaveBeenCalledWith("1");
    });
```

Pour le vert : prop `addAnswer: (id: string) => void` et `onClick={() => addAnswer(question.id)}` sur le bouton.

### Étape 6 · supprime une réponse (seuls)

1. `const removeAnswer = vi.fn();`. Dans le Wrapper, un 2e état : `const [answers, setAnswers] = useState(question.answers);`, et `question={{ ...question, title, answers }}`.
2. Dans le Wrapper : `removeAnswer={(_, answerId) => { setAnswers((prev) => prev.filter((a) => a.id !== answerId)); removeAnswer(question.id, answerId); }}`
3. Le test :

```tsx
    it("should call removeAnswer when click on remove button", async () => {
        setup({ removeAnswer });
        const removeButton = screen.getAllByRole("button", { name: /Supprimer la réponse/i })[0];
        await userEvent.click(removeButton);
        expect(removeAnswer).toHaveBeenCalledWith("1", "1");
        expect(screen.getAllByPlaceholderText('Réponse possible')).toHaveLength(1);
        expect(screen.queryByDisplayValue('TypeScript')).not.toBeInTheDocument(); // queryBy, pas getBy !
    });
```

Pour le vert : `Answer` reçoit `onRemove: () => void` et affiche `<button type="button" aria-label="Supprimer la réponse" onClick={onRemove}>❌</button>` ; `Question` reçoit `removeAnswer: (id: string, answerId: string) => void` et passe `onRemove={() => removeAnswer(question.id, answer.id)}`.

### Étape 7 · modifie une réponse (seuls)

1. `const updateAnswer = vi.fn();`. Dans le Wrapper : `updateAnswer={(_, answerId, value) => { setAnswers((prev) => prev.map((a) => a.id === answerId ? { ...a, title: value } : a)); updateAnswer(question.id, answerId, value); }}`
2. Le test :

```tsx
    it("should call updateAnswer when response is changed", async () => {
        setup();
        const input = screen.getByDisplayValue("TypeScript");
        await userEvent.clear(input);
        await userEvent.type(input, "Python");
        expect(updateAnswer).toHaveBeenCalledWith("1", "1", "Python");
        expect(screen.getByDisplayValue("Python")).toBeInTheDocument();
    });
```

Pour le vert : `Answer` reçoit `onChange: (title: string) => void` (**à déclarer dans les props**, le livre l'oublie) ; `Question` reçoit `updateAnswer: (id: string, answerId: string, value: string) => void` et passe `onChange={(title) => updateAnswer(question.id, answer.id, title)}`.

---

## C'est fini quand

```powershell
npm run test:run   # 9 tests verts, aucun warning rouge
npm run build      # aucune erreur TypeScript
npm run lint       # Found 0 warnings and 0 errors
```

Astuce : ajoutez `beforeEach(() => { vi.clearAllMocks(); });` dans le `describe`. Sinon un mock se souvient des appels du test précédent et un test peut passer « par chance ».

## Bonus (pour ceux qui ont fini)

**Bonus A · CreatePoll (livre chapitre 4, sections 4.1 à 4.5).** Copier le modèle `Form`, le hook (`src/hooks/use-create-poll.hook.ts`) et `src/components/CreatePoll.tsx` du livre, avec les correctifs ci-dessus, `key={question.id}` sur le `<div>` du `.map`, et `type="button"` sur tous les boutons. Puis `src/tests/CreatePoll.test.tsx` : titre affiché, champ titre, bouton « Ajouter une question », bouton « Créer » désactivé (`toBeDisabled()`), 2 clics = 2 questions (`getAllByPlaceholderText('Saisir la question')`). Enfin, afficher `<CreatePoll />` dans `App.tsx`.

**Bonus B · une fonction pure.** Sortez la règle « le sondage peut être créé » du hook dans `src/models/poll-rules.ts` : `export function isPollSubmittable(form: PollModel.Form): boolean` (titre non vide, au moins 2 questions, chaque question a un titre et au moins 2 réponses non vides). Testez-la dans `src/tests/poll-rules.test.ts` sans `render` : un sondage valide → `true`, puis un test par règle cassée → `false`. C'est exactement le « test de fonction pure » demandé dans EventHub.

## Mémo

| Je veux… | J'écris |
|---|---|
| afficher un composant | `render(<Comp />)` |
| un élément qui DOIT exister | `screen.getByRole('button', { name: 'Texte' })`, `getByText`, `getByPlaceholderText`, `getByDisplayValue` |
| vérifier qu'un élément N'existe PAS | `expect(screen.queryByText('...')).not.toBeInTheDocument()` |
| un élément qui VA apparaître (async) | `expect(await screen.findByText('...')).toBeInTheDocument()` |
| plusieurs éléments | `getAllBy...` → un tableau |
| cliquer / taper / vider | `await userEvent.click(el)` · `await userEvent.type(el, 'texte')` · `await userEvent.clear(el)` |
| une fausse fonction | `const fn = vi.fn()` puis `expect(fn).toHaveBeenCalledWith(...)` / `toHaveBeenCalledTimes(1)` |
| voir le HTML rendu | `screen.debug()` |
