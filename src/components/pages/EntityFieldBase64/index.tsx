/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  MouseEventHandler,
  useCallback,
  useState,
  ChangeEvent,
  FC,
} from 'react';
import {
  OutlinedInput,
  Button,
  FormControl,
  withStyles,
  WithStyles,
  Box,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import styles from './styles';

type IProps = WithStyles<typeof styles> & {
  label: string;
  value: any;
  error?: string;
  isEditing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  handler?: (val: any) => void;
  availableVariants?: Record<any, any>;
} & Record<string, any>;

const EntityFieldBase64Image = withStyles(styles)(
  ({
    classes,
    label,
    value,
    handler,
    error,
    isEditing,
    onClick,
    availableVariants,
  }: IProps) => {
    const [innerError, setInnerError] = useState('');

    const getBase64 = useCallback((file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = (error) => reject(error);
      });
    }, []);

    const loadImage = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        if (!handler) return;
        if (!e.target.files) return;

        setInnerError('');

        const file = e.target.files[0];

        if (!file) return;

        if (
          availableVariants?.maxSize &&
          file.size > availableVariants.maxSize
        ) {
          setInnerError('Файл слишком большой!');
          return;
        }

        if (
          availableVariants?.maxSize &&
          file.size < availableVariants.minSize
        ) {
          setInnerError('Файл слишком маленький!');
          return;
        }

        if (
          availableVariants?.allowedMimeType &&
          !availableVariants.allowedMimeType.includes(file.type)
        ) {
          setInnerError('Тип файла не поддерживается!');
          return;
        }

        const photo: string = await getBase64(file);

        const img = new Image();
        img.src = photo;

        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;

          if (availableVariants && availableVariants.minViewBox) {
            const minWidth = availableVariants.minViewBox.width;
            const minHeight = availableVariants.minViewBox.height;

            if (naturalWidth < minWidth || naturalHeight < minHeight) {
              setInnerError(
                `Размер картинки не должен быть менее ${minWidth}x${minHeight} пикселей`
              );
              return;
            }
          }

          if (availableVariants?.maxViewBox) {
            let maxWidth = availableVariants.maxViewBox.width;
            let maxHeight = availableVariants.maxViewBox.height;
            if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
              setInnerError(
                `Размер картинки не должен быть более ${maxWidth}x${maxHeight} пикселей`
              );
              return;
            }
          }

          handler(photo);
        };
      },
      [setInnerError, handler, getBase64]
    );

    const onChange = useCallback(
      (event) => {
        if (!handler) return;

        handler(event.target.value);
      },
      [value, handler]
    );

    return isEditing ? (
      <div>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          style={{ position: 'relative' }}
        >
          <label htmlFor={label} className={classes.label}>
            {value ? (
              <div
                className={classes.image}
                style={{ backgroundImage: `url('${value}')` }}
              />
            ) : (
              ''
            )}

            <OutlinedInput
              fullWidth
              style={{
                flexDirection: 'row-reverse',
              }}
              error={!!innerError || !!error}
              className={classes.outlinedInput}
              inputComponent={() => (
                <Button
                  name={label}
                  startIcon={<ImageIcon fontSize={'large'} />}
                  variant="contained"
                  style={{
                    display: 'flex',
                    width: 150,
                  }}
                >
                  <span>Загрузить</span>
                </Button>
              )}
            />
            <input
              id={label}
              name={label}
              type="file"
              onChange={loadImage}
              style={{ position: 'absolute' }}
              accept={
                availableVariants && availableVariants.mimes
                  ? availableVariants.mimes.join(', ')
                  : ''
              }
            />
          </label>
          {(innerError || error) && (
            <Box color="error.main" fontSize={12}>
              {innerError || error}
            </Box>
          )}
        </FormControl>
      </div>
    ) : (
      <div onClick={onClick}>
        <img src={value ? String(value) : ''} />
      </div>
    );
  }
);

export { EntityFieldBase64Image };
