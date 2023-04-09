import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from '../schemas/pokemon.schema';
import { PakemonsPaginationDto } from '../dto/paginationDto';
import { PaginationViewModel } from '../../../helpers/pagination-view-model';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async createPokemon(newPokemon: Pokemon) {
    return this.pokemonModel.create({ ...newPokemon });
  }

  async updatePokemonUserId(account: string, pokemonName: string) {
    return this.pokemonModel.findOneAndUpdate(
      { name: pokemonName },
      { userId: account },
    );
  }

  async findMyPokemons(userId: string, paginationType: PakemonsPaginationDto) {
    const skipSize = paginationType.getSkipSize();
    const pageSize = paginationType.pageSize;

    const findAndSortedPakemons = await this.pokemonModel
      .find(
        {
          userId,
          name: { $regex: paginationType.searchNameTerm ?? '', $options: 'i' },
        },
        { _id: 0 },
      )
      .sort({
        [paginationType.sortBy]:
          paginationType.sortDirection === 'asc' ? 1 : -1,
      })
      .skip(skipSize)
      .limit(pageSize)
      .lean();

    const countPakemons = await this.pokemonModel.countDocuments({
      name: { $regex: paginationType.searchNameTerm ?? '', $options: 'i' },
    });

    return new PaginationViewModel(
      countPakemons,
      paginationType.pageNumber,
      pageSize,
      findAndSortedPakemons,
    );
  }

  async findAllPokemons(paginationType: PakemonsPaginationDto) {
    const skipSize = paginationType.getSkipSize();
    const pageSize = paginationType.pageSize;

    const findAndSortedPakemons = await this.pokemonModel
      .find(
        {
          name: { $regex: paginationType.searchNameTerm ?? '', $options: 'i' },
        },
        { _id: 0 },
      )
      .sort({
        [paginationType.sortBy]:
          paginationType.sortDirection === 'asc' ? 1 : -1,
      })
      .skip(skipSize)
      .limit(pageSize)
      .lean();

    const countPakemons = await this.pokemonModel.countDocuments({
      name: { $regex: paginationType.searchNameTerm ?? '', $options: 'i' },
    });

    return new PaginationViewModel(
      countPakemons,
      paginationType.pageNumber,
      pageSize,
      findAndSortedPakemons,
    );
  }
}
