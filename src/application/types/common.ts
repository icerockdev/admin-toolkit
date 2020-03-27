/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export type Unwrap<T> = T extends (...args: any[]) => Promise<infer U> ? U : T;