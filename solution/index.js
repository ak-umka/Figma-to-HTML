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
    backgroundColor: (value) =>
        `background: rgba(${value.r}, ${value.g}, ${value.b}, ${value.a});`,
    itemSpacing: (value) => `margin: ${value}px;`,
};

const IMAGE_STYLES_MAPPER = {
    absoluteBoundingBox: (value) =>
        `top: ${value.y}px; left: ${value.x}px; height: ${value.height}px; width: 100%;`,
    cornerRadius: (value) => `border-radius: ${value}px;`,
    color: (value) => `background: rgba(${value.r}, ${value.g}, ${value.b}, ${value.a});`,
};

const BUTTON_STYLES_MAPPER = {
    absoluteBoundingBox: (value) => `top: ${value.y}px; left: ${value.x}px; width: ${value.width}px; height: ${value.height}px;`,
    cornerRadius: (value) => `border-radius: ${value}px;`,
    backgroundColor: (value) => `background: rgba(${value.r}, ${value.g}, ${value.b}, ${value.a});`,
    itemSpacing: (value) => `margin: ${value}px;`,
    paddingLeft: (value) => `padding-left: ${value}px;`,
    paddingRight: (value) => `padding-right: ${value}px;`,
    paddingTop: (value) => `padding-top: ${value}px;`,
    paddingBottom: (value) => `padding-bottom: ${value}px;`,
    strokeAlign: (value) => `stroke-align: ${value};`,
}

const buildBlock = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}">${content}</${type}>`;
};

const buildCard = ({ type, content, className, style, button }) => {
    return `<${type} class="${className}" style="${style}">${content} ${button}</${type}>`;
};

const buildImage = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}"/>`;
}

const buildButton = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}">${content}</${type}>`; //content is the text
}

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
        styleArr.push(
            CARD_STYLES_MAPPER["absoluteBoundingBox"](node.absoluteBoundingBox)
        );
    }

    if (node.cornerRadius) {
        styleArr.push(CARD_STYLES_MAPPER["cornerRadius"](node.cornerRadius));
    }

    if (
        node.paddingLeft &&
        node.paddingRight &&
        node.paddingTop &&
        node.paddingBottom
    ) {
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

const buttonStyle = (node) => {
    const styleArr = [];
    if (node.absoluteBoundingBox) {
        styleArr.push(
            BUTTON_STYLES_MAPPER["absoluteBoundingBox"](node.absoluteBoundingBox)
        );
    }

    if (node.cornerRadius) {
        styleArr.push(BUTTON_STYLES_MAPPER["cornerRadius"](node.cornerRadius));
    }

    if (
        node.paddingLeft &&
        node.paddingRight &&
        node.paddingTop &&
        node.paddingBottom
    ) {
        styleArr.push(BUTTON_STYLES_MAPPER["paddingLeft"](node.paddingLeft));
        styleArr.push(BUTTON_STYLES_MAPPER["paddingRight"](node.paddingRight));
        styleArr.push(BUTTON_STYLES_MAPPER["paddingTop"](node.paddingTop));
        styleArr.push(BUTTON_STYLES_MAPPER["paddingBottom"](node.paddingBottom));
    }

    if (node.backgroundColor) {
        node.backgroundColor.r = Math.round(node.backgroundColor.r * 255);
        node.backgroundColor.g = Math.round(node.backgroundColor.g * 255);
        node.backgroundColor.b = Math.round(node.backgroundColor.b * 255);
        styleArr.push(BUTTON_STYLES_MAPPER["backgroundColor"](node.backgroundColor));
    }

    if (node.itemSpacing) {
        styleArr.push(BUTTON_STYLES_MAPPER["itemSpacing"](node.itemSpacing));
    }

    return styleArr.join(" ");
}

const imageStyles = (node) => {
    const styleArr = [];
    if (node.absoluteBoundingBox) {
        styleArr.push(
            IMAGE_STYLES_MAPPER["absoluteBoundingBox"](node.absoluteBoundingBox)
        );
    }

    if (node.cornerRadius) {
        styleArr.push(IMAGE_STYLES_MAPPER["cornerRadius"](node.cornerRadius));
    }

    if (node.fills[0].color) {
        node.fills[0].color.r = Math.round(node.fills[0].color.r * 255);
        node.fills[0].color.g = Math.round(node.fills[0].color.g * 255);
        node.fills[0].color.b = Math.round(node.fills[0].color.b * 255);
        styleArr.push(IMAGE_STYLES_MAPPER["color"](node.fills[0].color));
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
            content: traverseImage(node.children[0]),
            button: traverseButton(node.children[1]),
            className: node.type,
            style: cardStyles(node),
        });
    },
};

const IMAGE_PRIMITIVES = {
    RECTANGLE: (node) => {
        return buildImage({
            type: "img",
            className: node.type,
            style: imageStyles(node),
        });
    }
}

const BUTTON_PRIMITIVES = {
    INSTANCE: (node) => {
        return buildButton({
            type: "button",
            content: "node.children[0].characters",
            className: node.type,
            style: buttonStyle(node),
        });
    }
}

const parse = (entry) => {
    return (
        traverse(entry.children[0]) +
        traverseCard(entry.children[0]) 
        // traverseButton(entry.children[0])
    );
};

const traverse = (node) => {
    const textNode = node.children[0].children[0];
    return PRIMITIVES[textNode.type](textNode);
};

const traverseCard = (node) => {
    const textNode = node.children[1].children[0];
    return CARD_PRIMITIVES[textNode.type](textNode);
};

const traverseImage = (node) => {
    const textNode = node
    return IMAGE_PRIMITIVES[textNode.type](textNode);
};

const traverseButton = (node) => {
    const textNode = node;
    // console.log(node);
    return BUTTON_PRIMITIVES[textNode.type](textNode);
}

module.exports = function (json) {
    const entry = json.document.children[0];
    return parse(entry);
};
