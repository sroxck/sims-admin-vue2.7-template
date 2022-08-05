import { defineComponent } from "vue";
import sidbar from "./component/sidbar";
import navbar from "./component/navbar";
export default defineComponent({
  components: {
    sidbar,
    navbar,
  },
  setup() {
    return () => (
      <div class="content flex">
        <sidbar></sidbar>
        <navbar>
          <main class="pt-2">
            <router-view></router-view>
          </main>
        </navbar>
      </div>
    );
  },
});
