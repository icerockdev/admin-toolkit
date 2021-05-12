import { Entity, IEntityProps } from "~/application";
import { TEST_FIELDS } from "~/application/modules/pages/Entity/__mocks__/testFields";
import { action, reaction } from "mobx";
import { getReferenceData } from "~/application/modules/pages/Entity/__mocks__/testApi";

class TestEntity extends Entity {
  constructor(fields?: Partial<IEntityProps>) {
    super(fields as any);
    reaction(
      () => this.editorData?.testReference,
      () => this.updateReferenceOptions()
    );
    this.references.testReference.getMany(this).then((result) =>
      Object.assign(this.referenceData, {testReference: result})
    )
  }

  @action
  updateReferenceOptions = async () => {
    if (!this.references.testReference.getMany) return;
    const results = await this.references.testReference.getMany(this);
    Object.assign(this.referenceData, {testReference: results});
  };
}

export default new TestEntity({
  title: 'TestEntity',
  editable: true,
  fields: TEST_FIELDS,
  references: {
    testReference: {
      getMany: (entity) => getReferenceData(entity),
    },
  },
});
