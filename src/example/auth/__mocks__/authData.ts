/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export const ADMIN_USER_EMAIL = 'admin@icerock.dev'

export const ADMIN_USER_PASSWORD = '123456'

export const ADMIN_USER_RESPONSE = {
  user: {
    email: ADMIN_USER_EMAIL,
    username: ADMIN_USER_EMAIL,
    token: 'ADMIN_SAMPLE_TOKEN',
    role: 'admin',
  },
  error: '',
}

export const ADMIN_USER_RESPONSE_JWT = {
  user: {
    email: ADMIN_USER_EMAIL,
    username: ADMIN_USER_EMAIL,
    role: 'admin',
  },
  tokens: { access: 'adminAccessToken', refresh: 'adminRefreshToken' },
  error: '',
}

export const COMMON_USER_EMAIL = 'user@icerock.dev'

export const COMMON_USER_PASSWORD = '123456'

export const COMMON_USER_RESPONSE = {
  user: {
    email: COMMON_USER_EMAIL,
    username: COMMON_USER_EMAIL,
    token: 'userAccessToken',
    role: 'user',
  },
  error: '',
}

export const COMMON_USER_RESPONSE_JWT = {
  user: {
    email: COMMON_USER_EMAIL,
    username: COMMON_USER_EMAIL,
    role: 'user',
  },
  tokens: { access: 'userAccessToken', refresh: 'userRefreshToken' },
  error: '',
}
