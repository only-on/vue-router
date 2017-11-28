var Home=Vue.component("home",{
    template:`<div class="home"> 
                <Navs></Navs>                   
                    <img src="https://images.pexels.com/photos/7720/night-animal-dog-pet.jpg?w=940&h=650&auto=compress&cs=tinysrgb" alt="">               
              </div>`
})
var Navs=Vue.component('Navs',{
    template:`<div class="nav">
                    <router-link :to="item.url" v-for="(item,key) in navData" :key="key" exact class="acolor">{{item.title}}</router-link>
                     <router-link to="/login" v-if="!islogin">login</router-link>
       
       <span v-if="islogin" class="info" @click="show">
       {{name}}
            <div  class="logout" v-show="isshow" @click="logout">退出</div>
       </span>
               </div>`,
    data(){
        return {
            navData:[
                {title:"首页",url:'/'},
                {title:"公司简介",url:"/info"},
                {title:"文档说明",url:"/doc"}
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
})
var Info=Vue.component('info',{
    template:`<div>  
                   <Navs></Navs>                               
                 <transition mode="out-in" name="opacity">
                 <router-view></router-view>
                </transition>
               </div>`
})
var List=Vue.component('list',{
    template:`<div>
 <ul class="mui-table-view" style="padding-top: 44px">
	    <li class="mui-table-view-cell mui-media">
	       <router-link to="/info/1" tag="a">	      
	            <img class="mui-media-object mui-pull-left" src="https://images.pexels.com/photos/416204/pexels-photo-416204.jpeg?w=940&h=650&auto=compress&cs=tinysrgb/40x30
">
	            <div class="mui-media-body">
	                幸福
	                <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
	            </div>	       
            </router-link>            
	    </li>	
	     <li class="mui-table-view-cell mui-media">
	       <router-link to="/info/2" tag="a">	      
	            <img class="mui-media-object mui-pull-left" src="https://images.pexels.com/photos/160751/breeze-summer-girl-model-160751.jpeg?w=940&h=650&auto=compress&cs=tinysrgb/40x30
">
	            <div class="mui-media-body">
	                木屋
	                <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖</p>
	            </div>	       
            </router-link>            
	    </li>	 
	     <li class="mui-table-view-cell mui-media">
	       <router-link to="/info/3" tag="a">	      
	            <img class="mui-media-object mui-pull-left" src="https://images.pexels.com/photos/35839/portrait-sunset-beauty-young-women.jpg?w=940&h=650&auto=compress&cs=tinysrgb/40x30
">
	            <div class="mui-media-body">
	                CBD

	                <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
	            </div>	       
            </router-link>            
	    </li>	    
	</ul>
</div>`
})
var detail=Vue.component('detail',{
    template:`<div style="padding-top:44px;text-align: center">
                <h3>{{detailData[$route.params.id-1].title}}</h3>
                <p style="padding-top:20px">{{detailData[$route.params.id-1].con}}</p>
               </div>`,
    data(){
        return{
            detailData:[
                {title:'幸福',con:"能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？"},
                {title:'木屋',con:"想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖"},
                {title:'CBD',con:"烤炉模式的城，到黄昏，如同打翻的调色盘一般."}
            ]
        }
    }
})
var Con=Vue.component('con',{
    template:`<div> 
                <Navs></Navs>                 
                <router-view name="left" class="left"></router-view>
                <router-view name="right" class="right"></router-view>
               </div>`,
    beforeRouteEnter(to,from,next){
        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
})
var leftC=Vue.component('left',{
    template:`<div>
                <h3>介绍</h3>
                    <ul class="son">
                       <li> 
                            <router-link to="#one" class="acolor">Vue.js是什么</router-link>
                       </li>
                       <li> 
                            <router-link to="#two" class="acolor">起步</router-link>
                       </li>
                        <li> 
                            <router-link to="#three" class="acolor">声明式渲染</router-link>
                       </li>
                       <li> 
                            <router-link to="#four" class="acolor">条件与循环</router-link>
                       </li>
                    </ul>
                </div>`,
    watch:{
        $route(){
            var hash=this.$route.hash.slice(1);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({num:document.querySelector('.right').scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({num:document.querySelector('#'+hash).offsetTop-44}, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.num.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
var rightC=Vue.component('right',{
    template:`<div>
<div id="one" class="abc">
        <h2 style="margin-top: 20px">Vue.js是什么</h2>
       <p style="padding: 20px">
       Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。
    </p>
</div>
<div id="two" class="abc">
    <h2>起步</h2>
    <p style="padding: 20px">
    尝试 Vue.js 最简单的方法是使用 JSFiddle Hello World 例子。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个 .html 文件，然后通过如下方式引入 Vue：<br>
    你可以查看安装教程来了解其他安装 Vue 的选项。请注意我们不推荐新手直接使用 vue-cli，尤其是对 Node.js 构建工具不够了解的同学。
    </p>
</div>
<div id="three" class="abc">
    <h2>声明式渲染</h2>
    <p style="padding: 20px">
    Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统：<br>
    我们已经生成了我们的第一个 Vue 应用！看起来这跟单单渲染一个字符串模板非常类似，但是 Vue 在背后做了大量工作。现在数据和 DOM 已经被绑定在一起，所有的元素都是响应式的。我们该如何知道呢？打开你的浏览器的控制台 (就在这个页面打开)，并修改 app.message，你将看到上例相应地更新。
    </p>
</div>
<div id="four" class="abc">
    <h2>条件与循环</h2>
    <p style="padding: 20px">
   继续在控制台设置 app3.seen = false，你会发现“现在你看到我了”消失了。<br>
这个例子演示了我们不仅可以绑定 DOM 文本到数据，也可以绑定 DOM 结构到数据。而且，Vue 也提供一个强大的过渡效果系统，可以在 Vue 插入/更新/删除元素时自动应用过渡效果。
还有其它很多指令，每个都有特殊的功能。例如，v-for 指令可以绑定数组的数据来渲染一个项目列表：
    </p>
</div>
                </div>`
})
var Login=Vue.component('login',{
    template:`<div style="width:100%;position: absolute;left:0;top:0">
             <header class="mui-bar mui-bar-nav">
                 <a class="mui-icon mui-icon-undo" @click="back"></a>
                <h1 class="mui-title">登录</h1>
            </header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div>
    </div>`,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/doc")
        }
    }
})