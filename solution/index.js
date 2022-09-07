const TEXT_STYLES_MAPPER = {
    fontSize: (value) => `font-size: ${value}px;`,
    fontWeight: (value) => `font-weight: ${value};`,
    textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
};

const CARD_STYLES_MAPPER = {
    absoluteBoundingBox: (value) =>
        `top: ${value.y}px; left: ${value.x}px; width: ${value.width}px; height: ${value.height}px;`,
    cornerRadius: (value) => `border-radius: ${value}px;`,
    paddingLeft: (value) => `padding-left: ${value}px;`,
    paddingRight: (value) => `padding-right: ${value}px;`,
    paddingTop: (value) => `padding-top: ${value}px;`,
    paddingBottom: (value) => `padding-bottom: ${value}px;`,
    backgroundColor: (value) => `background: rgba(${value.r}, ${value.g}, ${value.b}, ${value.a});`,
    itemSpacing: (value) => `margin: ${value}px;`,
};

const buildBlock = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}">${content}</${type}>`;
};

const buildCard = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}">${content}</${type}>`;
};

const getTextStyles = (node) => {
    // console.log(node);
    const styleArr = [];
    if (node.style) {
        for (let [key, value] of Object.entries(node.style)) {
            if (TEXT_STYLES_MAPPER[key]) {
                styleArr.push(TEXT_STYLES_MAPPER[key](value));
            }
        }
    }
    return styleArr.join(" ");
};

const cardStyles = (node) => {
    const styleArr = [];
    if (node.absoluteBoundingBox) {
        styleArr.push(CARD_STYLES_MAPPER["absoluteBoundingBox"](node.absoluteBoundingBox));
    }

    if (node.cornerRadius) {
        styleArr.push(CARD_STYLES_MAPPER["cornerRadius"](node.cornerRadius));
    }

    if (node.paddingLeft && node.paddingRight && node.paddingTop && node.paddingBottom) {
        styleArr.push(CARD_STYLES_MAPPER["paddingLeft"](node.paddingLeft));
        styleArr.push(CARD_STYLES_MAPPER["paddingRight"](node.paddingRight));
        styleArr.push(CARD_STYLES_MAPPER["paddingTop"](node.paddingTop));
        styleArr.push(CARD_STYLES_MAPPER["paddingBottom"](node.paddingBottom));
    }

    if (node.backgroundColor) {
        node.backgroundColor.r = Math.round(node.backgroundColor.r * 255);
        node.backgroundColor.g = Math.round(node.backgroundColor.g * 255);
        node.backgroundColor.b = Math.round(node.backgroundColor.b * 255);
        styleArr.push(CARD_STYLES_MAPPER["backgroundColor"](node.backgroundColor));
    }

    if (node.itemSpacing) {
        styleArr.push(CARD_STYLES_MAPPER["itemSpacing"](node.itemSpacing));
    }

    return styleArr.join(" ");

};

const PRIMITIVES = {
    TEXT: (node) => {
        // console.log(node);
        return buildBlock({
            type: "span",
            content: node.characters,
            className: node.type,
            style: getTextStyles(node),
        });
    },
};

const CARD_PRIMITIVES = {
    INSTANCE: (node) => {
        return buildCard({
            type: "div",
            content: 'test',
            className: node.type,
            style: cardStyles(node),
        });
    }
}

const parse = (entry) => {
    return traverse(entry.children[0]) + traverseCard(entry.children[0]);
};

const traverse = (node) => {
    const textNode = node.children[0].children[0];
    return PRIMITIVES[textNode.type](textNode);
};

const traverseCard = (node) => {
    const textNode = node.children[1].children[0];
    return CARD_PRIMITIVES[textNode.type](textNode);
};

module.exports = function (json) {
    const entry = json.document.children[0];
    return parse(entry);
};
