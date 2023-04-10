import { Injectable } from '@nestjs/common';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';

@Injectable()
export class PokemonService {
  async validateUser(
    account: string,
    message: string,
    signature: string,
  ): Promise<boolean> {
    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature: signature,
    });
    if (recoveredAddress.toLowerCase() === account.toLowerCase()) {
      return true;
    } else {
      return null;
    }
  }
}
