/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
export interface IGuideLayerProps extends IProps {
    /**
     *  The left-offset location of the vertical guides
     */
    verticalGuides?: number[];
    /**
     *  The top-offset location of the horizontal guides
     */
    horizontalGuides?: number[];
}
export declare class GuideLayer extends React.Component<IGuideLayerProps, {}> {
    render(): JSX.Element;
    private renderVerticalGuide;
    private renderHorizontalGuide;
}
