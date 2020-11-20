/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { Config } from '../application';
import logo from '../assets/logo512.png';
import entity from './entity';
import page from './page';
import jwtAuth from './jwtAuth';
import custom from './custom';
import feature from './feature';
export default new Config({
    logo: logo,
    host: 'https://sample.org',
    auth: jwtAuth,
    pages: [page, entity, custom, feature],
});
