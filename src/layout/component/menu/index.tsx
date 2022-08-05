import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    function renderMenu() {
      return (
        <ul>
          <li>2</li>
        </ul>
      );
    }
    return () => renderMenu();
  },
});
