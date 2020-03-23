/// <reference types="react" />
import { IEntityProps } from '../../../types/entity';
import { Page } from '../Page';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { RouteComponentProps } from 'react-router-dom';
export declare class Entity extends Page {
    api: IEntityProps['api'];
    fields: IEntityProps['fields'];
    filters: IEntityProps['filters'];
    editable: IEntityProps['editable'];
    viewable: IEntityProps['viewable'];
    fetchItemsFn: IEntityProps['fetchItemsFn'];
    updateItemsFn: IEntityProps['updateItemsFn'];
    createItemsFn: IEntityProps['createItemsFn'];
    isLoading: boolean;
    itemsPerPage: number[];
    items: number;
    totalCount: number;
    page: number;
    data: Record<string, any>[];
    error?: string | null;
    constructor(fields?: Partial<IEntityProps>);
    setFilters: (filters: {
        current: string;
        value: any;
        fields: import("../../../types/entity").IEntityFilterField[];
    }) => void;
    setPage: (page: number) => void;
    setPerPage: (items: number) => void;
    fetchItemsInstance?: CancellablePromise<any>;
    fetchItems: () => void;
    fetchItemsCancel: () => void;
    updateItemInstance?: CancellablePromise<any>;
    updateItem: (data: Record<string, any>) => void;
    createItem: (data: Record<string, any>) => void;
    onMount: () => void;
    onUnmount: () => void;
    get ListHead(): () => JSX.Element;
    get ListBody(): () => JSX.Element;
    get ListFooter(): () => JSX.Element;
    get List(): () => JSX.Element;
    get Viewer(): ({ match: { params: { id }, }, }: RouteComponentProps<{
        id: string;
    }, import("react-router").StaticContext, import("history").History.PoorMansUnknown>) => JSX.Element;
    get Editor(): ({ match: { params: { id }, }, }: RouteComponentProps<{
        id: string;
    }, import("react-router").StaticContext, import("history").History.PoorMansUnknown>) => JSX.Element;
    get Creator(): ({ match: { params: { id }, }, }: RouteComponentProps<{
        id: string;
    }, import("react-router").StaticContext, import("history").History.PoorMansUnknown>) => JSX.Element;
    get output(): () => JSX.Element;
}
