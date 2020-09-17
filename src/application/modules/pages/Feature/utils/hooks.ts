import { useRouteMatch } from 'react-router';

export const useEntityId = () => {
  const match = useRouteMatch<{ id: string }>();

  return match.params.id;
};
