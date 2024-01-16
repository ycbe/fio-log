import {NodeSpec} from "prosemirror-model"
export const blockContainerSpec : NodeSpec = {
    attrs:{
        id:{
            default: null
        }
    },
    content : "blockContent blockContainer*",
    toDOM(node) {
        return ["div",{class:"block-container"},0]
    },

}