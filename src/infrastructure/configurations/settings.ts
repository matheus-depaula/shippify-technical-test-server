import 'dotenv/config';
import { injectable } from 'inversify';
import { castNumber } from '../../helpers/cast-number';

@injectable()
export class Settings {
  public getServerPort(): number {
    return this.assertAndReturnNumberSetting('SERVER_PORT');
  }

  public getDatabaseName(): string {
    return this.assertAndReturnStringSetting('DATABASE_NAME');
  }

  public getDatabaseHost(): string {
    return this.assertAndReturnStringSetting('DATABASE_HOST');
  }

  public getDatabaseUser(): string {
    return this.assertAndReturnStringSetting('DATABASE_USER');
  }

  public getDatabasePassword(): string {
    return this.assertAndReturnStringSetting('DATABASE_PASS');
  }

  public getDatabasePort(): number {
    return this.assertAndReturnNumberSetting('DATABASE_PORT');
  }

  private assertAndReturnStringSetting(settingName: string): string {
    const setting = this.returnSetting(settingName);

    if (!setting) throw new Error(this.errorMessage(settingName));

    return setting;
  }

  private assertAndReturnNumberSetting(settingName: string): number {
    const rawSetting = this.returnSetting(settingName);
    const setting = castNumber(rawSetting);

    if (!setting) throw new Error(this.errorMessage(settingName));

    return setting;
  }

  private errorMessage(settingName: string): string {
    const message = `You need to configure the ${settingName} environment variable`;

    console.log(message);

    return message;
  }

  private returnSetting(settingName: string): string | undefined {
    const setting = process.env[settingName];

    if (setting === null) return undefined;

    return setting;
  }
}
