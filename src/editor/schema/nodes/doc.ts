import {NodeSpec} from "prosemirror-model"
export const docSpec : NodeSpec = {
    attrs:{
        id:{
            default: null
        }
    },
    content : "blockContainer+"
}