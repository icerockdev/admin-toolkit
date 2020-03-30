/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import MUIRichTextEditor from 'mui-rte';
import { convertFromHTML } from 'draft-js';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

type IProps = {
  label: string;
  value: any;
  isEditing?: boolean;
  handler?: (val: any) => void;
  error?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldRichText: FC<IProps> = ({
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(
    (data) => {
      const text = draftToHtml(convertToRaw(data.getCurrentContent()));
      console.log({ text });
    },
    [value, handler]
  );

  return isEditing ? (
    <div>
      <MUIRichTextEditor
        label={label}
        value={value || ''}
        onChange={onChange}
        error={!!error}
      />
    </div>
  ) : (
    <div onClick={onClick}>{String(value)}</div>
  );
};

export { EntityFieldRichText };
