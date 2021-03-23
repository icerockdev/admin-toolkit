/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from "react";
import { Page } from '~/application';
import { computed } from "mobx";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";

class CustomPage extends Page {
  @computed
  get output() {
    return observer(() => (
      <div>
        <h1>{this.title}</h1>
        <div>Navigate to <NavLink to="/test-hidden">hidden page</NavLink> (not listed in navigation)</div>
      </div>
    ));
  }
}

export default new CustomPage({
  title: 'Page',
  menu: {
    enabled: true,
    url: '/test',
    label: 'Sample page',
  },
});
