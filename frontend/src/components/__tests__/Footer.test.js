import React from "react";
import { shallow } from "enzyme";
import { Footer } from "../Footer";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const setup = overrideProps => {
  const props = Object.assign(
    {
      classes: {},
    },
    overrideProps,
  );
  const footer = shallow(<Footer {...props} />);
  return {
    footer,
    props,
  };
};

describe("<Footer />", () => {
  it("should render the contents", () => {
    const { footer } = setup();
    expect(footer.find("footer")).toHaveLength(1);
    expect(footer.find(Typography)).toHaveLength(1);
    expect(footer.find(Link)).toHaveLength(1);
  });
});
