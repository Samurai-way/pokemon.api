import { Injectable } from '@nestjs/common';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';

@Injectable()
export class PokemonService {
  async validate(account: string, message: string, signature: string) {
    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature: signature,
    });
    if (recoveredAddress.toLowerCase() === account.toLowerCase()) {
      console.log('Подпись верна!');
      // Делайте здесь, что вам нужно, если подпись верна, например, сохраните pokemonName в базе данных.
    } else {
      console.log('Неправильный адрес!');
    }
  }
}
