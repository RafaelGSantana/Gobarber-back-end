import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
