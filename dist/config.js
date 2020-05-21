/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { Config } from './application';
import logo from './assets/logo512.png';
import entity from './example/entity';
import page from './example/page';
import auth from './example/auth';
export default new Config({
    logo: logo,
    auth: auth,
    pages: [page, entity],
});
