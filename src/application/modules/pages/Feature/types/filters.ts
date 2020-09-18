export type FeatureFilterComponentProps = {
  label: string;
  name: string;
  value: any;
  onChange: (val: any) => void;
  onReset: () => void;
  disabled?: boolean;
};
