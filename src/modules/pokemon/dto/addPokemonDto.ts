import { Transform, TransformFnParams } from 'class-transformer';
import { Length } from 'class-validator';

export class AddPokemonDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  account: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  message: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  signature: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  pokemonName: string;
}
