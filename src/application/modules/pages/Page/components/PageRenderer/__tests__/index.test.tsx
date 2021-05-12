/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Page, PageRenderer } from "~/application";
import { mount } from "enzyme";

describe('PageRenderer', () => {
  it("set page title", done => {
    const elementFirst = <PageRenderer
      page={new Page({
        title: 'Page',
        menu: {
          enabled: true,
          url: '/page',
          label: 'Page',
        },
      })}
    />

    mount(elementFirst);

    requestAnimationFrame(() => {
      expect(document.title).toEqual("Page");
      done();
    });
  });
});
