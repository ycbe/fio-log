import {NodeRange,Fragment,Slice} from "prosemirror-model"
import {Transaction} from "prosemirror-state"
import {ReplaceAroundStep,liftTarget,canJoin} from "prosemirror-transform"

export function dedentBlock(tr: Transaction, range: NodeRange): boolean {
  const blockType = tr.doc.type.schema.nodes["blockContainer"]

  const { $to, depth, end } = range
  const endOfParent = $to.end(depth)

  if (end < endOfParent) {
    tr.step(new ReplaceAroundStep(end - 1, endOfParent, end, endOfParent,
      new Slice(Fragment.from(blockType.create(null)), 1, 0), 0, true))
    range = new NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfParent), range.depth)
  }

  const target = liftTarget(range)
  if (target == null) return false
  tr.lift(range, target)
  let after = tr.mapping.map(end, -1) - 1
  if (canJoin(tr.doc, after)) tr.join(after)
  tr.scrollIntoView()
  return true 
  }