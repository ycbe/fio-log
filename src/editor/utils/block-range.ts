import { NodeRange, ResolvedPos } from 'prosemirror-model'

export function getBlockRange($from:ResolvedPos,$to:ResolvedPos) {
  if ($to.pos < $from.pos) {
    return getBlockRange($to, $from)
  }
    
  let range = $from.blockRange($to)

  while (range) {
    if (isBlockRange(range)) {
      return range
    }

    if ( range.depth <= 0) {
      break
    }
    
    range = new NodeRange($from, $to, range.depth - 1)
    }


    return null
}

export function isBlockRange(range: NodeRange): boolean {
  const { startIndex, endIndex, parent } = range
  
  for (let i = startIndex; i < endIndex; i++) {
    if (parent.child(i).type.name != "blockContainer") {
      return false
    }
  }
  
  return true
}