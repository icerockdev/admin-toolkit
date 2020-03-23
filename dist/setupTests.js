/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
