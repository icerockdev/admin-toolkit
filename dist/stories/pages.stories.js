/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Page } from '../containers/pages/Page';
import { Entity } from '../containers/pages/Entity';
import { PageRenderer } from '../containers/pages/PageRenderer';
import { ENTITY_FILTER_TYPES, } from '../types/entity';
import { Config } from '../containers/pages/Config';
import { Application } from '../containers/pages/Application';
import { AuthProvider } from '../containers/pages/AuthProvider';
import logo from '../assets/logo512.png';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { action } from '@storybook/addon-actions';
var config = new Config({
    logo: logo,
    auth: new AuthProvider({
        authRequestFn: function (email, password) {
            return Promise.resolve({
                user: {
                    email: email,
                    username: email,
                    token: 'SAMPLE_TOKEN',
                    role: 'user',
                },
                error: '',
            });
        },
    }),
    pages: [
        new Page({
            title: 'Sample page',
            menu: {
                enabled: true,
                url: '/test',
                label: 'Sample page',
            },
        }),
        new Entity({
            title: 'Sample entity',
            editable: true,
            viewable: true,
            api: {
                list: { url: '/list', method: 'get' },
                update: { url: '/update', method: 'patch' },
                create: { url: '/create', method: 'post' },
            },
            menu: {
                enabled: true,
                label: 'Sample entity',
                url: '/entity',
            },
            filters: {
                current: '',
                value: '',
                fields: [
                    {
                        name: 'type',
                        label: 'Тип',
                        type: ENTITY_FILTER_TYPES.SELECT,
                        variants: [
                            { value: 'news', label: 'Новость' },
                            { value: 'article', label: 'Статья' },
                        ],
                    },
                ],
            },
            fields: [
                {
                    name: 'type',
                    label: 'Тип',
                    sortable: true,
                    type: 'string',
                },
                {
                    name: 'title',
                    label: 'Заголовок',
                    sortable: true,
                    type: 'string',
                    title: true,
                },
                {
                    name: 'created',
                    label: 'Дата публикации',
                    sortable: true,
                    type: 'date',
                },
                {
                    name: 'visible',
                    label: 'Видимость',
                    sortable: false,
                    type: 'boolean',
                },
            ],
            fetchItemsFn: function () {
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                return new Promise(function (resolve) {
                    console.log('Fetching items', props);
                    setTimeout(resolve, 500, {
                        data: {
                            list: [
                                {
                                    id: 2,
                                    type: 'text',
                                    title: 'First one',
                                    created: new Date().toISOString(),
                                    visible: true,
                                },
                                {
                                    id: 3,
                                    type: 'text',
                                    title: 'Second one',
                                    created: new Date().toISOString(),
                                    visible: true,
                                },
                            ],
                            totalPages: 10,
                        },
                    });
                });
            },
            updateItemsFn: function (props) {
                action('update')(props);
                return Promise.resolve({ error: '', data: props.data });
            },
            createItemsFn: function (props) {
                action('create')(props);
                return Promise.resolve({ error: '', data: props.data });
            },
        }),
    ],
});
storiesOf('Pages', module)
    .add('PageRenderer: Entity sample', function () { return (React.createElement(Router, { history: createBrowserHistory() },
    React.createElement(PageRenderer, { page: config.pages[1] }))); })
    .add('PageRenderer: Page sample', function () { return (React.createElement(PageRenderer, { page: config.pages[0] })); })
    .add('Application', function () { return React.createElement(Application, { config: config }); });
