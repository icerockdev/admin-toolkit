/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from "react";
import { Page, useConfig } from '~/application';
import { computed } from "mobx";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import i18n from "~/i18n";

class CustomPage extends Page {
  @computed
  get output() {
    const config = useConfig()

    return observer(() => (
      <div>
        <h1>{i18n.t(this.title)} - {config.debug ? 'Development' : 'Production'}</h1>
        <div>Navigate to <NavLink to="/test-hidden">hidden page</NavLink> (not listed in navigation)</div>
      </div>
    ));
  }
}

export default new CustomPage({
  title: 'custom:Page',
  menu: {
    enabled: true,
    url: '/test',
    label: 'custom:Sample page',
  },
});
