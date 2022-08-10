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
      <div class="content flex h-screen">
        <sidbar></sidbar>
        <navbar>
          <main class="pt-2 overflow-auto">
          <transition name="sale-fade" mode="out-in">
              <router-view></router-view>
          </transition>
          </main>
        </navbar>
      </div>
    );
  },
});
