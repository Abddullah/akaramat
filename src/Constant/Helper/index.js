import React from "react";
import Browse from "../../container/Browse/index";
// import FindRepresentative from "../../container/FindRepresentative/findRepresentative";

export const changeRoute = myRoute => {
  switch (myRoute) {
    case "find":
      return <Find />;
    case "Demo4":
      return <Browse />;
    case "FindRepresentative":
      return <FindRepresentative />;
    default:
      break;
  }
};
