import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { observable } from 'mobx';
import React from 'react';

export type SelectFieldOptions = CrudlField['options'] & {
  options?: Record<any, any>;
  autocomplete?: boolean;
};

export class SelectField<
  T extends Record<string, any> = Record<string, any>
> extends CrudlField {
  constructor(
    name: CrudlField['name'],
    { options, autocomplete, ...props }: SelectFieldOptions
  ) {
    super(name, props);

    if (options) this.options = options;
    if (!autocomplete) this.autocomplete = false;
  }

  @observable options: Record<any, any> = {};
  @observable autocomplete = true;

  formatValue(val: any): any {
    return Object.prototype.hasOwnProperty.call(this.options, val)
      ? this.options[val]
      : val;
  }

  asString(val: string) {
    return this.formatValue(val);
  }

  @observable
  List: CrudlField['List'] = ({ value }) => (
    <div>{this.formatValue(value)}</div>
  );
}
