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
虽然用`json`来描述界面会比`html`描述会方便一些，但总体上来说工作量还是有些大的，在调整界面的时候也不方便。接下介绍一下如何结合`BeetleX.FastHttpApi`来进一步简化这些繁琐的操作。
## Webapi动态输出
其实在构建`vue-autoui`的时候更多是考虑和`BeetleX.FastHttpApi`进行一个整合，通过和后端融合可以把这些UI编写的工作量大大节省下来，让开发这些功能变得更简单方便，`更重要的是api变化后界面就自动适应`。使用要求：在和`BeetleX.FastHttpApi`整合还需要引用`BeetleX.FastHttpApi.ApiDoc`插件，因为这个插件用于给接口输出对应UI的`JSON`信息。接下来通过几个示例来介绍整合的方便性：
### 登陆
登陆功能是比较常见的，接下来看一下使用`auto-form`如何结合`webapi`来完成这个功能。
``` html
<div>
    <auto-form ref="login" url="/login" v-model="login.data" size="mini">

    </auto-form>
    <el-button size="mini" @click="if($refs.login.success())login.post()">
        登陆
    </el-button>
</div>
```
以上是一个登陆功能UI的定义，是不是很简单呢？通过指定`url`的webapi连接即可以自动适全UI;这时候只需要针对登陆接口进行一个定义即可:
``` chsarp
        [Input(Label = "用户名", Name = "name", Eof = true)]
        [Required("用户名不能为空", Name = "name")]
        [Input(Label = "密码", Name = "pwd", Type = "password", Eof = true)]
        [Required("用户密码不能为空", Name = "pwd")]
        [Input(Label = "保存状态", Value = true, Name = "saveStatus")]
        public bool Login(string name, string pwd, bool saveStatus)
        {
            Console.WriteLine($"name:{name} pwd:{pwd} saveStatus:{saveStatus}");
            return name == "admin";
        }
```
![image](https://user-images.githubusercontent.com/2564178/77049214-a2adcf00-6a02-11ea-9072-71bd51b18d7a.png)

## 注册
接下来定义一个信息多些的注册界面
``` html
<div>
    <auto-form ref="login" url="/register" v-model="register.data" size="mini" @completed="onCompleted">

    </auto-form>
    <el-button size="mini" @click="if($refs.login.success())register.post()">
        注册
    </el-button>
</div>
```
在UI定义上基于没什么变化，只是调整一下对应的`url`地址，在这里多了一下`completed`事件，这个事件主要是通过接口加载UI信息才会触发的。对应功能的`javascript`代码
``` javascript
        data(){
            return {
                register: new beetlexAction('/register', {}),
                checkConfirmPassword: (rule, value, callback) => {
                    var password = this.$refs.login.getField('Password');
                    var cpassword = this.$refs.login.getField('ConfirmPassword');
                    if (password.value != cpassword.value)
                        callback(new Error('确认密码不正确!'));
                    else
                        callback();
                },
            }
        },
        methods: {
            onCompleted(){
                this.$refs.login.getField('ConfirmPassword').rules.push({ validator: this.checkConfirmPassword, trigger: 'blur' });
            },
        },
        mounted() {

            this.register.requested = (r) => {
                alert(JSON.stringify(r));
            };
        }
```
代码主要是定密码和确认密码的对比验证，接下来看一下后台注册对应的接口
``` csharp
    [Post]
    public RegisterDto Register(RegisterDto register)
    {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(register));
            return register;
    }
    public class RegisterDto
    {
        [Input(Label = "用户名", Eof = true)]
        [Required("用户名不能为空")]
        [DataRange("用户名的必须大于3个字符", Min = 3)]
        public string Name { get; set; }

        [Input(Label = "邮箱地址", Eof = true)]
        [Required("邮件地址无效", Type = "email")]
        public string Email { get; set; }

        [Input(Label = "密码", Eof = true, Type = "password")]
        [Required("输入密码")]
        public string Password { get; set; }

        [Input(Label = "确认密码", Eof = true, Type = "password")]
        [Required("输入确认密码")]
        public string ConfirmPassword { get; set; }

        [GenderInput(Label = "性别", Value = "男", Eof = true)]
        public string Gender { get; set; }

        [Required("选择所在城市")]
        [CityInput(Label = "城市", Eof = true)]
        public string City { get; set; }

        [HobbyInput(Label = "爱好")]
        [Required("选择爱好", Type = "array", Trigger = "change")]
        public string[] Hobby { get; set; }
    }
```
服务代码也没太多的变化，只是通过一些标签来标记一下相关属性的数据源和输入要求.具体运行效果如下:
![image](https://user-images.githubusercontent.com/2564178/77050037-156b7a00-6a04-11ea-8fda-ea9681ecc7a1.png)

## 数据列表
有应用中除了数据输出外更多的数据列表，`auto-grid`即是专门用于处理列表的一个控件，这个控件提供分页，选择，编辑和删除的功能；接下来做一个简单的雇员列表示例:
``` html
<auto-grid url="/employees" @completed="employees.get()"
           @itemchange="onItemChange" 
           @itemdelete="onItemDelete"
           @command="onCommand"
           :data="employees.result" 
           size="mini" height="100%" 
           edit="true" delete="true">
</auto-grid>
```
这个列表提供编辑和删除功能，相关脚代码如下:
``` javascript
        data(){
            return {
                employees: new beetlexAction('/employees', {}, [])
            }
        },
        methods: {
            onCommand(e){
                this.$open('models-employee', e.data);
            },
            onItemChange(item){
                if (confirm('是否要修改' + item.data.FirstName + '?')) {
                    item.success();
                }
            },
            onItemDelete(item){
                if (confirm('是否要删除' + item.data.FirstName + '?')) {
                    item.success();
                }
            },
        },
        mounted() {

        }
```
接下来的工作就是在服务端定义`api`来输出结果
``` csharp
        [Column("FirstName", Type = "link")]
        [Column("LastName", Read = true)]
        [Column("Title")]
        [Column("HomePhone")]
        [Column("City")]
        [Column("Address")]
        public object Employees()
        {
            return DataHelper.Defalut.Employees;
        }
```
![image](https://user-images.githubusercontent.com/2564178/77050615-fcaf9400-6a04-11ea-9bf5-f06bb58c279c.png)

## 动态查询
实际应用中需要提供查询条件输入，这个时候就可以把`auto-form`和`auto-grid`整合起来，以下通过一个简单的订单查询来展示这两个控件给合使用
``` html
    <auto-form url="/orders" v-model="orders.data" @completed="orders.get()" size="mini" @fieldchange="orders.get()">

    </auto-form>
    <auto-grid url="/orders" height="300" :data="orders.result.items" :pages="orders.result.pages" :currentpage="orders.result.index" @pagechange="onPageChange" size="mini">

    </auto-grid>
```
可以在`auto-form`的`fieldchange`事件中自动执行查询,对应的脚本代码如下:
``` javascript
        data(){
            return {
                orders: new beetlexAction("/orders", {}, { index: 0, pages: 0, items: [] })
            };
        },
        methods: {
            onPageChange(page){
                this.orders.data.index = page;
                this.orders.get();
            },
        },
        mounted(){

        }
```
接下来需要实现服务端代码，由于方法需要描述输入和列表所以对应的标签比较多
``` csharp
        [Input(Name = "id", Type = "select", DataUrl = "/EmployeeSelecter", Label = "雇员",NullOption =true)]
        [Input(Name = "customerid", Type = "select", DataUrl = "/CustomerSelecter", Label = "客户",NullOption =true,  Eof = true)]
        [SizeInput(Name = "size", Label = "分页记录数")]
        [Input(Name = "index", Hide = true)]

        [Column("OrderID", Read = true)]
        [Column("EmployeeID", Type = "select", DataUrl = "/EmployeeSelecter")]
        [Column("CustomerID", Type = "select", DataUrl = "/CustomerSelecter")]
        [Column("OrderDate", Type = "date")]
        [Column("RequiredDate", Type = "date")]
        [Column("ShippedDate", Type = "date")]
        public object Orders(int id, string customerid, int index, int size, IHttpContext context)
        {
            Func<Order, bool> exp = o => (id == 0 || o.EmployeeID == id)
             && (string.IsNullOrEmpty(customerid) || o.CustomerID == customerid);
            int count = DataHelper.Defalut.Orders.Count(exp);
            if (size == 0)
                size = 20;
            int pages = count / size;
            if (count % size > 0)
                pages++;
            var items = DataHelper.Defalut.Orders.Where(exp).Skip(index * size).Take(size);
            return new { pages, index, items };

        }
```
![image](https://user-images.githubusercontent.com/2564178/77051438-3df47380-6a06-11ea-9660-4009485df9dd.png)

