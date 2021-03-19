import { parseQuery } from "~/utils/query";

test('parsing query', () => {
  expect(parseQuery("name=ferret&color=purple")).toStrictEqual({name: "ferret", color: "purple"})
})
