import {NodeSpec} from "prosemirror-model"
export const paragraphSpec : NodeSpec = {
    attrs:{
        id:{
            default: null
        }
    },
    group:"block",
    content : "inline*",
    toDOM(node) {
        return ["p",0]
    },

}