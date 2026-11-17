// LIVE O - DÉPART (ce qui est à l'écran au début)
// Prix d'un billet EventHub selon le type de billet. Chaque nouveau type = modifier ce switch.
type TicketType = 'standard' | 'student' | 'vip';

function ticketPrice(basePrice: number, type: TicketType): number {
  switch (type) {
    case 'standard':
      return basePrice;
    case 'student':
      return basePrice * 0.5;
    case 'vip':
      return basePrice * 2 + 10;
  }
}

console.log('=== LIVE O - départ ===');
for (const type of ['standard', 'student', 'vip'] as const) {
  console.log(`${type.padEnd(9)} : ${ticketPrice(20, type)} EUR`);
}
// Demande du client : "un tarif early-bird à -20 %" et "un tarif groupe à -30 %"
