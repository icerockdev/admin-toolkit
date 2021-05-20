/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ChangeEvent, useCallback, useState, } from 'react';
import { Box, Button, FormControl, OutlinedInput, WithStyles, withStyles, } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import styles from './styles';
import { IEntityFieldProps } from '~/application';
import { useTranslation } from "react-i18next";

type IProps = IEntityFieldProps & WithStyles<typeof styles> & {};

const EntityFieldBase64Image = withStyles(styles)(
  ({
     classes,
     label,
     value,
     handler,
     error,
     isEditing,
     onClick,
     options,
   }: IProps) => {
    const [innerError, setInnerError] = useState('');
    const {t} = useTranslation();

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

        if (options?.maxSize && file.size > options.maxSize) {
          setInnerError(t('The file is too big!'));
          return;
        }

        if (options?.maxSize && file.size < options.minSize) {
          setInnerError(t('The file is too small!'));
          return;
        }

        if (
          options?.allowedMimeType &&
          !options.allowedMimeType.includes(file.type)
        ) {
          setInnerError(t('The file type is not supported!'));
          return;
        }

        const photo: string = await getBase64(file);

        const img = new Image();
        img.src = photo;

        img.onload = () => {
          const {naturalWidth, naturalHeight} = img;

          if (options && options.minViewBox) {
            const minWidth = options.minViewBox.width;
            const minHeight = options.minViewBox.height;

            if (naturalWidth < minWidth || naturalHeight < minHeight) {
              setInnerError(
                t('Image size should not be less than {{width}}x{{height}} pixels', {
                  width: minWidth,
                  height: minHeight
                })
              );
              return;
            }
          }

          if (options?.maxViewBox) {
            let maxWidth = options.maxViewBox.width;
            let maxHeight = options.maxViewBox.height;
            if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
              setInnerError(
                t('The size of the picture should not be more than {{width}}x{{height}} pixels', {
                  width: maxWidth,
                  height: maxHeight
                })
              );
              return;
            }
          }

          handler(photo);
        };
      },
      [handler, options, getBase64, t]
    );

    const onChange = useCallback(
      (event) => {
        if (!handler) return;

        handler(event.target.value);
      },
      [handler]
    );

    return isEditing ? (
      <div>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          style={{position: 'relative'}}
        >
          <label htmlFor={label} className={classes.label}>
            {value ? (
              <div
                className={classes.image}
                style={{backgroundImage: `url('${value}')`}}
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
                  startIcon={<ImageIcon fontSize={'large'}/>}
                  variant="contained"
                  style={{
                    display: 'flex',
                    width: 150,
                  }}
                >
                  <span>{t('Upload')}</span>
                </Button>
              )}
            />
            <input
              id={label}
              name={label}
              type="file"
              onChange={loadImage}
              style={{position: 'absolute'}}
              accept={options && options.mimes ? options.mimes.join(', ') : ''}
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
        <img alt="base64image" src={value ? String(value) : ''} className={classes.preview}/>
      </div>
    );
  }
);

export { EntityFieldBase64Image };
