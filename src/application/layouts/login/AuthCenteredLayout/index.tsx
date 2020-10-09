import React, { FC } from 'react';
import { observer } from 'mobx-react';

interface IProps {}

const AuthCenteredLayout: FC<IProps> = observer(({ children }) => (
  <div>{children}</div>
));

export { AuthCenteredLayout };
