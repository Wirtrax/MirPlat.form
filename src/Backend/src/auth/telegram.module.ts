import { Module, Global } from '@nestjs/common';
import { TelegramInitdataGuard } from './telegram-initdata.guard';

@Global()
@Module({
  providers: [
    {
      provide: TelegramInitdataGuard,
      useFactory: () => {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
          throw new Error('TELEGRAM_BOT_TOKEN не задан в .env');
        }
        return new TelegramInitdataGuard(botToken);
      },
    },
  ],
  exports: [TelegramInitdataGuard],
})
export class TelegramModule {}