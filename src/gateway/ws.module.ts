import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { TaskModule } from '../task/task.module';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TaskModule, AuthModule],
  providers: [WsGateway],
})
export class WsModule {}
