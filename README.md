## Admin Toolkit
This is a tool for building admin panels, that can be installed as npm dependency.
[DEMO](https://icerockdev.github.io/admin-toolkit/ "DEMO")

### Installation
```yarn add icerockdev/admin-toolkit#master``` 
or 
```npm i -S icerockdev/admin-toolkit#master```

### Usage
```
import React from "react";
import {  Application } from "admin-toolkit";
import config from "./config";

export const App = () => (
  <div>
    <Application config={config} />
  </div>
);
```

### Config
The app is built on extendable classes. You can write your own autherntification by extending AuthProvider class. Creating complex pages should be made by extending Page class.
```
var config = new Config({
  logo: "",
  auth: new AuthProvider(authProviderOptions),
  pages: [
    new Page(pageOptions),
    new Entity(entityOptions)
  ]
});
```

### AuthProvider
AuthProvider is extendable class. You can override its metods for your needs. The app decides user authentication status by checking its token field, but you can override this behaviour in your own class.

Basic options are:
```
new AuthProvider({
    authRequestFn: (email, password) => Promise.resolve({
        user: {
          email: 'user@example.com',
          username: 'username',
          token: "SAMPLE_TOKEN",
          role: "user"
        },
        error: ""
      }),
  })
  ```
  
### Page
Page class is for rendering pages inside the app. You can extend it to create more complex pages, like this done in Entity class.

Base config for Page is:
```
    new Page({
      title: "Sample page",
      menu: {
        enabled: true,
        url: "/test",
        label: "Sample page"
      }
    });
```

### Entity
Entity is used to display list of some database entities, view their details and edit them. The Entity class extends Page one.

Basic options for Entity:
```
new Entity({
      title: "Sample entity",
      editable: true,
      viewable: true,
      api: {
        list: { url: "/list", method: "get" },
        update: { url: "/update", method: "patch" },
        create: { url: "/create", method: "post" }
      },
      menu: {
        enabled: true,
        label: "Sample entity",
        url: "/entity"
      },
      filters: {
        current: "",
        value: "",
        fields: [
          {
            name: "type",
            label: "Тип",
            type: ENTITY_FILTER_TYPES.SELECT,
            variants: [
              { value: "news", label: "Новость" },
              { value: "article", label: "Статья" }
            ]
          }
        ]
      },
      fields: [
        {
          name: "type",
          label: "Тип",
          sortable: true,
          type: "string"
        },
      ],
      fetchItemsFn: () => new Promise((resolve) => {
          setTimeout(resolve, 500, {
            data: {
              list: [
                {
                  id: 1,
                  type: "text"
                }
              ],
              totalItems: 1
            }
          });
        });
      },
      updateItemsFn: ({ data }) => (
	  	Promise.resolve({ error: "", data });
      ),
      createItemsFn: ({ data }) => (
        Promise.resolve({ error: "", data: props.data })
      )
    });
```

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