/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { parseQuery } from "~/utils/query";

test('parsing query', () => {
  expect(parseQuery("name=ferret&color=purple")).toStrictEqual({name: "ferret", color: "purple"})
})
