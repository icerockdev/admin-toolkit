/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useState, useEffect } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertFromHTML } from 'draft-js';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { IEntityFieldProps } from '~/application';

type IProps = IEntityFieldProps & {};

const EntityFieldRichText: FC<IProps> = ({
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
}) => {
  const [val, setVal] = useState('');

  useEffect(() => {
    const contentHTML = convertFromHTML(value || '');
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    );

    setVal(JSON.stringify(convertToRaw(state)));
  }, [value]);

  const onChange = useCallback(
    (data) => {
      if (!handler) return;
      const text = draftToHtml(convertToRaw(data.getCurrentContent()));
      handler(text || '');
    },
    [handler]
  );

  return isEditing ? (
    <div>
      <MUIRichTextEditor
        label={label}
        value={val || ''}
        onChange={onChange}
        error={!!error}
        controls={[
          'title',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'undo',
          'redo',
          'numberList',
          'bulletList',
          'quote',
          'clear',
        ]}
      />
    </div>
  ) : (
    (value && (
      <div onClick={onClick} dangerouslySetInnerHTML={{ __html: value }} />
    )) || <div>&nbsp;</div>
  );
};

export { EntityFieldRichText };
