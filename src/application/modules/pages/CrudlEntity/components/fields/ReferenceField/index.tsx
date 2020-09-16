import React from 'react';
import { SelectField } from '~/application/modules/pages/CrudlEntity/components/fields/SelectField';
import { computed, observable } from 'mobx';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { Placeholder } from '~/application/modules/pages/CrudlEntity/components/common/Placeholder';
import { observer } from 'mobx-react';

export class ReferenceField<T extends Record<string, any>> extends SelectField<
  T
> {
  @computed
  get isLoading() {
    return this.entity?.data.references[this.name].isLoadingAll || false;
  }

  @computed
  get listVariants() {
    return this.entity?.data.references[this.name].all || {};
  }

  @observable
  List: CrudlField['List'] = observer(({ value }) => {
    return this.isLoading ? (
      <Placeholder />
    ) : (
      <div>{this.formatValue(value)}</div>
    );
  });
}
