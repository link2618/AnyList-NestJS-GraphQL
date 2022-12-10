import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from './entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Item ])
  ],
  providers: [ItemsResolver, ItemsService]
})
export class ItemsModule {}
