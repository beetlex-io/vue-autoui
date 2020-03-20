/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _9b372fe6a21e408b9d75ae8b38c63131='<el-form :size="size" :label-width="labelwidth+\'px\'" :model="data" ref="customForm"><el-row v-for="row in rows"><el-col v-for="item in row" v-if="!item.hide" :span="parseInt(22/row.length)"><div class="grid-content bg-purple"><auto-property v-model="item.value" :item="item" @valuechange="valueChange"></auto-property></div></el-col></el-row>';
Vue.component('auto-form',
    {
        props: ["info", "value", "size", "url"],
            data(){
            return {
                rows: [],
                data: { items: [] },
                labelwidth: this.info ? (this.info.labelwidth ? this.info.labelwidth : 120) : 120,
                dataUrl: this.url,
            }
        },
        model: {
            prop: 'value',
                event: 'change',
        },
        methods: {
            init(items){
                this.data.items = [];
                this.rows = [];
                var rowItems = [];
                for (i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.type == 'checkbox' && !item.value)
                        item.value = [];
                    item.index = i;
                    this.data.items.push(item);
                    rowItems.push(item);
                    if (item.eof == true) {
                        this.rows.push(rowItems);
                        rowItems = [];
                    }
                }
                if (rowItems.length > 0)
                    this.rows.push(rowItems);
                this.$refs['customForm'].clearValidate();
            },
            getField(name){
                var result;
                this.data.items.forEach(v => {
                    if (name.toLowerCase() == v.name.toLowerCase()) {
                        result = v;
                    }
                });
                return result;
            },
            valueChange(info){
                this.$emit('change', this.getData());
                // this.init(this.data.items);
                this.$refs['customForm'].validate((valid) => {
                    result = valid;
                });
                this.$emit('fieldchange', { item: info, properties: this.data.items })
            },
            success(){
                var result = null;
                this.$refs['customForm'].validate((valid) => {
                    result = valid;
                });
                return result;
            },
            getData(){
                var result = new Object();
                for (i = 0; i < this.data.items.length; i++) {
                    if (!this.data.items[i].hide)
                        this.getProperty(result, this.data.items[i]);
                }
                return result;
            },
            setData(val){
                if (val) {
                    for (i = 0; i < this.data.items.length; i++)
                        this.setProperty(val, this.data.items[i]);
                }
            },
            setProperty(obj, info){
                if (info.type == 'checkbox' && !obj) {
                    info.value = [];
                }
                else {
                    if (obj[info.name])
                        info.value = obj[info.name];
                }
                if (info.setValue)
                    info.setValue(info.value);
            },
            getProperty(obj, info){
                if (info.parent) {
                    if (!obj[info.parent])
                        obj[info.parent] = new Object();
                    obj[info.parent][info.name] = info.value;
                }
                else {
                    obj[info.name] = info.value;
                }
            },
            loadData(url){
                if (url && beetlex) {
                    var getDetail = new beetlexAction('/__apidoc/GetApiDetail');
                    getDetail.requested = (r) => {
                        this.column = r.col;
                        this.labelwidth = r.labelwidth;
                        this.init(r.items);
                        this.setData(this.value);
                        this.$emit('change', this.getData());
                        this.$emit('completed', r.items);
                    };
                    getDetail.get({ url: url });
                }
            }
        },
        mounted(){
            if (this.info)
                this.init(this.info.items);
            this.setData(this.model);
            this.loadData(this.dataUrl);
        },
        watch: {
            info(val){
                if (val.labelwidth)
                    this.labelwidth = val.labelwidth;
                else
                    this.labelwidth = 120;
                this.init(val.items);
            },
            value(val)
            {
                this.setData(val);
            },
            url(val){
                this.dataUrl = val;
                this.loadData(this.dataUrl);
            },
        },
template:_9b372fe6a21e408b9d75ae8b38c63131
});

/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _530df08920e14215a862f77f9e820877='<div :style="gridStyle" :class="gridClass"><div style="height:100%"><el-table :data="gridData"style="width: 100%;"height="100%"@selection-change="selectionChange" :size="gridSize"><el-table-column v-if="gridSelection" type="selection"width="55"></el-table-column><el-table-column v-for="col in gridColumns":label="col.label?col.label:col.name":width="getWidth(col)"><template slot-scope="item"><div v-if="gridEdit && !col.readonly && item.row._editor==true"><el-input-number v-if="col.type==\'number\'" v-model="item.row[col.name]" :min="-9999999" :max="9999999" style="width: 100%;" :size="gridSize"></el-input-number><el-link v-else-if="col.type==\'link\'" type="primary" @click="onCommand(item.row,col.name)">{{item.row[col.name]}}</el-link><el-date-picker v-else-if="col.type==\'date\'" v-model="item.row[col.name]"align="left"type="date" style="width: 100%;" :size="gridSize"></el-date-picker><el-time-picker v-else-if="col.type==\'time\'" v-model="item.row[col.name]" style="width: 100%;" :size="gridSize"></el-time-picker><el-select v-else-if="col.type==\'select\'" v-model="item.row[col.name]" style="width: 100%;" :size="gridSize"><el-option v-if="col.data && col.nulloption==true">无选择</el-option><el-option v-if="col.data" v-for="sitem in col.data" :label="sitem.label?sitem.label:sitem.value" :value="sitem.value"></el-option></el-select><el-radio-group v-else-if="col.type==\'radio\'" v-model="item.row[col.name]" :size="gridSize"><el-radio v-if="col.data" v-for="sitem in col.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-radio></el-radio-group><el-checkbox-group v-else-if="col.type==\'checkbox\'" v-model="item.row[col.name]" :size="gridSize"><el-checkbox v-if="col.data" v-for="sitem in col.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-checkbox></el-checkbox-group><el-switch v-else-if="col.type==\'switch\'" v-model="item.row[col.name]" :size="gridSize"></el-switch><el-input v-else-if="col.type==\'remark\'" v-model="item.row[col.name]" type="textarea" :row="col.row?col.row:3" :size="gridSize"></el-input><img v-else-if="col.type==\'img\'" :src="item.row[col.name]" /><el-input v-else v-model="item.row[col.name]" :size="gridSize"></el-input></div><div v-else><el-link v-if="col.type==\'link\'" type="primary" @click="onCommand(item.row,col.name)">{{item.row[col.name]}}</el-link><img v-else-if="col.type==\'img\'" :src="item.row[col.name]" /><span v-else> {{getViewValue(item.row[col.name],col.data)}}</span></div></template></el-table-column><el-table-column v-if="gridDelete||gridEdit" width="100" align="right"><template slot-scope="item"><el-button v-if="item.row._editor==false" type="primary" :size="gridSize" icon="el-icon-edit" circle @click="onEdit(item.row)"></el-button><el-button v-if="item.row._editor==true" type="success" :size="gridSize" icon="el-icon-check" circle @click="onItemChange(item.row)"></el-button><el-button v-if="gridDelete" :size="gridSize" type="danger" icon="el-icon-delete" circle @click="onItemDelete(item.row)"></el-button></template></el-table-column></el-table></div><div style="text-align:right;"><el-pagination v-if="gridPages>1" layout="prev, pager, next" @current-change="onCurrentChange":page-size="1":total="gridPages" :current-page="gridCurrentpage"></el-pagination></div>';
Vue.component('auto-grid',
    {
        props: ["columns", "height", "data", "selection", "delete", "edit", "size", "pages", "currentpage", "url", "style", "class"],
            data(){
            return {
                gridColumns: this.columns ? this.columns : [],
                gridData: [],
                gridHeight: this.height ? this.height : '',
                gridSelection: this.selection,
                gridDelete: this.delete,
                gridEdit: this.edit,
                gridSize: this.size,
                gridPages: this.pages ? this.pages : 0,
                gridCurrentpage: this.currentpage ? currentpage + 1 : 1,
                gridColumnsUrl: this.url,
                gridStyle: this.style,
                gridClass: this.class,
            };
        },
        methods: {
            getColumn(name){
                var result;
                this.gridColumns.forEach(v => {
                    if (name.toLowerCase() == v.name.toLowerCase()) {
                        result = v;
                    }
                });
                return result;
            },
            onCommand(item, name){
                this.$emit("command", { data: item, field: name });
            },
            getWidth(item){
                if (item.width)
                    return item.width;
                return '';
            },
            getViewValue(value, data){
                var result = value;
                if (data) {
                    data.forEach((v => {
                        if (v.value == value) {
                            result = v.label ? v.label : v.value;
                            return;
                        }
                    }));
                }
                return result;
            },
            selectionChange(val){
                this.$emit("selectchange", val);
            },
            onItemDelete(item){
                var e = {
                    data: item,
                    success: () => {
                        this.gridData.splice(item._id, 1);
                        this.onRefresh();
                    }
                }
                this.$emit("itemdelete", e);
            },
            onItemChange(item){
                var e = {
                    data: item,
                    success: () => {
                        item._editor = false;
                        this.onRefresh();
                    }
                }
                this.$emit("itemchange", e);
            },
            onEdit(item){
                var items = this.gridData;
                items.forEach((v) => {
                    if (v == item) {
                        v._editor = true;
                    }
                });
                this.onRefresh();
            },
            onRefresh(){
                this.gridData.push({});
                this.gridData.splice(this.gridData.length - 1, 1);
                for (i = 0; i < this.gridData.length; i++) {
                    this.gridData[i]._id = i;
                }
                this.gridHeight = this.height ? this.height : '';
            },
            onCurrentChange(index){
                this.$emit('pagechange', index - 1);
            },
            loadData(url){
                if (url && beetlex) {
                    var getDetail = new beetlexAction('/__apidoc/GetGridDetail');
                    getDetail.requested = (r) => {
                        this.gridColumns = r;
                        this.loadColumnsUrlData();
                        this.$emit('completed', r);
                    };
                    getDetail.get({ url: url });
                }
            },
            loadColumnsUrlData(){
                if (this.gridColumns) {
                    this.gridColumns.forEach((v) => {
                        if (v.dataurl) {
                            this.loadColumnData(v);
                        }
                    });
                }
            },
            loadColumnData(col){
                if (col.dataurl && beetlex) {
                    var action = new beetlexAction(col.dataurl);
                    action.requested = (r) => {
                        col.data = r;
                    };
                    action.get();
                }
            }
        },
        mounted(){
            this.gridData = [];
            if (this.data) {
                this.data.forEach(v => {
                    v._editor = false;
                    this.gridData.push(v);
                });
                this.onRefresh();
            }
            this.selectionChange([]);
            this.loadData(this.gridColumnsUrl);
            this.loadColumnsUrlData();
        },
        watch: {
            pages(val){
                this.gridPages = val ? val : 0;
            },
            currentpage(val){
                this.gridCurrentpage = val ? val + 1 : 1;
            },
            columnsurl(val){
                this.gridColumnsUrl = val;
                this.loadData(this.gridColumnsUrl);
            },
            columns(val){
                this.gridColumns = val ? val : [];
                this.loadColumnsUrlData();
            },
            data(val){
                this.gridData = [];
                if (val) {
                    val.forEach(v => {
                        v._editor = false;
                        this.gridData.push(v);
                    });
                    this.onRefresh();
                }
                this.selectionChange([]);
            },
        }
,template:_530df08920e14215a862f77f9e820877
});

/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _993fc861028e464fa174e291396c9e35='<div><el-form-item v-if="info.enabled==false" :label="info.label?info.label:info.name"><el-input :value="model.value":disabled="true"></el-input></el-form-item><el-form-item v-else-if="info.type==\'number\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input-number v-model="model.value" :min="-9999999" :max="9999999" style="width: 100%;" @change="updateValue"></el-input-number></el-form-item><el-form-item v-else-if="info.type==\'date\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-date-picker v-model="model.value"align="left"type="date" style="width: 100%;" @change="updateValue"></el-date-picker></el-form-item><el-form-item v-else-if="info.type==\'time\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-time-picker v-model="model.value" style="width: 100%;" @change="updateValue"></el-time-picker></el-form-item><el-form-item v-else-if="info.type==\'select\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-select v-model="model.value" style="width: 100%;" @change="updateValue"><el-option v-if="item.data && item.nulloption==true">无选择</el-option><el-option v-if="item.data" v-for="sitem in info.data" :label="sitem.label?sitem.label:sitem.value" :value="sitem.value"></el-option></el-select></el-form-item><el-form-item v-else-if="info.type==\'radio\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-radio-group v-model="model.value" @change="updateValue"><el-radio v-if="info.data" v-for="sitem in info.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-radio></el-radio-group></el-form-item><el-form-item v-else-if="info.type==\'checkbox\'" :label="info.label?info.label:info.namel" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-checkbox-group v-model="model.value" @change="updateValue"><el-checkbox v-if="info.data" v-for="sitem in info.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-checkbox></el-checkbox-group></el-form-item><el-form-item v-else-if="info.type==\'switch\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-switch v-model="model.value" @change="updateValue"></el-switch></el-form-item><el-form-item v-else-if="info.type==\'password\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input v-model="model.value" show-password @change="updateValue"></el-input></el-form-item><el-form-item v-else-if="info.type==\'remark\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input v-model="model.value" type="textarea" @change="updateValue" :rows="info.row?info.row:3"></el-input></el-form-item><el-form-item v-else-if="info.type==\'rate\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-rate v-model="model.value" @change="updateValue"></el-rate></el-form-item><el-form-item v-else-if="info.type==\'upload\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-upload class="upload-demo":action="info.uploadurl":show-file-list="false":on-success="onUploadSuccess":on-error="onUploadError":on-progress="onUploadProcess":before-upload="onBeforeChange"><el-button type="primary">点击上传</el-button><div slot="tip" class="el-upload__tip" style="display:contents;"><span v-if="!uploadFileName">(大小不超过{{info.filesize?info.filesize:500}}kb)</span><el-tag v-if="uploadFileName" size="small" effect="plain" style="margin-left:10px;">{{uploadFileName}}</el-tag><el-tag v-if="uploadError" size="small" type="danger" style="margin-left:10px;">{{uploadError}}</el-tag><i v-if="uploading==true" class="el-icon-loading"></i></div></el-upload></el-form-item><el-form-item v-else-if="info.type==\'uploadimg\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-upload :action="info.uploadurl":show-file-list="false":on-success="onUploadSuccess":on-error="onUploadError":on-progress="onUploadProcess":before-upload="onBeforeChange" style=""><img v-if="uploadImgUrl" :src="uploadImgUrl" style="max-height:120px;"><i v-else class="el-icon-plus" style="height:120px;width:120px;text-align:center;line-height:120px;border: 1px dashed #d9d9d9"></i><div slot="tip" class="el-upload__tip" style="display:contents;"><span v-if="!uploadFileName">(大小不超过{{info.filesize?info.filesize:500}}kb)</span><el-tag v-if="uploadFileName" size="small" effect="plain" style="margin-left:10px;">{{uploadFileName}}</el-tag><el-tag v-if="uploadError" size="small" type="danger" style="margin-left:10px;">{{uploadError}}</el-tag><i v-if="uploading==true" class="el-icon-loading"></i></div></el-upload></el-form-item><el-form-item v-else-if="info.type==\'color\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-color-picker v-model="model.value" @change="updateValue"></el-color-picker></el-form-item><el-form-item v-else :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input v-model="model.value" @change="updateValue"></el-input></el-form-item>';
Vue.component('auto-property',
    {
        props: ["item", "value"],
            model: {
            prop: 'value',
                event: 'change',
        },
        data() {
            return {
                model: {
                    value: this.value,
                },
                info: this.item,
                rules: [],
                uploadFileName: '',
                uploadError: '',
                uploading: false,
                uploadImgUrl: '',
            }
        },
        methods: {
            onUploadSuccess(response, file, fileList){
                this.uploading = false;
                this.model.value = response;
                this.updateValue();
            },
            onUploadError(err, file, fileList){
                this.uploadError = err.message;
                this.uploading = false;
            },
            onBeforeChange(file){
                this.uploadError = null;
                var maxSize = this.info.filesize ? this.info.filesize : 500;
                maxSize = maxSize * 1024;
                if (file.size > maxSize) {
                    this.$message.error('上传文件不能超过' + maxSize / 1024 + 'kb!');
                    return false;
                }
                if (this.info.type == 'uploadimg') {
                    if (file.type.indexOf('image') == -1) {
                        this.$message.error('选择的文件不是图片!');
                        return;
                    }
                    var reader = new FileReader();
                    reader.onloadend = () => {
                        this.uploadImgUrl = reader.result;
                    }
                    this.uploadImgUrl = reader.readAsDataURL(file);
                }
                this.uploadFileName = file.name;
                return true;
            },
            onUploadProcess(event, file, fileList){
                this.uploading = true;
            },
            updateValue(){
                this.$emit('change', this.model.value)
                this.info.value = this.model.value;
                this.$emit('valuechange', this.info);
            },
            loadData(){
                if (this.info.dataurl) {
                    var getdata = new beetlexAction(this.info.dataurl);
                    getdata.requested = (r) => {
                        this.info.data = r;
                    };
                    getdata.get();
                }
            },
            setValue(val){
                this.model.value = val;
            },
        },
        mounted(){
            this.loadData();
            if (this.info.rules)
                this.rules = this.info.rules;
            this.info.setValue = this.setValue;
        },
        watch: {
            item(val){
                this.info = val;
                this.model.value = val.value;
                if (this.info.rules)
                    this.rules = this.info.rules;
                this.loadData();
                this.info.setValue = this.setValue;
            },
        },
template:_993fc861028e464fa174e291396c9e35
});