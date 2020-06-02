## Admin Toolkit

Мы создали этот тулкит как инструмент быстрого развёртывания админ-панелей, как альтернативу react-admin. Для хранения данных используется mobx, в качестве ui-тулкита - material-ui.

#### В чём отличия от react-admin?

Мы сделали упор на расширяемость функционала, что позволило бы создавать более сложные админки, если это понадобится.

Внутри тулкит построен на классах с наследованием там, где это нужно. Любого расширения существующего функционала в вашем приложении так же можно добиться наследованием, дополнением и переопределением встроенных в тулкит классов.

#### Установка

Мы публикуем admin-toolkit в репозитории npm, поэтому добавление в проект admin-toolkit производится командой:

```
yarn add icerockdev-admin-toolkit
```

#### Как выглядит приложение при использовании admin-toolkit?

Наша админ-панель это react-приложение, которое содержит следующий компонент:

```typescript
import { Application } from 'icerockdev-admin-toolkit';

<Application config={config} />;
```

Как видно, мы описываем всё в конфиге. В типовой ситуации он выглядит так:

```typescript
const config = new Config({
  logo: '/images/logo.png',
  auth: authProvider,
  pages: [page, entity],
});
```

#### Авторизация. AuthProvider, JWTAuthProvider

В тулкит встроено два типа авторизации: просто с токеном и jwt, с возможностью обновлять access-токен после устаревания.

```typescript
export default new AuthProvider({
	persist: true
 	authRequestFn: (email, password) => Promise.resolve({
 		user: { email, username: email, token: 'SAMPLE_TOKEN', role: 'user' },
 		error: '',
 	}),
 	authPasswRestoreFn: (email: string) => Promise.resolve({ error: '' });
});
```

Как видно, обычный AuthProvider принимает две функции, `authRequestFn`, которая получает токен в обмен на email и password, и `authPasswRestoreFn`, которая отправляет запрос на сброс пароля.

Флаг `persist: true` указывает на то, что надо хранить токен в localStorage между сессиями пользователя.

JWTAuthProvider наследуется от AuthProvider и выглядит так:

```typescript
new JWTAuthProvider({
  persist: true,
  authRequestFn: authRequestFn, //  как в AuthProvider
  authPasswRestoreFn: authPasswRestoreFn, // как в AuthProvider
  tokenRefreshFn: (refresh: string) =>
    Promise.resolve({ access: 'accessToken', refresh: 'refreshToken' }),
});
```

В данном случае `tokenRefreshFn` занимается тем, что получает новую пару токенов в случае устаревания access-токена.

Так как ошибки на бэке всегда выводятся в произвольном формате, вам нужно будет отлавливать их самостоятельно, возвращая в качестве `error` константу `UNAUTHORIZED`:

```typescript
import { UNAUTHORIZED } from 'icerockdev-admin-toolkit';

const fetchItemsFn = () => Promise.reject({ data: [], error: UNAUTHORIZED });
```

В таком случае JWTAuthProvider попытается обновить токен и повторить запрос, а в случае неудачи разлогинит пользователя.

#### Контент. Page, Entity.

Для отображения контента надо заполнить в конфиге `pages`, которые будут являться наследниками класса `Page`, используемого для простого вывода контента:

```typescript
export default new Page({
  title: 'Sample page',
  menu: {
    enabled: true,
    url: '/test',
    label: 'Sample page',
  },
});
```

Сама по себе `Page` не делает ничего, но от неё можно будет наследоваться и, переопределив переменную `output`, рендерить свой контент.

В `Entity` так и делается, этот класс используется для вывода списка, просмотра, редактирования и создания любых сущностей:

```typescript
export default new Entity({
  title: 'Sample entity',
  editable: true,
  viewable: true,
  creatable: true,
  exportable: true,
  selectable: false,
  api: {
    list: { url: '/list', method: 'get' },
    update: { url: '/update', method: 'patch' },
    create: { url: '/create', method: 'post' },
    get: { url: '/get', method: 'get' },
  },
  menu: {
    enabled: true,
    label: 'Sample entity',
    url: '/entity',
  },
  fields: SAMPLE_ENTITY_FIELDS,

  fetchItemsFn: ({ url, page, count, token, filter, sortBy, sortDir }) =>
    fetchEntityItemsFn({ url, page, count, token, filter, sortBy, sortDir }),

  getItemsFn: ({ id, url, token }) => getEntityFn({ id, url, token }),

  updateItemsFn: ({ id, data, url, token }) =>
    updateEntityFn({ id, data, url, token }),

  createItemsFn: ({ data, url, token }) => createEntityFn({ data, url, token }),
});
```

Переменные `editable`, `viewable`, `creatable`, `exportable`, `selectable` указывают на то, может ли пользователь редактировать, просматривать, создавать, экспортировать и выбирать несколько элементов в списке.

Функции `fetchItemsFn`, `getItemsFn`, `updateItemsFn`, `createItemsFn` нужно будет написать самим для того, чтобы получать список сущностей, получать каждую из них, редактировать и создавать. Как видно, туда передаётся `token` из `AuthProvider` для авторизации.

Но самое важное здесь - переменная `fields`. В ней описаны поля, их типы и валидация. Вот пример полей:

```typescript
const SAMPLE_ENTITY_FIELDS: IEntityField[] = [
  {
    name: 'title',
    label: 'Заголовок',
    sortable: true, // можно ли сортировать по этому полю
    filterable: true, // можно ли фильтровать по этому полю
    required: true, // простейшая валидация
    type: 'string',
    title: true, // использовать как название сущности
    hideInCreate: true, // показывать и валидировать при создании
    hideInEdit: false, // не показывать и не валидировать при редактировании
    hideInList: false, // не показывать в списке
    validator: (val: string) => (String(val) === '1' ? '' : 'Должно быть 1'), // валидатор, возвращающий текст ошибки
  },
  {
    name: 'created',
    label: 'Дата публикации',
    sortable: true,
    type: 'date',
  },
];
```

Встроенные в тулкит типы полей: `string`, `number`,`boolean`,`select`,`date`,`datetime`,`phone`,`richtext`,`base64image`,`referenceSelect`,`custom`.

Тут стоит остановится на поле referenceSelect. Для этого поля данные надо подгрузить с бэка перед рендером значений. Дописываем в `Entity` переменную `references` и указывает функцию для получения списка значений. В нашем случае, у поля `name: 'type'`, поэтому пишем в `references` именно `type`.

Ссылка на entity передаётся в getMany, чтобы мы могли использовать авторизацию и значения других полей.

```typescript
new Entity({
  // ...props
  references: {
    type: { getMany: (entity) => getEntityTypeVariants(entity) },
  },
});
```

Для полей типа `custom` нужно указать компонент, который будет их рендерить:

```typescript
{
	name: 'created',
	label: 'Дата публикации',
	sortable: true,
	type: 'custom',
	component: EntityFieldDate,
},
```

Компонент, рендерящий кастомные поля принимает следующие пропсы:

```typescript
interface IProps {
  name: string; // имя поля
  fields: IEntityField[]; // все поля
  data?: Record<string, any>; // все значения полей
  error?: string; // ошибка валидации для этого поля
  isEditing?: boolean; // показывается ли в редакторе или при создании
  isFiltering?: boolean; // показывается ли в панели фильтров
  handler?: (val: any) => void; // функция, принимающая новое значение
}
```

В компоненте можно описать состояние для отображения в списке, в редакторе и в панели фильтров с помощью `isEditing`, `isFiltering`.

#### Расширение функционала

В большинстве простых случаев нам хватит функционала `Entity`, чтобы управлять набором простых сущностей, но когда нам нужно что-то неординарное, можно наследоваться от `Entity` и писать свой код для рендера списков и редактора, а так же для обработки данных.

```typescript
class CustomEntity extends Entity {
	@computed
	get ListFooter() {
		return observer(() => <div>FOOTER</div>));
	}
}
```

В данном случае мы переопределяем переменную, выводящую низ списка сущностей. Для удобства переопределения, каждый из выводов разбит на части, которые можно переопределить, не затрагивая остальные.

- Общий вывод для `entity` это переменная `output`.
- Для списка это: `List`, `ListHead`, `ListBody`, `ListFooter`, `ListHeadButtons`, `ListHeadTitle`, `ListExtra`
- Для просмотра - `Viewer`, `Breadcrumbs`, `ViewerHeadButtons`, `ViewerHead`, `ViewerFooter`, `ViewerBody`
- Для редактора - `Editor`, `Breadcrumbs`, `EditorHeadButtons`, `EditorHead`, `EditorFooter`, `EditorBody`

Все эти переменные определены в классе и имеют доступ к `this`, что облегчает кастомизацию.

Переменная `ListExtra`, если она возвращает react-компонент, будет показывать его при клике на строку компонента в списке в качестве аккордеона.

#### Сущности и авторизация

В каждом `Entity` есть доступ к общему конфигу через переменную `parent`. Например, для авторизации можно обратиться к `this.parent.auth.withToken`:

```typescript
const response = await this.parent.auth.withToken(apiFn, { ...options });
```

В данном случае `withToken` вызовет `apiFn` и добавит к параметрам `options` переменную `token`.

В `Entity` есть поддержка ролей. Чтобы написать её, нужно переопределить переменные `canEdit` и `canCreate`.

#### Использовать или не использовать?

Перед началом разработки админки на этом тулките, лучше сразу оценить, насколько результат будет похож на простой список сущностей с возможностью редактирования, просмотра и создания.

Если нужно получить сложную систему, где сущности нельзя просто так разбить на разделы, если заказчик требует кастомного дизайна, встроенных подсущностей - лучше писать админку с нуля или придётся мучаться, пытаясь расширять функционал тулкита, созданный для определенных целей.
