import {Schema} from "prosemirror-model"
import { blockContainerSpec, blockContentSpec, docSpec, paragraphSpec, textSpec } from "./nodes"

export const schema = new Schema({nodes:{
    doc:docSpec,
    blockContainer:blockContainerSpec,
    blockContent:blockContentSpec,
    paragraph:paragraphSpec,
    text:textSpec
}})