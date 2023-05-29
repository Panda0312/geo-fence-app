import { OperationNote, ScrollRoot, ScrollContent } from "./styled";

export const Note = () => {
  return (
    <OperationNote>
      <ScrollRoot>
        <ScrollContent>
          <hr />
          <h3>Map Instructions:</h3>
          <b>Add Fence</b>
          <br />
          1. Click Add GeoFence.
          <br />
          2. &quot;Click map&quot; will add vertex.
          <br />
          3. &quot;Double click&quot; will pause pending line drawing.
          <br />
          4. Click &quot;Cancel&quot; to remove current fence.
          <br />
          5. Click &quot;Complete&quot; to complete fence and will autosave.
          <br />
          <hr />
          <b>Edit Fence</b>
          <br />
          1. Click a fence will show edit components.
          <br />
          2. Selected fence with bolder boundary line.
          <br />
          3. click selected fence to deselect.
          <br />
          4. update edit fence form will update the saved fence info.
          <br />
          5. click Edit GeoFence button will set selected fence boundary
          editable.
          <br />
          6. click Finish Editing will set fence boundary uneditable.
          <br />
          7. Auto Save Fence boundary when deselected.
        </ScrollContent>
      </ScrollRoot>
    </OperationNote>
  );
};
