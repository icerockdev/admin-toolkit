/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from '../../application';
export declare const VEHICLE_INQUIRY_TYPE_BUY = 10;
export declare const VEHICLE_INQUIRY_TYPE_DRIVE = 20;
export declare const VEHICLE_INQUIRY_STATUS_NEW = 10;
export declare const VEHICLE_INQUIRY_STATUS_IN_PROGRESS = 20;
export declare const VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED = 30;
export declare const VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED = 40;
export declare const VEHICLE_INQUIRY_STATUS_SENT_KP = 50;
export declare const VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY = 60;
export declare const VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY = 70;
export declare const VEHICLE_INQUIRY_STATUS_CLOSED = 80;
declare const _default: (host: string) => Entity;
export default _default;
