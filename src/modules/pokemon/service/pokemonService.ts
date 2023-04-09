import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonService {
  async validate(
    account: string,
    message: string,
    signature: string,
    pokemonName: string,
  ) {}
}
