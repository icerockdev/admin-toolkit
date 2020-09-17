import { useRouteMatch } from 'react-router';

export const useFeatureId = () => {
  const match = useRouteMatch<{ id: string }>();

  return match.params.id;
};
