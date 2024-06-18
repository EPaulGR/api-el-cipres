import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Personal, PersonalSchema } from './entities/personal.entity';

@Module({
  controllers: [PersonalController],
  providers: [PersonalService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Personal.name,
        schema: PersonalSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PersonalModule {}
