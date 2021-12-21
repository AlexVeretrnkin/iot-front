import { MeterEnum } from '../enums/meter.enum';

export type MeterModel = {
   id: string;
   key: string;
   type: MeterEnum;
   name: string;
   serial: string;
   position: string;
};
