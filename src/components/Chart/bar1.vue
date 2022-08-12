<template>
    <div :class="chartOption.className" id="chartsBox1" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import 'echarts/theme/macarons'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'

import { getCurrentInstance } from 'vue-demi'
type chartConfig = {
    className: string,
    height?: string,
    width?: string,
    option?: object
}
type propConfig = {
    height?: string,
    width?: string,
    chartOption: chartConfig
    autoResize?: boolean
}
const props = withDefaults(defineProps<propConfig>(), {
    height: '80%',
    width: '100%',
    autoResize: true,
})
// const props = defineProps<propConfig>()
const root = getCurrentInstance() as any
let chart:{setOption?:Function,dispose?:Function} = {}
const initChart = () => {
    chart = echarts.init(document.querySelector(`.${props.chartOption.className}`) as HTMLElement, '')

    setOptions()
}
const setOptions = () => {
 const option = {
    series: [{
        type: 'liquidFill',
        radius: '70%',
        data: [0.6],
        center:[ '50%', '50%' ],
        color: 'rgba(67,209,100,1)',
        label: {
            normal: {
                color: '#fff',
                insideColor: 'transparent',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Microsoft YaHei'
                }
            }
        },
        outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
                borderColor: 'rgba(67,209,100,1)',
                borderWidth: 2
            }
        },
        backgroundStyle: {
            color: 'rgba(67,209,100,.3)'
        }
    }]

};
    if(chart.setOption){
        chart.setOption(option)
    }
}

onMounted(() => {
    initChart()
})
onBeforeMount(() => {
    if(chart.dispose){
        chart.dispose()
    }
})
</script>

<style>
</style>
