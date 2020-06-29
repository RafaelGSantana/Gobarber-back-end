import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
