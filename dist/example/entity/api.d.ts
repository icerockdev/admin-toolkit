import { Entity, IEntityCreateFunction, IEntityFetchFunction, IEntityGetFunction, IEntityUpdateFunction } from '../../application';
export declare const fetchEntityItemsFn: IEntityFetchFunction;
export declare const getEntityFn: IEntityGetFunction;
export declare const updateEntityFn: IEntityUpdateFunction;
export declare const createEntityFn: IEntityCreateFunction;
export declare const getEntityTypeVariants: (entity: Entity) => Promise<{
    1: string;
    2: string;
    3: string;
}>;
