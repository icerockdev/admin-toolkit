import { Feature } from '../..';
export declare type GetReferenceAllProps = {
    feature: Feature;
    host: string;
    authorization: string;
    name: string;
};
export declare type GetReferenceAll = (props: GetReferenceAllProps) => Promise<any>;
export declare const getReferenceAll: GetReferenceAll;
