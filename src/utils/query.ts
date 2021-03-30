/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export const parseQuery = (queryString: string): Record<string, string> => {
  const query: Record<string, string> = {};

  const pairs = (queryString[0] === '?'
      ? queryString.substr(1)
      : queryString
  ).split('&');

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return query;
};
