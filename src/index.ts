/* eslint-disable @typescript-eslint/no-unused-vars */
import attachments from './data/newAttachments.json';
import oldAttachments from './data/ogAttachments.json';

type Position = {
  x: number;
  y: number;
  z: number;
};
type Rotation = {
  w: number;
  x: number;
  y: number;
  z: number;
};
type AttachmentOpt = {
  applicableConditions: number[];
  position: Position;
  rotation: Rotation;
};

type Attachments = {
  [key: string]: AttachmentOpt[];
};

export function findAndReplaceApplicableConditions(
  selectedAttachments: Attachments,
  modelAttachments: Attachments
) {
  const updatedAttachments = modelAttachments;

  Object.keys(selectedAttachments).forEach(condition => {
    selectedAttachments[condition].forEach((attachment, index) => {
      updatedAttachments[condition][index].applicableConditions =
        selectedAttachments[condition][index].applicableConditions;
    });
  });
  return updatedAttachments;
}
