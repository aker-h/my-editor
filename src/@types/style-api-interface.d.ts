interface StyleApiInterface {
    removeHeightTextPaneDivPropByKey (key: string): void;

    updateHeightHeader (hightHeader: number): void;
    updateHeightFooter (heightFooter: number): void;
    updateHeightTab (heightTab: number): void;
    updateHeightTextPaneDivProp (prop: HeightsTextPaneDivProp): void;
    updateWidthTabLabelsOuter (widthTabLabelsOuter: number): void;
    updateWidthLineNumbers (widthLineNumbers: number): void;
}