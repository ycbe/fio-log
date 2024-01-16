import {NodeSpec} from "prosemirror-model"
export const blockContentSpec : NodeSpec = {
    attrs:{
        id:{
            default: null
        }
    },
    content : "block+",
    toDOM(node) {
        return ["div",{class:"block-content"},0]
    },

}