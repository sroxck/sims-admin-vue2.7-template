// import { defineComponent, PropType } from "vue";
// import { FormItem, Option, Radio, Row, Col, Form } from "element-ui";
// import type { Schema } from "./useForm";
// import { isArray } from "sims-tools";
// export default defineComponent({
//   name: "fromItemDemo",
//   props: {
//     config: {
//       required: true,
//       type: Object as PropType<Schema>,
//     },
//   },
//   setup(props, crx) {
//     return () => {
//       return (
//         <Form >
//           <Row gutter={10}>
//             {isArray(props.config.property[0])
//               ? new Array(props.config.property.length)
//                   .fill("never")
//                   .map((item: any, index: number) => {
//                     return formItemRender(index);
//                   })
//               : formItemRender(null)}
//           </Row>
//         </Form>
//       );
//     };
//   },
// });
