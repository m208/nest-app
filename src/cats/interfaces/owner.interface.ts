import { Document } from 'mongoose';

export interface Owner extends Document {
  readonly name: string;
}
