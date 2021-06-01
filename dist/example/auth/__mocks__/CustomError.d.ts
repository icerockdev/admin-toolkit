/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

declare class CustomError extends Error {
    constructor(name: string, message: string);
}
export default CustomError;
