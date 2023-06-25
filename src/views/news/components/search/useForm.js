/**
 * @Author: sroxck
 * @Date: 2023-05-08 17:04:14
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 14:42:34
 * @Description:
 */

import { h, reactive, defineComponent } from 'vue'

const useFormData = (property) => {
  const formResult = {}
  property.forEach(item => {
    formResult[item.model] = item.value || ''
  })
  const formData = reactive(formResult)
  return {
    formData
  }
}

export const Typer = {
  'text': 'el-input',
  'select': 'el-select',
  'default': 'el-input'
}

export function useForm(config) {
  const { formData } = useFormData(config.property)
  const instance = (config, _formData, ctx, handle) => {
    const { label, placeholder = `请输入${label}...`, model } = config
    return {
      props: {
        value: _formData[model],
        // prefixIcon: `iconfont ${config.native.prefixIcon}`,
        ...config.props
      },
      attrs: {
        placeholder
      },
      nativeOn: {
        keyup: (e) => {
          if (e.key == 'Enter') ctx.emit('search', _formData)
        }
      },
      on: {
        input: (e) => {
          _formData[model] = e
        },
        change: (e) => {
          handle && handle(ctx.emit, _formData)
          _formData[model] = e
        }
      }
    }
  }
  return {
    instance, formData
  }
}
