import { defineComponent,computed ,inject,ref} from "vue"
export default defineComponent({
 
   setup(props,ctx) {
      const res = 333
      return {res}

    },
    render(){
      
     return <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
     <div class="flex-shrink-0">
     </div>
     <div>
       <div class=" font-medium text-red-500 text-lg">ChitChat</div>
       <p class="text-gray-500">You have a new message!</p>
     </div>
   </div>
    }
})
