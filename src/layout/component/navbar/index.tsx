import { defineComponent } from "vue";
import './index.scss'
import collapse from "./collapse";
export default defineComponent({
  components:{
    collapse
  },
  setup(props,{slots}){
    return ()=>(
      <div class="w-full">
        <nav class="h-16 shadow  ">
          <collapse/>
        </nav>
        {slots.default && slots.default()}
        {/* {(slots as Record<string,any>).defalut()} */}
      </div>
    )
  }
})