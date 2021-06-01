/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";
enzyme.configure({ adapter: new Adapter() });
jest.mock('date-fns/esm', function () { return ({ format: jest.fn(), parseISO: jest.fn() }); });
jest.mock('ramda/es/omit', function () { return ({ omit: jest.fn() }); });
