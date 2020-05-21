import {
  IEntityFetchFunction,
  IEntityUpdateFunction,
  IEntityCreateFunction,
  IEntityGetFunction,
  Entity,
} from '~/application';
import { SAMPLE_ENTITY_1, SAMPLE_ENTITY_2 } from './mocked_data';

export const fetchEntityItemsFn: IEntityFetchFunction = ({ ...props }) =>
  new Promise((resolve) => {
    console.log('Fetching with props:', props);

    setTimeout(resolve, 500, {
      data: {
        list: [SAMPLE_ENTITY_1, SAMPLE_ENTITY_2],
        totalPages: 10,
      },
    });
  });

export const getEntityFn: IEntityGetFunction = ({ id, url, token }) => {
  return new Promise((resolve) => {
    console.log('Getting item:', { id, url, token });
    setTimeout(resolve, 500, {
      data: SAMPLE_ENTITY_2,
    });
  });
};

export const updateEntityFn: IEntityUpdateFunction = ({
  id,
  data,
  url,
  token,
}) => {
  return new Promise((resolve) => {
    console.log('Updating item:', { id, data, url, token });
    resolve({ error: '', data });
  });
};

export const createEntityFn: IEntityCreateFunction = ({ data, url, token }) => {
  return new Promise((resolve) => {
    console.log('Creating item:', { data, url, token });
    resolve({ error: '', data });
  });
};

export const getEntityTypeVariants = async (entity: Entity) => {
  return {
    1: 'variant 1',
    2: 'variant 2',
    3: 'variant 3',
  };
};
