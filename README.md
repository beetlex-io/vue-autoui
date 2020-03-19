# vue-autoui
vue-autoui 是一款基于`vue`和`element`扩展的一个自动化UI控件，它主要提供两个控件封装分别是`auto-form`和`auto-grid`;
通过这两个控件可以完成大多数的信息输入和查询输出的需要.`auto-form`和`auto-grid`是通过`json`来描述展示的结构，在处理上要比写`html`标签来得方便简单，
但这控件的最大优势并不是在这里，它最重要的功能是可以结合`webapi`的信息来自动输出界面，只需要调整`webapi`的信息结构即可完成UI的调整。
## 基础使用
控件可以直接在vuejs功能中使用，但需要结合`json`来设置具体UI展示，以下是一个简单的例子
``` html
    <auto-form ref="form" v-model="data" size="mini" :info="info">

    </auto-form>
    <el-button @click="if($refs.form.success()){alert(JSON.stringify(data))}">确定</el-button>
```
功能很简单就是显示当前输入并验证通过的数据，下面用json描述信息输入源。
``` csharp
        data(){         
            return {
                info: { items: [] },
                data: { },
            };
        },
        mounted(){
            var items = [];
            items.push({
                name: 'active', label: '活动名称', rules: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            });
            items.push({
                name: 'region', label: '活动区域', type: 'select',
                data: [{ value: '广州' }, { value: '深圳' }, { value: '上海' }, { value: '北京' }],
                rules: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
                eof: true
            });
            items.push({ name: 'starttime', label: '开启时间', type: 'date', rules: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }] });
            items.push({ name: 'endtime', label: '-', type: 'date', eof: true, rules: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }] });
            items.push({ name: 'instant', type: 'switch', label: '即时配送', eof: true });
            items.push({
                name: 'nature', type: 'checkbox', label: '活动性质',
                rules: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
                data: [{ value: '美食/餐厅线上活动' }, { value: '地推活动' }, { value: '线下主题活动' }, { value: '单纯品牌暴光' }], eof: true
            });
            items.push({
                name: 'resource', label: '特殊资源', type: 'radio', rules: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                data: [{ value: '线上品牌商赞助' }, { value: '线下场地免费' }], eof: true
            });
            items.push({ name: 'remark', label: '活动形式', type: 'remark', rules: [{ required: true, message: '请填写活动形式', trigger: 'blur' }] })
            this.info = { items: items}
        }
```
以上是使用`json`来描述一个输出的界面，具体效果如下:
![image](https://user-images.githubusercontent.com/2564178/77047737-3b8f1b00-6a00-11ea-81e9-443e43347045.png)
