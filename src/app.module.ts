import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { PokemonController } from './modules/pokemon/pokemon.controller';
import {
  Pokemon,
  PokemonSchema,
} from './modules/pokemon/schemas/pokemon.schema';
import { CreatePokemonUseCase } from './modules/pokemon/use-cases/createPakemon.use-case';
import { PokemonRepository } from './modules/pokemon/repository/pokemonRepository';
import { PokemonService } from './modules/pokemon/service/pokemonService';
import { AddPokemonUseCase } from './modules/pokemon/use-cases/addPokemin.use-case';

const mongooseModels = [{ name: Pokemon.name, schema: PokemonSchema }];

const useCases = [CreatePokemonUseCase, AddPokemonUseCase];
const controllers = [AppController, PokemonController];
const services = [AppService, PokemonService];
const repositories = [PokemonRepository];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(mongooseModels),
  ],
  controllers,
  providers: [...services, ...repositories, ...useCases],
})
export class AppModule {}
