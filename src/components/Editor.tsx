import { keymap } from "prosemirror-keymap";
import { EditorState } from "prosemirror-state";
import { schema } from "../editor/schema/editor-schema";
import { ProseMirror, reactKeys } from "@nytimes/react-prosemirror";
import { editorKeyMap } from "../editor/commands/keymap";
import {  useState } from "react";
import "prosemirror-view/style/prosemirror.css";
import '../styles/main.scss'
import '../styles/block.scss'

const editorState = EditorState.create({schema,  plugins: [reactKeys(),keymap(editorKeyMap)]})

export function Editor() {
    const [state, setState] = useState(editorState);

    return (
      <ProseMirror
      state={state} 
      dispatchTransaction={function (tr) {setState((prev) => prev.apply(tr));}}
      />
      )
  }