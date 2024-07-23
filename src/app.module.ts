import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAttendanceModule } from './user-attendance/user-attendance.module';

@Module({
  imports: [UserAttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
