import { extendTheme } from "@chakra-ui/react";

import { MultiSelectTheme } from "chakra-multiselect";

const customTheme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

export default customTheme;
