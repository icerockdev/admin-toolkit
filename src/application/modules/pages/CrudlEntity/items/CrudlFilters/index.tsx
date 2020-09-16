import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { computed, observable } from 'mobx';
import React from 'react';
import { and, has, pickBy } from 'ramda';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { CrudlFiltersRenderer } from '~/application/modules/pages/CrudlEntity/components/filters/CrudlFiltersRenderer';
import qs from 'query-string';
import { SortDir } from '~/application/modules/pages/CrudlEntity/types';

export class CrudlFilters<F extends Record<string, any> = Record<string, any>> {
  constructor(public entity: CrudlEntity<F>) {}

  @observable value: Record<string, any> = {};
  @observable selected: string[] = [];

  @observable count: number = 0;
  @observable rows: number = 25;
  @observable rowsSelectOptions: number[] = [10, 25, 50, 100, 200];
  @observable page: number = 0;
  @observable sortBy?: string;
  @observable sortDir?: SortDir;

  @computed
  get fields(): Record<string, CrudlField<F>> {
    return pickBy((item: CrudlField<F>) => !!item.options.features?.filter)(
      this.entity.fields
    );
  }

  @computed
  get valuesForList(): Record<string, string> {
    return pickBy(
      (_, it) =>
        has(it, this.fields) &&
        (!!this.value[it] || this.fields[it].allowEmptyFilter)
    )(this.value);
  }

  @computed
  get Filters() {
    return <CrudlFiltersRenderer />;
  }

  restoreFilters = () => {
    const { search } = window.location;

    const fields = qs.parse(search);

    if (!fields) return;

    Object.keys(fields).forEach((field: string) => {
      if (
        !Object.prototype.hasOwnProperty.call(this.fields, field) ||
        !this.fields[field]?.options?.features?.filter ||
        !(
          this.fields[field].allowEmptyFilter ||
          fields[field]?.toString()?.trim()
        )
      )
        return;

      this.value = { ...this.value, [field]: fields[field]?.toString() || '' };
      this.selected = [...this.selected, field];
    });

    if (has('__sortDir', fields)) {
      switch (fields?.__sortDir?.toString()?.toLowerCase()) {
        case SortDir.ASC:
          this.sortDir = SortDir.ASC;
          break;
        case SortDir.DESC:
          this.sortDir = SortDir.DESC;
          break;
        default:
          this.sortDir = undefined;
      }
    }

    if (
      and(
        has('__sortBy', fields),
        has(fields?.__sortBy?.toString() || '', this.fields)
      )
    ) {
      this.sortBy = fields.__sortBy?.toString() || undefined;
    }

    if (
      and(has('__page', fields), parseInt(fields?.__page?.toString() || '', 10))
    ) {
      this.page = parseInt(fields?.__page?.toString() || '', 10);
    }

    if (
      and(has('__rows', fields), parseInt(fields?.__rows?.toString() || '', 10))
    ) {
      this.rows = parseInt(fields?.__rows?.toString() || '', 10);
    }
  };

  persistFilters = () => {
    const query = qs.stringify({
      ...this.value,
      __sortDir: this.sortDir,
      __sortBy: this.sortBy,
      __rows: this.rows,
      __page: this.page,
    });
    const url = `${window.location.origin}${window.location.pathname}?${query}`;
    window.history.replaceState('', '', url);
  };
}
