import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import PageLayout, { PageLayoutProps } from "./";

const defaultProps: PageLayoutProps = {
  pageName: "page",
  children: <div />,
};

describe("<PageLayout />", () => {
  it("should render without crash", () => {
    const tree = render(<PageLayout {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
