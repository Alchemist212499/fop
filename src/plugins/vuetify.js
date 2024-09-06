// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

import { VNumberInput } from "vuetify/labs/VNumberInput";

export default createVuetify({
  components: {
    VNumberInput,
  },
});

/* export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
 */
