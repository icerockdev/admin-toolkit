import React, { FC } from "react";

interface IProps {
  onClear: () => void;
}

const FilterClear: FC<IProps> = ({ onClear }) => <div></div>;

export { FilterClear };
