import { Fragment, NodeRange, Slice } from 'prosemirror-model'
import {Transaction, Command} from "prosemirror-state"
import { ReplaceAroundStep } from 'prosemirror-transform'
import { getBlockRange } from '../utils/block-range'

export const indentBlockCommand : Command = (state,dispatch) : boolean => {
  const tr = state.tr
  const {$from,$to} = tr.selection
  const blockRange = getBlockRange($from,$to)
  if (!blockRange) return false
  if (indentRange(blockRange, tr)) {
    dispatch?.(tr)
    return true
    }
  return false
  }
    

function indentRange(blockRange:NodeRange,tr:Transaction) {
  const blockType = tr.doc.type.schema.nodes["blockContainer"]
  const {start,end,startIndex,parent} = blockRange
  const prevChild = startIndex >= 1 && parent.child(startIndex - 1)
  if (prevChild) {
    tr.step(
      new ReplaceAroundStep(
        start - 1,
        end,
        start,
        end,
        new Slice(Fragment.from(blockType.create(null)), 1, 0),
        0,
        true,
        ),
      )
    return true
  }
}