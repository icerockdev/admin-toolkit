/// <reference types="react" />
import { Entity } from '../../application';
declare class CustomEntity extends Entity {
    get output(): () => JSX.Element;
}
declare const _default: CustomEntity;
export default _default;
