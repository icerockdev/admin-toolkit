/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IEntityField } from "~/application";

export const TEST_FIELDS: IEntityField[] = [
  {
    name: 'testReference',
    label: 'Test reference',
    type: 'referenceSelect',
    required: true,
  }
]
