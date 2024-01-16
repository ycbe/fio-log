import {
  Command,
  EditorState,
  Selection,
  Transaction,
} from 'prosemirror-state'
import { canSplit } from 'prosemirror-transform'
import { getBlockRange } from '../utils/block-range'
import { dedentBlock } from './dedent-block'
import { createAndFill } from '../utils/create-and-fill'

export const splitBlockCommand : Command = (state,dispatch) : boolean => {
  const { $from, $to } = state.selection

  if (!$from.sameParent($to)) {
    return false
  }

  if ($from.depth < 2) {
    return false
  }

  const parent = $from.parent
  const parentEmpty = parent.content.size === 0

  if (parentEmpty) {
    const tr = state.tr
    const blockRange = getBlockRange($from,$to)
    if (blockRange && dedentBlock(tr,blockRange)) {
      dispatch?.(tr)
      return true
    }
    return false
  }

  else return doSplitBlock(state,dispatch) 
}

export function doSplitBlock(
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
): boolean {

  const tr = state.tr
  tr.delete(tr.selection.from, tr.selection.to)

  const { $from, $to } = tr.selection

  const blockType = state.schema.nodes["blockContainer"]

  const blockRange = getBlockRange($from,$to)
  if (!blockRange) return false
  const {start,end} = blockRange
    
  const { parentOffset } = $to
  const atStart = parentOffset == 0
  const atEnd = parentOffset == $to.parent.content.size


  if (atStart) {
    if (dispatch) {
      tr.insert(start, createAndFill(blockType))
      dispatch(tr.scrollIntoView())
    }
    return true
  }

  if (atEnd) {
    if (dispatch) {
      tr.insert(end,createAndFill(blockType))
      tr.setSelection(Selection.near(tr.doc.resolve(end)))
      dispatch(tr.scrollIntoView())
    }
    return true
  }


  if (!canSplit(tr.doc, $from.pos, 3 )) {
    return false
    }
    
  dispatch?.(tr.split($from.pos, 3).scrollIntoView())
  return true 
}