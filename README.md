# IceRock Development Admin Toolkit

This is a tool for building admin panels, that can be installed as npm dependency.

[DEMO](https://icerockdev.github.io/admin-toolkit/ 'DEMO')

## Installation
`yarn add icerockdev-admin-toolkit`

or

`npm i -S icerockdev-admin-toolkit`

## Usage
```typescript
import React from 'react';
import { Application } from 'admin-toolkit';
import config from './config';

export const App = () => <Application config={config} />;
```

## Config
The app is built on extendable classes. You can write your own autherntification by extending AuthProvider class. Creating complex pages should be made by extending Page class.

```typescript
const config = new Config({
  logo: '', // logo url
  auth: new AuthProvider(authProviderOptions),
  pages: [new Page(pageOptions), new Entity(entityOptions)],
  theme, // custom theme options (see below)
});
```

#### Hooks
Use `useConfig()` hook inside of components to get current `Config` instance with all data.

#### i18n
Config options:

- `i18nDefaultLanguage` - Default language in admin panel
- `i18nLanguages` - Array of supported languages
- `i18nUseBrowserLanguageDetector` - Enable automatically detect language by browser 
- `i18nResourcesContext` - Instance of Webpack's `RequireContext` with specified folder for loading translations

For enable languages support you need create translations files in `~/locales` folder (in sources root).

Folders structure example:
```text
locales/
├── en
│   ├── buttons.json
│   ├── common.json
│   └── messages.json
└── ru
    ├── buttons.json
    ├── common.json
    └── messages.json
```

Filename is a namespace of translations. Default namespace is "common". For example you can call `t('common:Sign In')` or is same `t('Sign In')`, other namespaces messages calls only with namespace, example: `t('buttons:Cancel')`.

For mor info check out the [i18next documentation](https://www.i18next.com/) and [react-i18next documentation](https://react.i18next.com/).

## AuthProvider
`AuthProvider` is extendable class. You can override its metods for your needs. The app decides user authentication status by checking its token field, but you can override this behaviour in your own class, like this done in `JWTAuthProvider`.

#### Options:
```javascript
new AuthProvider({
  authRequestFn: (email, password) =>
    Promise.resolve({
      user: {
        email: 'user@example.com',
        username: 'username',
        token: 'SAMPLE_TOKEN',
        role: 'user',
      },
      error: '',
    }),
  authPasswRestoreFn: (email) =>
    Promise.resolve({
      error: '',
    }),
  persist: true, //store beetween sessions
  router: FC, // optional
  signIn: FC, // optional
  signUp: FC, // optional
  forgotPassword: FC, // optional
  resetPassword: FC, // optional
  layout: FC, // optional
});
```

#### Customization
Override these components to customize guest user interface:
- `router` - global router for unauthorized users. Avoid changing it
- `signIn`, `signUp`, `forgotPassword`, `resetPassword` - specific components for each step of authorization
- `layout` - wrapper for all components. By default it's `VerticalAuthLayout`.

TIP: use `const config = useConfig()` react hook to get current `config` inside each component. 

## JWTAuthProvider

JWTAuthProvider is extension of AuthProvider, but it has `tokenRefreshFn` to fetch renewed access token, using refresh token. Also, authRequestFn returns `tokens` field with access and refresh token pair:

```javascript
new AuthProvider({
  authRequestFn: (email, password) => (
    Promise.resolve({
      user: {
        email: 'user@example.com',
        username: 'username',
        role: 'user'
      },
	  tokens: {
		access: 'accessToken',
		refresh: 'refreshToken',
	  },
      error: ''
    })
  ),
  authPasswRestoreFn: (email) => (
    Promise.resolve({
      error: '',
    })
  ),
  tokenRefreshFn: (refresh) => (
  	Promise.resolve({
		access: 'newAccessToken',
		refresh: 'newRefreshToken',
	}),
  ),
  persist: true, //store beetween sessions
});
```

#### Methods and values:
- `auth.user` - current user info
- `auth.withToken: (req, args) => Promise<any>` - wrapper for callbacks, which used to add `token` value to function arguments
- `auth.logout: () => void` - function to log user out
- `auth.isLogged: boolean` - computed field to decide if user is logged in

## Page
Page class is for rendering pages inside the app. You can extend it to create more complex pages, like this done in Entity class.

#### Options:

```javascript
new Page({
  title: 'Sample page',
  menu: {
    enabled: true,
    url: '/test',
    label: 'Sample page',
  },
  roles: {
    // who can access this page
    list: ['admin', 'manager'],
  },
});
```

#### Methods and values:

- `page.canList: boolean` - if page can be viewed by current user
- `page.onMount: (page: Page) => void` - method, called on mount
- `page.onUnmount: (page: Page) => void` - method, called before unmount
- `page.output: ReactElement` - react component, that renders page content

#### Hooks

Use `const page = usePage()` inside components to get current page

#### Extending:

Just extend Page class and add your functionality. Override output, onMount, onUnmount methods to create your own content behaviour.

## Entity

Entity is used to display list of some database entities, view their details and edit them. The Entity class extends Page one.

#### Options

```typescript
new Entity({
  ...pageOptions,
  title: 'Sample entity',
  editable: true,
  viewable: true,
  creatable: true,
  exportable: true,
  api: {
    get: { url: '/get', method: 'get' },
    list: { url: '/list', method: 'get' },
    update: { url: '/update', method: 'patch' },
    create: { url: '/create', method: 'post' },
  },
  menu: {
    enabled: true,
    label: 'Sample entity',
    url: '/entity',
  },
  references: {
    status: {
      getMany: async () => {
        return {
          1: 'variant 1',
          2: 'variant 2',
        };
      },
    },
  },
  fields: [
    {
      name: 'type',
      label: 'Тип',
      sortable: true,
      type: 'custom', // see Fields below
      component: EntityTypeField,
    },
    {
      name: 'status',
      label: 'Статус',
      sortable: true,
      filterable: true,
      type: 'referenceSelect',
      required: true,
    },
  ],
  getItemsFn, // see getItemsFn below
  fetchItemsFn, // see fetchItemsFn below
  updateItemsFn, // see updateItemsFn below
  createItemsFn, // see createItemsFn below
});
```

#### Methods and values
(extends Page methods and values)
- `entity.canView: boolean` - if entity can be viewed by current user
- `entity.canEdit: boolean` - if entity can be edited by current user
- `entity.canCreate: boolean` - if entity can be created by current user
- `entity.output` - component, that renders entity page and contains router for list, view, edit and create pages
- `entity.List`, `entity.Viewer`, `entity.Editor`, `entity.Creator` - overridable components for viewing, editing and creating item
- `entity.ListHead`, `entity.ListBody`, `entity.ListFooter` - overridable parts of `entity.List` component
- `entity.EditorHead`, `entity.EditorBody`, `entity.EditorFooter` - overridable parts of `entity.Editor` component
- `entity.ViewerHead`, `entity.ViewerHeadButtons`, `entity.ViewerBody`, `entity.ViewerFooter` - overridable parts of `entity.Viewer` component
- `entity.ListExtra` - if not null, renders entity list as accordeons, expanding by click with ListExtra's component as accordeon content
- `entity.CreatorHead`, `entity.CreatorHeadButtons`, `entity.CreatorBody`, `entity.CreatorFooter` - overridable parts of `entity.Creator` component
- `entity.isLoading: boolean` - is item currently loading / updating
- `entity.items: number` - how many items per page should be displayed in view list
- `entity.itemsPerPage: number[]` - available options for items
- `entity.page: number` - current page
- `entity.exportData` - used to export data in preferred format (currently .csv)
- `entity.setFiltersWindowHash`, `getFiltersFromHash` - syncing filters with page url using url hash

#### Hooks
Use `const entity = useEntity()` inside components to get current entity

#### Entity fields
Entity.fields is an array of objects. Every field can has following types: `string`, `date`, `boolean`, `select`, `phone`, `richtext`, `base64image`. `custom` or `referenceSelect`.

Every field is rendered by predefined or custom component, which accepts common options. `isEditing` prop tells component to render in view (when it's in a table or in entity preview) or editor (when it's in editor or acting as filter field).

- `name: string,` - field name is it comes from the api
- `label?: string,` - field label (or name will be used)
- `title?: true,` - is this a title for entity
- `type: string` - field type
- `sortable?: boolean;` - can we sort by this field
- `filterable?: boolean;` - can we filter by this field
- `required?: boolean;` - is this field required. Used for basic validation
- `validator?: (val: any) => boolean;` - custom validator
- `options?: Record<any, any>;` - options, passed for `custom` component or { [value]: key } for `select` component
- `component?: FC<any>;` - React Component to render field. Only for `custom` fields
- `hideInList?: boolean;` - do not render in table of entities
- `hideInEdit?: boolean;` - do not render in editor form
- `hideInCreate?: boolean;` - do not render in creator form
- `hideInExport?: boolean;` - do not export field in CSV

#### Custom Fields
```typescript
  const customField: IEntityField = {
    name: "type", 
    label: "Тип",
    sortable: true,
    type: "custom",
    component: EntityTypeField,
  }
```

Custom fields are rendered by React Component specified in `component` prop. Custom field component options are:

- `value: any` - field value for current component
- `handler: (value: any) => void` - function, that changes value
- `label: string` - human readable label
- `error: string` - error (if any)
- `isEditing: boolean` - view or edit mode
- `options: Record<any, any>` - options
- `data: Record<string, any>` - values for all the fields of current Entity
- `fields: EntityField[]` - description of all fields
- `withToken: (req, args) => Promise<any>` - function, that wraps requests with current user credentials (see `AuthProvider`)

#### Reference fields
```typescript
	{
    name: 'status',
    label: 'Статус',
    sortable: true,
    filterable: true,
    type: 'referenceSelect',
    required: true,
	},
```

The Entity should has ```references``` to fetch data, that will match reference fields data:
```typescript
  references: {
    status: { // name should match the one in fields
      getMany: async () => {
        return {
          1: 'variant 1',
          2: 'variant 2',
          3: 'variant 3',
        };
      },
    },
  },
```

#### Data fetching functions

`getItemsFn` - fetches entity by id.

```typescript
type IEntityGetFunction = ({
  url: string;
  token?: string;
  id: any;
}) => Promise<{
  data: Record<string, any>;
  error?: string
}>
```

`fetchItemsFn` - fetches entities list.

```typescript
type IEntityFetchFunction = ({
  url: string;
  page?: number;
  filter?: { name?: string; value?: any };
  sortBy: string;
  sortDir: string; // 'ASC' or 'DESC'
  count?: number;
  token?: string;
}) => Promise<{
  data: {
    list: Record<string, any>[];
    totalCount?: number;
  };
  error?: string;
}>
```

`updateItemsFn` - updates entity after editing.

```typescript
type IEntityUpdateFunction = ({
  url: string;
  id: any;
  token?: string;
  data: Record<string, any>;
}) => Promise<{
  data: Record<string, any>; // updated data
  error?: string;
}>
```

`createItemsFn` - creates new entity.

```typescript
type IEntityCreateFunction = ({
  url: string;
  token?: string;
  data: Record<string, any>;
}) => Promise<{
  data: Record<string, any>; // updated data
  error?: string;
}>
```

Throwing `UNAUTHORIZED` error will cause AuthProvider/JWTAuthProvider token update or logout, depending on result.

#### Auth wrappers for Entity

Each entity has a link to config via `this.parent`. You can access tokens by hitting `this.parent.auth`, but you'd better use `this.parent.auth.withToken(fn, args)` in your own entity methods.

`withToken` will add `token` arg to list of fn arguments, so you can pass it as auth header.

## Theming

See https://material-ui.com/customization/theming/. To change colors, fonts, spacing, create your own theme and add it to config as `theme` prop:

```typescript
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#d20c0a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  },
});
```

## Experimental feature
We've started implementing `Page` type called `Feature` to make more customizable kind of entity
administration with better typing support for incoming data.

Here's the brief info about it:

```typescript
const feature = new Feature<Fields>('Feature title', '/feature', options);
```

### Field types
Data types for all incoming data should be described:
```
export interface Fields {
    name: string,
    age: number,
}
```

### Feature Options
```
const featureOptions: FeatureOptions<Fields> = {
    fields: FeatureField<Fields>[];
    features: FeatureFeatures;
    containers?: FeatureRendererProps['containers'];
    components?: FeatureRendererProps['components'];
    api?: FeatureApiProps<Fields>;    
    permissions?: Partial<Record<FeatureFeature, UserRole[]>>;
    getItemTitle?: (fields: Fields) => string;    
}
```

- `fields` - list of `FeatureField` (see below) 
- `features` - what kind of views should this feature have
- `containers` - and `components` - are list of components, what can be overriden (or default ones will be used)
- `api` - is an api props, describing how to interact with backend
- `permissions` - is a dictionary of `feature` and list of user roles
- `getItemTitle` - is a function, that returns each item's title at views, breadcrumbs and etc.

### Hooks 
Use `const feature = useFeature()` to get current `Feature` instance inside any of components, inputs, etc.

### Customizing views
You can theme app by overriding `containers` and `components`. 

#### Containers 
Simply a dictionary of `list`, `read`, `create` and `update` to React Functional Component. Use hooks to access
current feature data.

#### Components
All of Feature's containers is separated by zones, you can override each of them. Use just simple Functional Components
without any props, get current data by using `useFeature` react hook.

##### List components
React.FC components can be specified for: `wrapper`, `header`, `title`, `buttons`, `filters`, `table`, `pagination`, `footer`, `container`
  
##### Read, Update and Create components:
React.FC components can be specified for: `wrapper`, `header`, `footer`, `title`, `buttons`, `breadcrumbs`, `content`, `submit`, `container`

### Fields
Unlike in `Entity`, all fields in `Feature` are described by `FeatureField` class and its successors.
Built-in field types are: `DateField`, `IntegerField`, `ReferenceField`, `SelectField` and `StringField`.

Each of them has it's own options and `FeatureField`'s common ones. Create your own field
types by overriding any of that field classes.

```
const age = new IntegerField<Fields>('age', {
    label: 'Age',
    accuracy: 2,
    features: {
      sort: true,
      filter: true,
    },
    defaultValue: 21,
});
```

See [src/example/feature/fields.ts](src/example/feature/fields.ts) for more examples.

## Publishing

Use `npm login` or `yarn login` and then `npm publish` or `yarn publish`.
Don't forget to increase package version each time you commit changes.

## License

    Copyright 2020 IceRock MAG Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
