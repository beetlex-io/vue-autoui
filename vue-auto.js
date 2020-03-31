function autoField() {
    this.label = null;
    this.name = null;
    this.type = null;
    this.data = null;
    this.parent = null;
    this.dataurl = null;
    this.value = null;
    this.nulloption = false;
    this.readonly = false;
    this.hide = false;
    this.row = 3;
    this.eof = false;
    this.uploadurl = null;
    this.filesize = 500;
    this.rules = [];
    this.width = null;
    this.cols = 1;
    this.height = null;
    this.saveurl = null;
    this.pwdtype = null;
    this.defaultimg = null;
}

autoField.prototype.validator = function (validator) {
    this.rules.push({ validator: validator, trigger: 'blur' });
}


autoField.prototype.require = function (message, type, trigger) {
    if (!trigger)
        trigger = 'blur';
    this.rules.push({ message: message, type: type, trigger: trigger, required: true });
    return this;
}
autoField.prototype.range = function (message, type, max, min, trigger) {
    if (!trigger)
        trigger = 'blur';
    this.rules.push({ message: message, type: type, trigger: trigger, max: max, min: min });
    return this;
}

autoField.prototype.addValue = function (value, label) {
    if (!this.data) {
        this.data = [];
    }
    this.data.push({ label: label, value: value })
};
function autoData() {
    this.data = null;
    this.items = [];
    this.labelwidth = 120;
}
autoData.prototype.addButton = function (name, label) {
    var item = new autoField();
    item.type = "button";
    item.name = name;
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addLabel = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "label";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addLink = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "link";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addDate = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "date";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addTime = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "time";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addNumber = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "number";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.addText = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "text";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addRemark = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "remark";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addSwitch = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "switch";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addSelect = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "select";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addRadio = function (name, label) {
    var item = new autoField();
    item.type = "radio";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addCheckBox = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "checkbox";
    item.label = label;
    this.items.push(item);
    return item;
};
autoData.prototype.addPassword = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "password";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.addSetPassword = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "setpassword";
    item.label = label;
    this.items.push(item);
    return item;
}

autoData.prototype.addViewPassword = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "viewpassword";
    item.label = label;
    this.items.push(item);
    return item;
}

autoData.prototype.addRate = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "rate";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.addUpload = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "upload";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.addImg = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "img";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.addUploadImg = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "uploadimg";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.addColor = function (name, label) {
    var item = new autoField();
    item.name = name;
    item.type = "color";
    item.label = label;
    this.items.push(item);
    return item;
};

autoData.prototype.bindForm = function (form) {
   
    form.setInfo(this);
    
};

autoData.prototype.bindGrid = function (grid) {
    grid.setColumns(this.items);
};


//vue
Vue.prototype.$nformat = function (value) {
    return new Intl.NumberFormat().format(value);
}
Vue.prototype.$confirmMsg = function (msg, callback) {
    this.$confirm(msg, '疑问', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => { callback(); }).catch(() => { });
};
Vue.prototype.$errorMsg = function (msg) {
    this.$message.error(msg);
};
Vue.prototype.$successMsg = function (msg) {
    this.$message({
        message: msg,
        type: 'success'
    });
};
Vue.prototype.$confirmInput = function (msg, title, callback, pattern, errormsg) {
    this.$prompt(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: pattern,
        inputErrorMessage: errormsg
    }).then((value) => {
        callback(value)
    }).catch(() => { });
}
Vue.prototype.$confirmPassword = function (msg,callback) {
    this.$prompt(msg, "密码", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType:'password'
    }).then((value) => {
            callback(value)
        }).catch(() => { });
}
/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _98877388983a49c4b669721253f0a2bf='<div :style="formStyle" :class="formClass"><el-form v-if="rows.length==1" :inline="true" :size="size" :label-width="labelwidth+\'px\'" :model="data" ref="customForm"><auto-property v-for="(item,col) in rows[0]" v-if="!item.hide" v-model="item.value" :item="item" @valuechange="valueChange" @command="onCommand"></auto-property></el-form><el-form v-else :size="size" :label-width="labelwidth+\'px\'" :model="data" ref="customForm"><el-row v-for="row in rows"><el-col v-for="(item,col) in row" v-if="!item.hide" :span="onGetWidth(col+1,row.length)"><div class="grid-content bg-purple"><auto-property v-model="item.value" :item="item" @valuechange="valueChange" @command="onCommand"></auto-property></div></el-col></el-row></el-form>';
Vue.component('auto-form',
    {
        props: ["info", "value", "size", "url", "style", "class"],
            data(){
            return {
                rows: [],
                data: { items: [] },
                labelwidth: this.info ? (this.info.labelwidth ? this.info.labelwidth : 120) : 120,
                dataUrl: this.url,
                sourceData: this.value,
                formStyle: this.style,
                formClass: this.class,
            }
        },
        model: {
            prop: 'value',
                event: 'change',
        },
        methods: {
            onGetWidth(col, count){
                var width = parseInt(23 / count);
                if (col == (count)) {
                    return 23 - (width * (count - 1))
                }
                return width;
            },
            onSave(e){
                var action = new beetlexAction(e.field.saveurl);
                action.requested = (r) => {
                };
                action.post(e.data);
            },
            onCommand(e){
                e.data = this.getData();
                var success;
                this.$refs['customForm'].validate((valid) => {
                    success = valid;
                })
                e.success = success;
                if (e.field.saveurl) {
                    this.onSave(e);
                }
                else {
                    this.$emit('command', e);
                }
            },
            setInfo(val)
            {
                if (val.labelwidth)
                    this.labelwidth = val.labelwidth;
                else
                    this.labelwidth = 120;
                this.init(val.items, val.data);
            },
            init(items, data){
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
                if (data) {
                    this.setData(data);
                }
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
                //this.$refs['customForm'].validate((valid) => {
                //    result = valid;
                //});
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
                if (!this.sourceData)
                    this.sourceData = new Object();
                var result = this.sourceData;
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
                if (info.type == 'button' || info.type == 'link') {
                    return;
                }
                if (info.type == 'checkbox' && !obj) {
                    info.value = [];
                }
                else {
                    if (obj[info.name])
                        info.value = obj[info.name];
                    else
                        info.value = null;
                }
                if (info.setValue) {
                    info.setValue(info.value);
                }
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
            this.setData(this.sourceData);
            this.loadData(this.dataUrl);
        },
        watch: {
            info(val){
                this.setInfo(val);
            },
            value(val)
            {
                this.sourceData = val;
                this.setData(val);
            },
            url(val){
                this.dataUrl = val;
                this.loadData(this.dataUrl);
            },
        },
template:_98877388983a49c4b669721253f0a2bf
});

/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _9d57ba9bc2e04db1981ebeb99b53969f='<div :style="gridStyle" :class="gridClass"><div style="height:100%"><el-table :data="gridData"style="width: 100%;"height="100%"@selection-change="selectionChange" :size="gridSize"><el-table-column v-if="gridSelection" type="selection"width="45"></el-table-column><el-table-column v-for="col in gridColumns":label="col.label?col.label:col.name":width="getWidth(col)"><template slot-scope="item"><div v-if="gridEdit && !col.readonly && item.row._editor==true"><el-input-number v-if="col.type==\'number\'" v-model="item.row[col.name]" :min="-9999999" :max="9999999" style="width: 100%;" :size="gridSize"></el-input-number><el-link v-else-if="col.type==\'link\'" type="primary" @click="onCommand(item.row,col.name)">{{item.row[col.name]?item.row[col.name]:col.value}}</el-link><el-date-picker v-else-if="col.type==\'date\'" v-model="item.row[col.name]"align="left"type="date" style="width: 100%;" :size="gridSize"></el-date-picker><el-time-picker v-else-if="col.type==\'time\'" v-model="item.row[col.name]" style="width: 100%;" :size="gridSize"></el-time-picker><el-select v-else-if="col.type==\'select\'" v-model="item.row[col.name]" style="width: 100%;" :size="gridSize"><el-option v-if="col.data && col.nulloption==true">无选择</el-option><el-option v-if="col.data" v-for="sitem in col.data" :label="sitem.label?sitem.label:sitem.value" :value="sitem.value"></el-option></el-select><el-radio-group v-else-if="col.type==\'radio\'" v-model="item.row[col.name]" :size="gridSize"><el-radio v-if="col.data" v-for="sitem in col.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-radio></el-radio-group><el-checkbox-group v-else-if="col.type==\'checkbox\'" v-model="item.row[col.name]" :size="gridSize"><el-checkbox v-if="col.data" v-for="sitem in col.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-checkbox></el-checkbox-group><el-switch v-else-if="col.type==\'switch\'" v-model="item.row[col.name]" :size="gridSize"></el-switch><el-input v-else-if="col.type==\'remark\'" v-model="item.row[col.name]" type="textarea" :row="col.row?col.row:3" :size="gridSize"></el-input><el-rate v-else-if="col.type==\'rate\'" v-model="item.row[col.name]"></el-rate><div v-else-if="col.type==\'img\'" style="display:contents"><img :style="{height:col.height?col.height:\'100%\'}" :src="item.row[col.name]?item.row[col.name]:col.value" /><auto-uploadimg :title="col.label" :size="gridSize" :url="col.uploadurl" :fileSize="col.filesize" v-model="item.row[col.name]"></auto-uploadimg></div><auto-password v-else-if="col.type==\'setpassword\'" v-model="item.row[col.name]" :type="col.pwdtype" :size="gridSize" @completed="onCommand(item.row,col.name)"></auto-password><el-button :size="gridSize" v-else-if="col.type==\'viewpassword\'" icon="el-icon-view" :title="item.row[col.name]?item.row[col.name]:\'无\'" circle></el-button><el-input v-else v-model="item.row[col.name]" :size="gridSize"></el-input></div><div v-else><el-link v-if="col.type==\'link\'" type="primary" @click="onCommand(item.row,col.name)">{{item.row[col.name]?item.row[col.name]:col.value}}</el-link><el-button :size="gridSize" v-else-if="col.type==\'viewpassword\'" icon="el-icon-view" :title="item.row[col.name]?item.row[col.name]:\'无\'" circle></el-button><img v-else-if="col.type==\'img\'" :style="{height:col.height?col.height:\'100%\'}" :src="item.row[col.name]?item.row[col.name]:col.value" /><el-rate v-else-if="col.type==\'rate\'" v-model="item.row[col.name]" disabled show-score></el-rate><el-switch v-else-if="col.type==\'switch\'" v-model="item.row[col.name]"disabled></el-switch><auto-password v-else-if="col.type==\'setpassword\'" v-model="item.row[col.name]" :type="col.pwdtype" :size="gridSize" @completed="onCommand(item.row,col.name)"></auto-password><span v-else> {{getViewValue(item.row[col.name],col.data)}}</span></div></template></el-table-column><el-table-column v-if="gridDelete||gridEdit" align="right"><template slot-scope="item"><el-button v-if="item.row._editor==true" icon="el-icon-refresh-right" :size="gridSize" circle @click="item.row._editor=false;onRefresh()"></el-button><el-button v-if="item.row._editor==false" type="primary" :size="gridSize" icon="el-icon-edit" circle @click="onEdit(item.row)"></el-button><el-button v-if="item.row._editor==true" type="success" :size="gridSize" icon="el-icon-check" circle @click="onItemChange(item.row)"></el-button><el-button v-if="gridDelete" :size="gridSize" type="danger" icon="el-icon-delete" circle @click="onItemDelete(item.row)"></el-button></template></el-table-column></el-table></div><div style="text-align:right;"><el-pagination v-if="gridPages>1" layout="prev, pager, next" @current-change="onCurrentChange":page-size="1":total="gridPages" :current-page="gridCurrentpage"></el-pagination></div>';
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
            setColumns(val){
                this.gridColumns = val ? val : [];
                this.loadColumnsUrlData();
            },
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
                this.setColumns(val);
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
,template:_9d57ba9bc2e04db1981ebeb99b53969f
});

/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _289c9469b82140c7bdaa437c0d227dee='<div><el-button v-if="!hide" type="warning" :size="size" @click="open" plain>设置</el-button><div v-if="opened==true" style="position:fixed;bottom:0px;top:0px;right:0px;left:0px;background-color:rgba(128, 128, 128, 0.78);z-index:900;"><el-card class="box-card" style="position:absolute;height:220px; width:450px;margin:auto;margin-top:20vh;margin-bottom:70vh;top:0px;bottom:0px;left:0px;right:0px;"><div slot="header" class="clearfix"><span style="font-size:11pt">设置密码</span></div><div><auto-form ref="form" v-model="model" :info="editor" :size="size" @command="onCommand"></auto-form></div><div style="text-align:right;"><el-button :size="size" @click="opened=false">取消</el-button><el-button :size="size" type="primary" @click="onConfirm">确定</el-button></div></el-card></div>';
Vue.component('auto-password',
    {
        data(){
            return {
                model: {},
                opened: false,
                editor: new autoData(),
                token: null,
            }
        },
        methods: {
            open(){
                this.model = {};
                this.opened = true;
            },
            onConfirm(){
                if (this.$refs.form.success()) {
                    this.$emit('change', this.model.password);
                    this.$emit('completed', { value: this.model.password, token: this.token });
                    this.opened = false;
                }
            },
            onCommand(e){
            },
        },
        mounted(){
            var editor = new autoData();
            var npwd = editor.addPassword("password", "新密码");
            npwd.eof = true;
            if (this.type != 'none') {
                npwd.require("请输入新密码!").range("密码长度必须6个字符以!", null, null, 6);
            }
            var cpwd = editor.addPassword("cpassword", "确认新密码");
            if (this.type != 'none') {
                cpwd.require('请输入确认密码!');
            }
            cpwd.validator((rule, value, callback) => {
                var password = this.$refs.form.getField('password');
                var cpassword = this.$refs.form.getField('cpassword');
                if (password.value != cpassword.value) {
                    if (password.value || cpassword.value) {
                        callback(new Error('确认密码不正确!'));
                        return;
                    }
                }
                callback();
            });
            if (this.type == 'high') {
                npwd.validator((rule, value, callback) => {
                    var password = this.$refs.form.getField('password');
                    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
                    if (reg.test(password.value)) {
                        callback();
                    }
                    else {
                        callback(new Error('必须包含大小写字母,数字和特殊符号,8~16位!'));
                    }
                })
            }
            this.editor = editor;
        },
        model: {
            prop: 'value',
                event: 'change',
        },
        props: ['value', 'type', 'size', 'hide'],
template:_289c9469b82140c7bdaa437c0d227dee
});

/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _896fb8348ee64d758db295f8fbf79513='<el-form-item v-if="info.readonly==true" :label="info.label?info.label:info.name"><el-input :value="model.value":disabled="true"></el-input></el-form-item><el-form-item v-else-if="info.type==\'label\'" :label="info.label?info.label:info.name"><el-tag type="info" style="background-color:#fff;color:#000;width:100%">{{model.value}}</el-tag></el-form-item><el-form-item v-else-if="info.type==\'link\'" :label="info.label?info.label:info.name"><el-link type="primary" @click="onCommand">{{model.value}}</el-link></el-form-item><el-form-item v-else-if="info.type==\'button\'"><el-button type="primary" plain @click="onCommand">{{model.value?model.value:info.label}}</el-button></el-form-item><el-form-item v-else-if="info.type==\'number\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input-number v-model="model.value" :min="-9999999" :max="9999999" style="width: 100%;" @change="updateValue"></el-input-number></el-form-item><el-form-item v-else-if="info.type==\'date\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-date-picker v-model="model.value"align="left"type="date" style="width: 100%;" @change="updateValue"></el-date-picker></el-form-item><el-form-item v-else-if="info.type==\'time\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-time-picker v-model="model.value" style="width: 100%;" @change="updateValue"></el-time-picker></el-form-item><el-form-item v-else-if="info.type==\'select\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-select v-model="model.value" style="width: 100%;" @change="updateValue"><el-option v-if="item.data && item.nulloption==true">无选择</el-option><el-option v-if="item.data" v-for="sitem in info.data" :label="sitem.label?sitem.label:sitem.value" :value="sitem.value"></el-option></el-select></el-form-item><el-form-item v-else-if="info.type==\'radio\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-radio-group v-model="model.value" @change="updateValue"><el-radio v-if="info.data" v-for="sitem in info.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-radio></el-radio-group></el-form-item><el-form-item v-else-if="info.type==\'checkbox\'" :label="info.label?info.label:info.namel" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-checkbox-group v-model="model.value" @change="updateValue"><el-checkbox v-if="info.data" v-for="sitem in info.data" :label="sitem.value">{{sitem.label?sitem.label:sitem.value}}</el-checkbox></el-checkbox-group></el-form-item><el-form-item v-else-if="info.type==\'switch\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-switch v-model="model.value" @change="updateValue"></el-switch></el-form-item><el-form-item v-else-if="info.type==\'password\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input v-model="model.value" show-password @change="updateValue"></el-input></el-form-item><el-form-item v-else-if="info.type==\'remark\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input v-model="model.value" type="textarea" @change="updateValue" :rows="info.row?info.row:3"></el-input></el-form-item><el-form-item v-else-if="info.type==\'setpassword\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><auto-password v-model="model.value" :type="info.pwdtype" size="mini" @completed="updateValue();onCommand()"></auto-password></el-form-item><el-form-item v-else-if="info.type==\'rate\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-rate v-model="model.value" @change="updateValue"></el-rate></el-form-item><el-form-item v-else-if="info.type==\'upload\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-upload class="upload-demo":action="info.uploadurl":show-file-list="false":on-success="onUploadSuccess":on-error="onUploadError":on-progress="onUploadProcess":before-upload="onBeforeChange"><el-button type="primary">点击上传</el-button><div slot="tip" class="el-upload__tip" style="display:contents;"><span v-if="!uploadFileName">(大小不超过{{info.filesize?info.filesize:500}}kb)</span><el-tag v-if="uploadFileName" size="small" effect="plain" style="margin-left:10px;">{{uploadFileName}}</el-tag><el-tag v-if="uploadError" size="small" type="danger" style="margin-left:10px;">{{uploadError}}</el-tag><i v-if="uploading==true" class="el-icon-loading"></i></div></el-upload></el-form-item><el-form-item v-else-if="info.type==\'uploadimg\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><img :src="model.value?model.value:info.defaultimg" :style="{height:info.height?info.height+\'px\':\'100%\'}" /><auto-uploadimg :title="info.label" :url="info.uploadurl" :fileSize="info.filesize" v-model="model.value" @completed="updateValue();onCommand()"></auto-uploadimg></el-form-item><el-form-item v-else-if="info.type==\'color\'" :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-color-picker v-model="model.value" @change="updateValue"></el-color-picker></el-form-item><el-form-item v-else :label="info.label?info.label:info.name" :prop="\'items.\'+info.index+\'.value\'" :rules="rules"><el-input v-model="model.value" @change="updateValue"></el-input>';
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
            onCommand(){
                this.$emit('command', { field: this.info, value: this.model.value });
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
template:_896fb8348ee64d758db295f8fbf79513
});

/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _a7dac0c1b8c644e6a04ba91f730a60ee='<div style="display:contents;"><el-button icon="el-icon-upload2" circle @click="onOpen" :size="size" style="border-style:none;"></el-button><div v-if="opened==true" style="position:fixed;top:0px;bottom:0px;left:0px;right:0px;background-color:rgba(128, 128, 128, 0.47);z-index:900"><el-card class="box-card" style="position:absolute;height:420px; width:500px;margin:auto;margin-top:20vh;margin-bottom:70vh;top:0px;bottom:0px;left:0px;right:0px;"><div slot="header" class="clearfix"><span style="font-size:11pt;">{{uploadTitle}}</span></div><div><div style="text-align:center;height:300px"><el-upload :action="uploadUrl"ref="upload":auto-upload="false":show-file-list="false":on-success="onUploadSuccess":on-error="onUploadError":on-progress="onUploadProcess":on-change="handleChange":before-upload="onBeforeChange" style=""><i class="el-icon-plus" style="height:32px;width:32px;text-align:center;line-height:32px;border: 1px dashed #d9d9d9"></i><div slot="tip" class="el-upload__tip" style="display:block;"><span style="display:block;">(大小不超过{{maxSize?maxSize:500}}kb)</span><img v-if="uploadImgUrl" :src="uploadImgUrl" style="max-height:150px;"><i v-if="uploading==true" class="el-icon-loading"></i><p v-if="uploadFileName" size="small" effect="plain" style="margin-left:10px;">{{uploadFileName}}</p><p v-if="uploadError" size="small" type="danger" style="margin-left:10px;color:#ff6a00">上传错误:{{uploadError}}</p></div></el-upload></div><div style="text-align:right;"><el-button :size="size" @click="opened=false">取消</el-button><el-button :size="size" type="primary"  @click="onConfirm">确定</el-button></div></div></el-card></div>';
Vue.component('auto-uploadimg',
    {
        data(){
            return {
                opened: false,
                model: this.value,
                uploadUrl: this.url,
                maxSize: this.fileSize,
                uploading: false,
                uploadImgUrl: null,
                uploadError: null,
                uploadFileName: null,
                uploadTitle: this.title ? this.title:'上传图片'
            }
        },
        methods: {
            onConfirm(){
                if (!this.uploadError)
                    this.$refs.upload.submit();
            },
            onOpen(){
                this.opened = true;
                this.uploading = false;
                this.uploadImgUrl = null;
                this.uploadError = null;
                this.uploadFileName = null;
            },
            handleChange(file, fileList) {
                this.uploadError = null;
                this.uploadFileName = null;
                var reader = new FileReader();
                reader.onloadend = () => {
                    this.uploadImgUrl = reader.result;
                }
                this.uploadImgUrl = reader.readAsDataURL(file.raw);
                this.uploadFileName = file.name;
                var maxSize = this.maxSize ? this.maxSize : 500;
                maxSize = maxSize * 1024;
                if (file.raw.size > maxSize) {
                    this.uploadError = '上传文件不能超过' + maxSize / 1024 + 'kb!';
                    return false;
                }
                if (file.raw.type.indexOf('image') == -1) {
                    this.uploadError = '选择的文件不是图片!';
                    return;
                }
            },
            onUploadSuccess(response, file, fileList){
                console.log(response);
                this.uploading = false;
                this.model = response;
                this.$emit('change', this.model);
                this.opened = false;
            },
            onUploadError(err, file, fileList){
                this.uploadError = err.message;
                this.uploading = false;
            },
            onBeforeChange(file){
                this.uploadError = null;
                return true;
            },
            onUploadProcess(event, file, fileList){
                this.uploading = true;
            },
        },
        watch: {
            url(val){
                this.uploadUrl = val;
            },
            fileSize(val){
                this.maxSize = val;
            },
            title(val){
                this.uploadTitle = val;
            }
        },
        model: {
            prop: 'value',
                event: 'change',
        },
        props: ['value', 'url', 'fileSize', 'size','title'],
template:_a7dac0c1b8c644e6a04ba91f730a60ee
});