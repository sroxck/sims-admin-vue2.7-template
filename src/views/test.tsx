import {useStore,storeToRefs} from '@/store/index'
import { ref, onMounted,defineComponent, computed } from "vue";
import './test.scss'
import {findMax} from 'sims-tools'
export default defineComponent({
  setup() {
   const store1= useStore()
   const {res} = storeToRefs(store1)
   console.log(store1,res.value = '22');
    
    console.log(findMax([1,2,3]));
    
    const count = ref(0);
    const refH1 = ref(null);
    onMounted(() => {
    });
    setTimeout(() => {
      count.value = 12;
    }, 1000);
    return () => (
      <div class=" p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div class="flex-shrink-0">
          <button class="btn btn-green">Button</button>
        </div>
        <div>
          <div class=" font-medium text-red-500 text-lg">ChitChat</div>
          <p class="text-gray-500">You have a new message!</p>
        </div>
      </div>
    );
  },
})
