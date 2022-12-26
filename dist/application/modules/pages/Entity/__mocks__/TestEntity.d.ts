import { Entity, IEntityProps } from "../../../..";
declare class TestEntity extends Entity {
    constructor(fields?: Partial<IEntityProps>);
    updateReferenceOptions: () => Promise<void>;
}
declare const _default: TestEntity;
export default _default;
