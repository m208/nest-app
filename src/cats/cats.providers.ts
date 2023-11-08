import { Connection } from 'mongoose';
import { CatSchema } from './schemas/cat.schema';
import { OwnerSchema } from './schemas/owner.schema';

export const catsProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'OWNER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Owner', OwnerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
