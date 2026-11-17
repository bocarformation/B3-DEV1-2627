// LIVE I - DÉPART (ce qui est à l'écran au début)
// Une seule grosse interface pour tout le back d'EventHub.
type User = { id: string; name: string; email: string };
type EventItem = { id: string; title: string };

interface EventHubApi {
  login(email: string, password: string): Promise<User>;
  register(name: string, email: string, password: string): Promise<User>;
  deleteAccount(userId: string): Promise<void>;
  listEvents(): Promise<EventItem[]>;
  createEvent(title: string): Promise<EventItem>;
  bookEvent(eventId: string, userId: string): Promise<void>;
}

// Use case "connexion" : il n'utilise QUE login()...
async function loginUser(api: EventHubApi, email: string, password: string): Promise<string> {
  const user = await api.login(email, password);
  return `Bienvenue ${user.name}`;
}

// ...mais pour le TESTER, je dois fournir un faux avec les 6 méthodes.
const notImplemented = async (): Promise<never> => {
  throw new Error('not implemented');
};
const fakeApi: EventHubApi = {
  login: async (email) => ({ id: 'u1', name: 'Alice', email }),
  register: notImplemented,
  deleteAccount: notImplemented,
  listEvents: notImplemented,
  createEvent: notImplemented,
  bookEvent: notImplemented,
};

console.log('=== LIVE I - départ ===');
console.log(await loginUser(fakeApi, 'alice@example.com', 'secret'));
console.log('Méthodes à écrire dans le faux pour tester loginUser :', Object.keys(fakeApi).length);
