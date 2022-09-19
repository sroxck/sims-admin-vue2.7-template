import { CreateDomConfig, DomTagName } from '@/types'

export function createDom(tagName: DomTagName, options?: CreateDomConfig) {
  const dom = document.createElement(tagName)
  if (options?.innerHtml) {
    dom.innerHTML = options.innerHtml
  }
  if (options?.id) {
    dom.id = options.id
  }
  if (options?.child) {
    dom.appendChild(options.child)
  }
  if(options?.style){
    dom.style.cssText = options.style
  }
  return dom
}
export function selectDom(tagName: DomTagName, multiple = false) {
  multiple ? document.querySelectorAll(tagName) : document.querySelector(tagName)
}
export function appendDom(targetDom:HTMLElement,dom:HTMLElement){
  targetDom.appendChild(dom)
}
