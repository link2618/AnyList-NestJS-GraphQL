import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';

import { ItemsModule } from './../items/items.module';
import { UsersModule } from './../users/users.module';
import { ListsModule } from './../lists/lists.module';
import { ListItemModule } from './../list-item/list-item.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, ItemsModule, UsersModule, ListItemModule, ListsModule]
})
export class SeedModule {}
