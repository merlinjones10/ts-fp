/* eslint-disable @typescript-eslint/no-unused-vars */
import { findAndReplaceApplicableConditions } from '../index';
import bathSelected from './astaireData/bathSelected.json';
import bathOriginalModel from './astaireData/bathOriginalModel.json';
import simpleZeroWallSelected from './astaireData/simpleZeroWall/bathSelected.json';
import simpleZeroWallOriginal from './astaireData/simpleZeroWall/bathOriginal.json';

const dummyPosition = {
  x: 0,
  y: 0,
  z: 0,
};
const dummyRotation = {
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

const selectedAttachments = {
  showerControl: [
    {
      applicableConditions: [0],
      position: dummyPosition,
      rotation: dummyRotation,
    },
    {
      applicableConditions: [0, 4, 2],
      position: dummyPosition,
      rotation: dummyRotation,
    },
    {
      applicableConditions: [],
      position: dummyPosition,
      rotation: dummyRotation,
    },
  ],
  showerWaste: [
    {
      applicableConditions: [3, 2],
      position: dummyPosition,
      rotation: dummyRotation,
    },
  ],
};
const modelAttachments = {
  showerControl: [
    {
      applicableConditions: [],
      position: dummyPosition,
      rotation: dummyRotation,
    },
    {
      applicableConditions: [],
      position: dummyPosition,
      rotation: dummyRotation,
    },
    {
      applicableConditions: [],
      position: dummyPosition,
      rotation: dummyRotation,
    },
  ],
  showerWaste: [
    {
      applicableConditions: [],
      position: dummyPosition,
      rotation: dummyRotation,
    },
  ],
};

describe('Function that converts/rectifies attachment points for a model', () => {
  test('should overwrite the applicable conditions', () => {
    const newConditions = findAndReplaceApplicableConditions(
      selectedAttachments,
      modelAttachments
    );
    expect(Object.keys(newConditions).length).toBe(
      Object.keys(modelAttachments).length
    );
    expect(Object.keys(newConditions).length).toBe(
      Object.keys(selectedAttachments).length
    );

    expect(newConditions.showerControl[0].applicableConditions).toEqual(
      selectedAttachments.showerControl[0].applicableConditions
    );
  });

  test('should overwrite applicable but positions remain the same', () => {
    const selectedConditions = bathSelected;
    const modelConditions = bathOriginalModel;

    const mutatedConditions = findAndReplaceApplicableConditions(
      selectedConditions,
      modelConditions
    );

    expect(mutatedConditions.showerControl[0].position).toEqual(
      modelConditions.showerControl[0].position
    );
    expect(mutatedConditions.bathTap[0].rotation).toEqual(
      modelConditions.bathTap[0].rotation
    );
    expect(mutatedConditions.bathOverflow[0].applicableConditions).toEqual([
      8, 1, 4,
    ]);
  });

  test('should remain unchanged for non complex product complexity ', () => {
    const mutatedConditions = findAndReplaceApplicableConditions(
      simpleZeroWallSelected,
      simpleZeroWallOriginal
    );
    expect(mutatedConditions).toEqual(simpleZeroWallOriginal);
  });
});
