/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
export function useFeature() {
    return useContext(MobXProviderContext).feature;
}
export function useEntity() {
    return useContext(MobXProviderContext).entity;
}
export function useConfig() {
    return useContext(MobXProviderContext).config;
}
