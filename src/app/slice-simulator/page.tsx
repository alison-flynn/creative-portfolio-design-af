import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const slices = getSlices(searchParams.state);

  return (
    <SliceSimulator background="#F3F3F5">
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
