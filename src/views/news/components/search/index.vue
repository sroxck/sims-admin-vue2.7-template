<!--
 * @Author: sroxck 642261686@qq.com
 * @Date: 2023-05-04 16:11:27
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 10:54:26
 * @FilePath: /cebp-dwh-web/src/views/import-manage/components/search/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
import { h, defineComponent } from 'vue'
import { useForm, Typer } from './useForm'
export default defineComponent({
  props: {
    config: {
      required: true,
      type: Object
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const { formData, instance } = useForm(props.config)
    const reset = () => {
      Object.keys(formData).forEach(item => (formData[item] = ''))
    }
    const filterData = (data) => {
      const result = {}
      Object.keys(data).filter(item => {
        const element = data[item]
        element != '' && (result[item] = element)
      })
      return result
    }
    const Form = () => {
      return h('el-form', { props: { ...props.config.config }}, [FormItem(), props.config.config.handle == false ? '' : FormHandle()])
    }

    const FormHandle = () => {
      const queryButton = h('el-button', { on: { click: () => emit('search', filterData(formData)) }, class: ['cx'] }, '查询')
      const resetButton = h('el-button', {
        on: {
          click: () => {
            reset()
            emit('search')
          }
        }
      }, '重置')
      const handle = Object.keys(props.config.handle).map(item => (
        h('el-button', {

          on: {
            click: () => {
              props.config.handle[item](emit)
            }
          }
        }, item)
      ))
      return h('el-form-item', { class: ['queryBtn'] }, [...handle,resetButton,queryButton])
    }

    const FormItem = () => {
      return props.config.property.map(item => h('el-form-item', {}, [FormItemInstance(item)]))
    }

    const FormItemInstance = (config) => {
      console.log(formData, 'formData')
      const { type = 'default', options, handle } = config || {}
      const instanceOptions = options ? FormItemInstanceOptions(config) : null
      return h(Typer[type], instance(config, formData, ctx, handle), instanceOptions)
    }

    const FormItemInstanceOptions = ({ options }) => {
      return options.map(item => (
        h('el-option', {
          props: {
            label: item.label,
            value: item.value
          }
        })
      ))
    }
    return () => Form()
  }
})

</script>

