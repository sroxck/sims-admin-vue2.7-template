import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "vue";
import { FormItem, Option, Radio, Row, Col, Form } from "element-ui";
import type { Schema } from "./useForm";
import { isArray } from "sims-tools";
import useForm from "./useForm";
export default defineComponent({
  name: "fromItemDemo",
  props: {
    config: {
      required: true,
      type: Object as PropType<Schema>,
    },
  },
  setup(props, crx) {
    const { formData } = useForm(props.config);

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

    console.log(formData, "formData.");
    function itemRender(res: number) {
      return props.config.property.map((itemConfig: any, index: number) => {
        console.log(index, res);
        const p = props.config.property.length / props.config.col;
        console.log(p, "pp");

        if (index < p && res == 0) {
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
        } else if (index >= p && res == 1) {
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
    function formItemRender(index:number|null){
      const list = index == null ? props.config.property : props.config.property[index]
      const span =  index == null ? 24 : 24 / props.config.property.length
      return <Col span={span}>
      {list.map((config: any) => {
        return (
          <FormItem props={config}>
            <config.type
              value={formData[config.formKey]}
              onInput={(e: any) =>
                (formData[config.formKey] = e)
              }
            >
              {renderOption(config.type,config.optionData)}
            </config.type>
          </FormItem>
        );
      })}
    </Col>
    }
    return () => {
      return (
        <Form>
          <Row>
            {isArray(props.config.property[0]) ? (
              new Array(props.config.property.length)
                .fill("never")
                .map((item: any, index: number) => {
                  return (
                    formItemRender(index)
                  );
                })
            ) : formItemRender(null)}
          </Row>
        </Form>
      );
    };
  },
});
