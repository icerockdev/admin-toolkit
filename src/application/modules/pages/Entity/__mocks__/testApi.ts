/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from "~/application";

export const getReferenceData = async (entity: Entity) => {
  return {
    1: 'variant 1',
    2: 'variant 2',
    3: 'variant 3',
  };
};
