import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({ versionKey: false })
export class Pokemon {
  @Prop()
  isBanned: boolean;
  @Prop()
  banDate: Date;
}

// export class BlogOwnerInfo {
//   @Prop({ type: String })
//   userId: string;
//   @Prop({ type: String })
//   userLogin: string;
// }

// export class BlogsViewModel {
//   constructor(
//     public id: string,
//     public name: string,
//     public description: string,
//     public websiteUrl: string,
//     public createdAt: string,
//     public isMembership: boolean,
//   ) {}
// }

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
