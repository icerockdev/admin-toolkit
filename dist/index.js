/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './application';
import example from './example';
ReactDOM.render(React.createElement(Application, { config: example }), document.getElementById('root'));
