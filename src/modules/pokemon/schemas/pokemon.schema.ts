import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({ versionKey: false })
export class Pokemon extends Document {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: [String], required: true })
  abilities: string[];

  @Prop({ type: Number, required: true })
  level: number;

  @Prop({ type: [String] })
  evolution: string[];
  @Prop({ type: String })
  userId: string;
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
