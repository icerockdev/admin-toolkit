/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from "react";
import { Page } from '~/application';
import { computed } from "mobx";
import { observer } from "mobx-react";
import i18n from "~/i18n";

class UserOnlyPage extends Page {
  @computed
  get output() {
    return observer(() => (
      <div>
        <h1>{i18n.t(this.title)}</h1>
      </div>
    ));
  }
}

export default new UserOnlyPage({
  title: 'User only page',
  menu: {
    enabled: true,
    url: '/user-only',
    label: 'User only page',
  },
  roles: ['user']
});
