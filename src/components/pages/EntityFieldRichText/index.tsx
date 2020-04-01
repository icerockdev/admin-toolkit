/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
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
  const [val, setVal] = useState('');

  useEffect(() => {
    const contentHTML = convertFromHTML(value || '');
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    );

    setVal(JSON.stringify(convertToRaw(state)));
  }, []);

  const onChange = useCallback(
    (data) => {
      if (!handler) return;
      const text = draftToHtml(convertToRaw(data.getCurrentContent()));
      handler(text || '');
    },
    [value, handler]
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
