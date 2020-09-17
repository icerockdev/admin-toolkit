import React, { Fragment } from 'react';
import { computed } from 'mobx';

export class FeatureRendererComponent {
  @computed
  get output() {
    return (...args: any): any => <Fragment />;
  }
}
