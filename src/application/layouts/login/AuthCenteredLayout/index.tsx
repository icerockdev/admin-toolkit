/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import { observer } from 'mobx-react';

interface IProps {}

const AuthCenteredLayout: FC<IProps> = observer(({ children }) => (
  <div>{children}</div>
));

export { AuthCenteredLayout };
