import { chainCommands } from "prosemirror-commands";
import { splitBlockCommand } from "./split-block";
import { indentBlockCommand } from "./indent-block";

export const enterCommand = chainCommands(
  splitBlockCommand
)
  
export const editorKeyMap = {
  Enter : enterCommand,
  Tab: indentBlockCommand,
}