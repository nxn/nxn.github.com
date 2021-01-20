import type { PrismTheme } from "prism-react-renderer";
import palette from "./palette";

const colors = {
    char:           "#D8DEE9",
    comment:        palette.text.alternate.main,
    keyword:        palette.nav.main,
    primitive:      palette.actions.secondary.main,
    string:         "#8dc891",
    variable:       palette.text.standard.light,
    boolean:        palette.actions.primary.light,
    punctuation:    palette.accents.purple,
    tag:            "#fc929e",
    function:       palette.text.alternate.light,
    className:      palette.accents.green,
    method:         "#6699CC",
    operator:       palette.nav.dim
};

const theme: PrismTheme = {
    plain: {
        color:              palette.text.standard.main,
        backgroundColor:    palette.bgs.secondary.dark
    },
    styles: [{
        types: ["attr-name"],
        style: {
            color: colors.keyword
        }
    },{
        types: ["attr-value"],
        style: {
            color: colors.string
        }
    },{
        types: ["comment", "block-comment", "prolog", "doctype", "cdata", "shebang"],
        style: {
            color: colors.comment
        }
    },{
        types: [
            "property",
            "number",
            "function-name",
            "constant",
            "symbol",
            "deleted"
        ],
        style: {
            color: colors.primitive
        }
    },{
        types: ["boolean"],
        style: {
            color: colors.boolean
        }
    },{
        types: ["tag"],
        style: {
            color: colors.tag
        }
    },{
        types: ["string"],
        style: {
            color: colors.string
        }
    },{
        types: ["punctuation"],
        style: {
            color: colors.punctuation
        }
    },{
        types: ["selector", "char", "builtin", "inserted"],
        style: {
            color: colors.char
        }
    },{
        types: ["function"],
        style: {
            color: colors.function
        }
    },{
        types: ["entity", "url", "variable"],
        style: {
            color: colors.variable
        }
    },{
        types: ["operator"],
        style: {
            color: colors.operator
        }
    },{
        types: ["keyword"],
        style: {
            color: colors.keyword
        }
    },{
        types: ["at-rule", "class-name"],
        style: {
            color: colors.className
        }
    },{
        types: ["important"],
        style: {
            fontWeight: "400"
        }
    },{
        types: ["bold"],
        style: {
            fontWeight: "bold"
        }
    },{
        types: ["italic"],
        style: {
            fontStyle: "italic"
        }
    },{
        types: ["namespace"],
        style: {
            opacity: 0.7
        }
    }]
};
  
export default theme;