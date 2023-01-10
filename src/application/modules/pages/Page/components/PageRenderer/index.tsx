/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useEffect } from 'react';
import { Page } from '~/application/modules/pages/Page';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface IProps {
  page: Page;
}

const PageRenderer: FC<IProps> = observer(({ page }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (page.onMount) page.onMount(page);

    return () => {
      if (page.onUnmount) page.onUnmount(page);
    };
  }, [page]);

  return (
    <div className="renderer">
      <Helmet>
        <title>{t(page.title)}</title>
      </Helmet>
      <page.output />
    </div>
  );
});

export { PageRenderer };
