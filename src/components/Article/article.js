import { getToken, setToken, removeToken } from "@/utils/auth";
import MDinput from '@/components/MDinput/index.vue'
import Tinymce from "@/components/Tinymce/index.vue";
import { postFun, getFun, formDataFun, postHeaderFun } from "@/api/common";
import { quillEditor } from 'vue-quill-editor'

const toolbar = [
  ['bold', 'italic', 'underline', 'strike', 'clean', 'blockquote', 'code-block',
    { header: 1 },
    { header: 2 },
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '-1' },
    { indent: '+1' },
    { align: [] },
    { script: 'sub' },
    { script: 'super' },
    { color: [] },
    { background: [] },
  ],
]
export default {
  name: "addEditor",
  components: { editor: quillEditor, Tinymce, MDinput },
  props: ['show','type'],
  data() {
    return {
      editorOption: {
        placeholder: '请输入新闻内容...',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbar
          }
        }
      },
      headers: {
        Authorization: getToken(),
      },
      form: {
        newsTitle: "", // 标题
        newsLabel: "", // 标签
        newsText: "", // 内容
        status: true, // 新增:1 编辑:0
      },
      column: [],
      rules: {
        newsTitle: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
       
        newsType: [
          { required: true, message: "请输入新闻类型", trigger: "blur" },
        ],
        newsText: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
      newsId:'',
      content: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      /** 菜单隐藏显示 */
      dialogVisible: false,
      file1: null,
      imageUrl: null,
      orderNumber: [],
      order: true,
      fileList: [],
      useQuill: false,
      coverShow:false,
    };
  },
  mounted() {
    this.init();
    this.form.newsText = "";
    this.file1 = null;
    console.log(this.type,'type')
    if(this.type){
      this.imageUrl=this.type.newsImg
      this.form.newsTitle = this.type.newsTitle
      this.form.newsText = this.type.newsText
      this.form.newsType = this.type.newsType
      this.dynamicTags = this.type.newsLabel.split(',')
      this.emrName = '编辑'
      this.newsId = this.type.newsId
      if(this.type.view){
        this.coverShow = true
        // this.form.status = 0
      }
    }
  },
  activated() {

  },
  methods: {
    handleClose11(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      if (this.dynamicTags.length >= 5) {
        return this.$message.warning('标签超过指定数量')
      }
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    async init() {
      const data = this.dict();
      this.column = data
    },
    changeColumn(value) {
      this.order = false;
      const data = this.dict();
    },
    addShow() {
      this.dialogVisible = true;
      this.form.newsText = "";
    },
    // 上传文件处理
    handleVectorSuccess(res, file) {

    },
    // 上传成功处理
    handleImageSuccess(res, file) {

    },
    handleImageSelect(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]; // 只展示最后上传的文件,并且覆盖之前的文件
      }
      if (file) {
        const fileExt = ["jpg", "jpeg", "png"].includes(
          file.name.split(".").pop().toLocaleLowerCase()
        );

        if (file.size / 1024 / 1024 > 3) {
          this.fileList = []
          return this.$message.error("图样文件应小于3M");
        }
        if (fileExt) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.file1 = file;
          fetch(this.imageUrl)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageUrl = reader.result;
            };
            reader.readAsDataURL(blob);
          });
        } else {
          this.fileList = []
          this.$message.error("上传的图片格式不正确");
        }
      }
    },
    submit() {
      this.$refs.formName.validate(async (valid) => {
        if (valid) {
          this.form.newsLabel = this.dynamicTags.join()
          this.dynamicTags.filter(Boolean)
       
          if (this.emrName == "编辑") { // 编辑处理逻辑
            this.form.newsImg = this.imageUrl
            this.form.status = undefined
            this.form.newsId = this.newsId
            const res = await postFun("/api/newsmanage/newsmod", this.form);
            if (res.status == 200) {
              this.handleClose();
              this.$message.success("修改成功");
              this.$emit("upload");
            } else {
              this.handleClose();
              this.$message.danger("操作失败");
            }
          } else { // 新增处理逻辑
            this.form.newsImg = this.imageUrl
            this.form.status = undefined
            // this.form.articleColumn = undefined
            const res = await postFun("/api/newsmanage/newsadd", this.form,);
            this.form.status = true

            if (res.status == 200) {
              this.handleClose();
              this.$message.success("保存成功");
              this.$emit('upload')
            } else {
              this.handleClose();
              this.$message.error("操作失败");
            }
          }
        } else { // 如果验证不通过
          this.$message.warning("请按规则填写");
          return false;
        }
      });
    },
    deactivated() {
      this.$destroy("addEditor");
    },
    handleRemove(file, fileList) {
      if (fileList.length > 0) return
      this.imageUrl = ''
      this.file1 = null
      file = null
    },
    /** 关闭弹框 */
    handleClose() {
      // this.dialogVisible = false;
      this.$emit('update:show', false)
      this.$refs.formName.resetFields();
      this.$refs.upload.clearFiles();
      this.file1 = null;
      this.newsId = null;
      this.coverShow = false
      this.imageUrl = null;
      this.fileList = [];
      this.dynamicTags = []
      this.order = true
      delete this.emrName
      delete this.form.articleId
      delete this.form.cover
      Object.assign(this.$data.form, this.$options.data().form);
    },
    dict() {
      return  [
        '中心动态', '新闻动态', '通知公告', '图片要闻', '重要声明', '健康馆', '中医培训', '同业资讯', '成功案例'
      ].map((element, index) => {
        return { value: index + 1, label: element };
      })
    },
  },
};
