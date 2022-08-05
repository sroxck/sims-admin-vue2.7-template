import { defineComponent } from "vue";
import "./index.scss";
import collapse from "./collapse";
export default defineComponent({
  components: {
    collapse,
  },
  setup(props, { slots }) {
    return () => (
      <div class="navbar">
        <nav class="navbar-content  ">
          <collapse />
        </nav>
        {slots.default && slots.default()}
      </div>
    );
  },
});
