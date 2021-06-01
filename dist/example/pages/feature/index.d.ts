import { Feature } from '../../../application';
export declare type IFields = {
    id: number;
    name: string;
    age: number;
    role: number;
    status: number;
    birthDate: string;
    description: string;
    nested: {
        index: number;
        value: string;
    };
};
declare const _default: Feature<IFields>;
export default _default;
