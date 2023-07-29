export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;

export type ToolCategory = {
    icon: string;
    name: string;
    slug: string;
    color: HexColor | RGBColor;
};

export type ToolCategories = Array<ToolCategory>;
