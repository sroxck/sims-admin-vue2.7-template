import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import type { PropType } from "vue";
import { FormItem, Option, Radio, Row, Col } from "element-ui";
import useFrom from "./useForm";
import type { Schema, On, FormSchema, VIf, Options } from "./useForm";
export default defineComponent({
  name: "fromItemDemo",
  props: {
    config: {
      required: true,
      type: Object,
    },
  },
  setup(props, crx) {
    console.log(crx);
    // const computedShow = computed(() => {
    //   // console.log(props.itemConfig?.options, "props.itemConfig?.options");

    //   // const vIfArr = props.itemConfig?.options?.vIf;
    //   if (!vIfArr) return true;
    //   const relationArr: any[] = props.config.property.filter((config: any) =>
    //     vIfArr.find((vIf: any) => vIf.relationKey === config.formKey)
    //   );
    //   for (const relationItem of relationArr) {
    //     const vIfItem = vIfArr.find(
    //       (_: any) => _.relationKey === relationItem.formKey
    //     );
    //     // 这里就是判断 联动的表单值 是否不满足 可以显示 的条件，不满足则不显示
    //     if (relationItem.value !== vIfItem.value) return false;
    //   }
    //   return true;

    // });
    function renderOption(type: string, data: any[]) {
      if (type === "el-select") {
        return (
          data &&
          data.map((option: any) => {
            return <Option props={option}></Option>;
          })
        );
      }
      if (type === "el-radio-group") {
        return (
          data &&
          data.map((option: any) => {
            return <Radio label={option.value}>{option.label}</Radio>;
          })
        );
      }
    }
    const res:Record<string, any> = {}
    props.config.property.forEach((item: any)=>{
      item.map((child:Record<string, any>)=>{
        res[child.formKey]= child.value
      })
    })
    const formData = reactive(res)
    console.log(formData,'resres');
    
    function itemRender(res:number) {
      return props.config.property.map((itemConfig: any,index:number) => {
          console.log(index,res);
          const p = props.config.property.length / props.config.col
          console.log(p,'pp');
          
          if(index<p  && res ==0){
            return <FormItem label={itemConfig.label} prop={itemConfig.formKey}>
            <itemConfig.type
              disabled={itemConfig?.disabled?.default}
              onInput={(v: any) => {
                console.log(v, "33");
                itemConfig.value = v;
              }}
              placeholder={itemConfig.placeholder}
              value={itemConfig.value}
              // nativeOn={itemConfig.nativeEvent}
              // on={itemConfig.event}
            >
              {renderOption(itemConfig.type, itemConfig.optionData)}
            </itemConfig.type>
          </FormItem>
          }else if(index>=p && res ==1){
            return (
              <FormItem label={itemConfig.label} prop={itemConfig.formKey}>
                <itemConfig.type
                  disabled={itemConfig?.disabled?.default}
                  onInput={(v: any) => {
                    console.log(v, "33");
                    itemConfig.value = v;
                  }}
                  placeholder={itemConfig.placeholder}
                  value={itemConfig.value}
                  // nativeOn={itemConfig.nativeEvent}
                  // on={itemConfig.event}
                >
                  {renderOption(itemConfig.type, itemConfig.optionData)}
                </itemConfig.type>
              </FormItem>
            );
          }
       
      });
    }
    return () => {
      // if (!computedShow.value) return;
      console.log(props.config.col, "props.config.col");

      return (
        <Row>
          {props.config.col
            ? new Array(props.config.col)
                .fill("meaningless")
                .map((item, index) => {
                  console.log('index',index)
                  return (
                    <Col span={24 / props.config.col}>{itemRender(index)}</Col>
                  )
                })
            : itemRender(3)}
          {/* {itemRender()} */}
        </Row>
      );
    };
  },
  // render(h){
  //   return h('el-form-item', {
  //     props: {
  //       label: this.itemConfig.label
  //     }
  //   }, [
  //       // h((this.itemConfig as Record<string,any>).type) // input组件
  //   ])
  // }
});
