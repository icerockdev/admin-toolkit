/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

export default CustomError;
