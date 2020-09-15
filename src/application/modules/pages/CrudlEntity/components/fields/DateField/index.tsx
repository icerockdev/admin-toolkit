import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { observable } from 'mobx';
import { format, parseISO } from 'date-fns/esm';
import React from 'react';
import { DateFilter } from '~/application/modules/pages/CrudlEntity/components/renderers/filters/DateFilter';

export type DateFieldParser = (val: string) => Date;
export type DateFieldFormatter = (val: Date) => string;

export type DateFieldOptions = CrudlField['options'] & {
  parser?: DateFieldParser;
  formatter?: DateFieldFormatter;
  format?: string;
  filterExact?: boolean;
};

export class DateField<
  T extends Record<string, any> = Record<string, any>
> extends CrudlField {
  constructor(
    name: CrudlField['name'],
    {
      parser,
      format: dateFormat,
      formatter,
      filterExact,
      ...options
    }: DateFieldOptions
  ) {
    super(name, options);

    if (parser) this.parser = parser;
    if (dateFormat) this.dateFormat = dateFormat;
    if (formatter) this.formatter = formatter;
    if (filterExact) this.filterExact = filterExact;
  }

  @observable filterExact = false;
  @observable dateFormat = 'dd.MM.yyyy';
  @observable parser: DateFieldParser = (val: string) => parseISO(val);
  @observable formatter: DateFieldFormatter = (val: Date) => {
    return format(val, this.dateFormat);
  };

  formatValue(val: string): string {
    const date = this.parser(val);
    return this.formatter(date);
  }

  asString(val: string) {
    return this.formatValue(val);
  }

  @observable
  List: CrudlField['List'] = ({ value }) => (
    <div>{this.formatValue(value)}</div>
  );

  @observable
  Filter: CrudlField['Filter'] = ({ value, onChange, onReset }) => (
    <DateFilter
      label={this.label}
      name={this.name}
      value={value}
      onChange={onChange}
      onReset={onReset}
      isRange={!this.filterExact}
    />
  );
}
