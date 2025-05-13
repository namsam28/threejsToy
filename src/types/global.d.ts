import {FC, SVGProps} from "react";

// svg 모듈 선언
declare global {
  module "*.svg" {
    const component: FC<SVGProps<SVGSVGElement>>;
    export default component;
  }
}
