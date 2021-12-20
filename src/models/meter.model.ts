import { MeterEnum } from '../enums/meter.enum';

export type MeterModel = {
  type: MeterEnum;
  name: string;
  serial: string;
  position: string;
};
