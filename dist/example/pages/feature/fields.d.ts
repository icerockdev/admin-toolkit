/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureField } from '../../../application/modules/pages/Feature/fields/FeatureField';
import { IFields } from './index';
import { IntegerField } from '../../../application/modules/pages/Feature/fields/IntegerField';
import { SelectField } from '../../../application/modules/pages/Feature/fields/SelectField';
export declare const FEATURE_FIELDS: (FeatureField<IFields, string> | IntegerField<IFields> | SelectField<IFields, number>)[];
