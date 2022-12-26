import { FC } from "react";
export declare const ENTITY_FIELD_RENDERS: {
    string: FC<import("./types").IEntityFieldProps>;
    textarea: FC<import("./types").IEntityFieldProps>;
    date: FC<import("./types").IEntityFieldProps>;
    datetime: FC<import("./types").IEntityFieldProps>;
    daterange: FC<import("./types").IEntityFieldProps>;
    boolean: FC<import("./types").IEntityFieldProps>;
    select: FC<import("./types").IEntityFieldProps>;
    phone: FC<import("./types").IEntityFieldProps>;
    richtext: FC<import("./types").IEntityFieldProps>;
    base64image: import("react").ComponentType<Pick<import("./types").IEntityFieldProps & {
        classes: Record<"label" | "image" | "formControl" | "outlinedInput" | "preview", string>;
    }, "mask" | "data" | "label" | "name" | "onClick" | "placeholder" | "value" | "error" | "options" | "fields" | "isEditing" | "withToken" | "entity" | "handler" | "isFiltering"> & import("@material-ui/styles").StyledComponentProps<"label" | "image" | "formControl" | "outlinedInput" | "preview">>;
    number: FC<import("./types").IEntityFieldProps>;
    referenceSelect: FC<import("./types").IEntityFieldProps>;
};
export declare const ENTITY_REFERENCE_FIELDS: {
    referenceSelect: boolean;
};
export declare const getEntityFieldRenderer: (type?: string) => FC<any>;
export declare const ENTITY_SORT_DIRS: Record<string, 'asc' | 'desc'>;
export declare const ENTITY_FILTER_TYPES: {
    TEXT: string;
    SELECT: string;
    NUMBER: string;
    DATE: string;
};
export declare const ENTITY_ACTIONS: {
    CREATE: string;
    GET: string;
    LIST: string;
    DELETE: string;
    UPDATE: string;
};
export declare const ENTITY_ERRORS: {
    CANT_UPDATE_ITEM: string;
    CANT_LOAD_ITEMS: string;
    FIELD_IS_REQUIRED: string;
    INCORRECT_INPUT: string;
};
