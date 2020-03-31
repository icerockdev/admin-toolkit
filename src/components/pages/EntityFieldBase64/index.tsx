/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  MouseEventHandler,
  useCallback,
  useState,
  ChangeEvent,
} from 'react';
import {
  OutlinedInput,
  Button,
  FormControl,
  withStyles,
  Box,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import styles from './styles';

type IProps = {
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

// import React, { ChangeEvent } from 'react';
// import { observer } from 'mobx-react';
// import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// import classNames from 'classnames';
// import FormControl from '@material-ui/core/FormControl';
// import ImageIcon from '@material-ui/icons/Image';
// import Button from '@material-ui/core/Button';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import styles from './styles';

// type Props = WithStyles<typeof styles> & {
//   source: string;
//   label?: string;
//   required?: boolean;
//   className?: string;
//   allowedExtension: string[];
//   allowedMimeType: string[];
//   maxSize?: number;
//   minSize?: number;
//   minViewBox?: {
//     width: number;
//     height: number;
//   };
//   maxViewBox: {
//     width: number;
//     height: number;
//   };
// };

// interface State {
//   imageUrl: string;
//   photoLoaded: boolean;
//   newImage: boolean;
//   files: File[];
// }

// @observer
// class Base64FileInput extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     const imageUrl = store.data[props.source];
//     store.data[props.source] = null;

//     this.state = {
//       imageUrl: imageUrl,
//       photoLoaded: false,
//       newImage: false,
//       files: [],
//     };

//     this.loadImage = this.loadImage.bind(this);
//   }

//   getBase64(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result?.toString() || '');
//       reader.onerror = (error) => reject(error);
//     });
//   }

//   async loadImage(e: ChangeEvent<HTMLInputElement>) {
//     if (!e.target.files) return;

//     let filesArr = Array.from(e.target.files);
//     this.setState({ files: [...this.state.files, ...filesArr] });

//     const file = e.target.files[0];

//     if (!file) return;

//     // if (file.size > this.props.maxSize) {
//     //   store.showError('Файл слишком большой!');
//     //   return;
//     // }

//     // if (file.size < this.props.minSize) {
//     //   store.showError('Файл слишком маленький!');
//     //   return;
//     // }

//     // if (
//     //   this.props.allowedMimeType.length &&
//     //   !this.props.allowedMimeType.includes(file.type)
//     // ) {
//     //   store.showError('Тип файла не поддерживается!');
//     //   return;
//     // }

//     const photo: string = await this.getBase64(file);

//     const img = new Image();
//     img.src = photo;

//     img.onload = () => {
//       const { naturalWidth, naturalHeight } = img;
//       if (this.props.minViewBox) {
//         const minWidth = this.props.minViewBox.width;
//         const minHeight = this.props.minViewBox.height;
//         if (naturalWidth < minWidth || naturalHeight < minHeight) {
//           store.showError(
//             `Размер картинки не должен быть менее ${minWidth}x${minHeight} пикселей`
//           );
//           return;
//         }
//       }

//       if (this.props.maxViewBox) {
//         let maxWidth = this.props.maxViewBox.width;
//         let maxHeight = this.props.maxViewBox.height;
//         if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
//           store.showError(
//             `Размер картинки не должен быть более ${maxWidth}x${maxHeight} пикселей`
//           );
//           return;
//         }
//       }

//       store.data[this.props.source] = photo;
//       this.setState({ imageUrl: photo, photoLoaded: true, newImage: true });
//     };
//   }

//   render() {
//     const {
//       source,
//       required,
//       className,
//       classes,
//       allowedExtension,
//     } = this.props;
//     const { photoLoaded, imageUrl } = this.state;
//     const imgSrc = imageUrl;

//     return (
//       <FormControl
//         variant="outlined"
//         required={required}
//         className={classNames(classes.formControl, className)}
//       >
//         <label
//           htmlFor={source}
//           className={classNames(classes.label, className || '')}
//         >
//           {imgSrc ? (
//             <img
//               height={'56px'}
//               src={imgSrc}
//               className={photoLoaded ? 'loaded' : ''}
//               alt=""
//             />
//           ) : (
//             ''
//           )}
//           <OutlinedInput
//             className={classes.outlinedInput}
//             fullWidth
//             inputProps={{ source }}
//             style={{
//               flexDirection: 'row-reverse',
//             }}
//             inputComponent={() => (
//               <Button
//                 name={source}
//                 startIcon={<ImageIcon fontSize={'large'} />}
//                 variant="contained"
//                 style={{
//                   display: 'flex',
//                   width: '150px',
//                 }}
//               >
//                 <span>Загрузить</span>
//               </Button>
//             )}
//           />
//           <input
//             style={{
//               display: 'none',
//             }}
//             required={required}
//             id={source}
//             name={source}
//             type="file"
//             onChange={this.loadImage}
//             accept={allowedExtension ? allowedExtension.join(', ') : ''}
//           />
//         </label>
//       </FormControl>
//     );
//   }
// }

// export default withStyles(styles, { withTheme: true })(Base64FileInput);
