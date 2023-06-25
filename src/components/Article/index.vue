<template>
  <div class="add ts">
    <el-dialog :visible.sync="show" :close-on-click-modal="false" width="1100px" style="" @close="handleClose"
      :append-to-body="true" :modal-append-to-body="false">

      <el-form style="position:relative" ref="formName" :model="form" label-width="83px" labelPosition="right" :rules="rules">
        <el-row>
          <el-form-item label="" prop="newsTitle">
            <MDinput name="标题" v-model.trim="form.newsTitle" placeholder="请输入新闻标题（5～30字）" :disabled="!form.status">新闻标题
            </MDinput>
            <!-- <el-input style="width:96%;z-index:990;font-size:24px;margin-top:5px" v-model.trim="form.newsTitle" placeholder="请输入新闻标题（5～30字）" :disabled="!form.status"></el-input> -->
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="newsText" label="" style="position: relative;">
            <Tinymce style="width: 96%;" v-model="form.newsText" v-if="show" ref="tiny"></Tinymce>
            <div :class="{ hide: !form.status }">
            </div>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item prop="articleSummary" label="新闻简介" style="">
            <el-input class="initInput desc" type="textarea" :disabled="!form.status" style="width:83%;"
              placeholder="限制150字..." v-model="form.articleSummary"></el-input>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item prop="newsLabel" label="新闻标签">
            <el-tag :disabled="!form.status" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
              @close="handleClose11(tag)">
              {{ tag }}
            </el-tag>
            <el-input :disabled="!form.status" class="input-new-tag" v-if="inputVisible" v-model="inputValue"
              ref="saveTagInput" size="small" maxlength="4"
              @input.native="inputValue = inputValue.replace(/^[A-Za-z0-9]{4}/g, '')"
              @keypress.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" :disabled="!form.status" @click="showInput">+
              新标签</el-button>
          </el-form-item>
        </el-row> 
        <el-row>
          <el-form-item prop="newsType" label="新闻类型">
            <el-select class="initInput" style="width:18.9vw" v-model="form.newsType" placeholder="请选择新闻类型"
              :disabled="!form.status" @change="changeColumn">
              <el-option v-for="(item, index) in column" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item prop="orderNumber" label="排序数字">
            <el-select class="initInput" style="width:18.9vw" v-model="form.orderNumber" placeholder="请选择新闻排序"
              :disabled="!form.status || order">
              <el-option v-for="(item, index) in orderNumber" :key="index" :label="item['value']"
                :value="item['key']"></el-option>
            </el-select>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item label="封面图片">
            <el-upload ref="upload" :on-remove="handleRemove" accept=".jpg,.jpeg,.png,.JPEG" class="upload-demo initInput"
              :auto-upload='false' :disabled="!form.status"
              style="width:18.9vw;margin-left: 81px;margin-top: 10px;" drag :on-success="handleImageSuccess" name="image"
              :on-change="handleImageSelect" :file-list="fileList" action="/trade-admin/api/article/imageUpload"
              :multiple="false" :with-credentials="true" :headers="headers">
              <img v-show="imageUrl" :src="imageUrl" class="upload-profile" width="360" height="180" ref="imgfile">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">请上传jpg或png格式图片，图形应清晰，图片文件应小于 3mb 
              </div>
            </el-upload>
          </el-form-item>
        </el-row>
        <div class="coverNews" v-if="coverShow"></div>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" class="btnSuc btnClo" style="z-index:99999999999">{{coverShow ? '关 闭 预 览' : '取 消'}}</el-button>
        <el-button type="primary" @click="submit" class="btnSuc" v-if="!coverShow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import article from './article'
export default {
  ...article
}
</script>

<style lang="scss" scoped>
@import "./article.scss";
.coverNews {
  width: 100%;
    height:100%;
    background: #ccc;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
::v-deep .mce-menubtn.mce-fixed-width span {
  width: 30px !important;
}

::v-deep .ql-editor {
  height: 350px !important;
}

::v-deep .ql-container.ql-snow {
  border: none !important;
}

::v-deep .ql-toolbar {
  position: absolute !important;
  width: 98% !important;
  justify-content: space-around !important;
  left: 1% !important;
  top: -159px !important;
  /* display: flex; */
  text-align: center !important;
  border: none !important;
}

::v-deep .ql-snow.ql-toolbar button svg,
.ql-snow .ql-toolbar button svg {
  width: 25px;
  height: 20px;
}

::v-deep .el-dialog__footer {
  position: sticky;
  bottom: 0;
  background: #F7F7F7;
}

::v-deep .el-dialog__body {
  // overflow-y: auto;
}
</style>
