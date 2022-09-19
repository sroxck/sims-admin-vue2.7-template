import { VNode, } from 'vue'

export interface DialogSlot {
  title?: VNode;
  content?: VNode;
  footer?: VNode;
}
export interface DialogProps {
  width?: string;
  top?: string;
  "append-to-body"?: boolean;
  "before-close"?:(down:Function)=>void;
  "destroy-on-close"?:boolean
}
export interface DialogEvents {
  open?: ()=>{};
  close?: ()=>{};
  opened?: ()=>{};
  closed?: ()=>{};
}
