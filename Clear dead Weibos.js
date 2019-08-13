//批量清空已经失效的微博
//作者：suertang 日期：2019年8月13号
//版本：1
//如果脚本失效，请耐心等待或者issue，谢谢
/* 
1. 打开微博主页登录，找到自己的微博页面
2. 打开浏览器console(F12)
4. 粘贴代码并回车
*/
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var WBCONT = 2
for(let i =1;i<400;i++){
setTimeout(() => {
	
	const contentdiv = document.querySelector("#Pl_Official_MyProfileFeed__20 > div > div:nth-child(" + WBCONT + ") > div.WB_feed_detail.clearfix > div.WB_detail")
	if(contentdiv.textContent.indexOf('删除') == -1){
		WBCONT++;
	}
	else{
		document.querySelector("#Pl_Official_MyProfileFeed__20 > div > div:nth-child("+ WBCONT +") > div.WB_feed_detail.clearfix > div.WB_screen.W_fr > div > div.layer_menu_list > ul > li:nth-child(1) > a").click()
		
		if(i % 20 ==0){
			let nextpage = document.querySelector("#Pl_Official_MyProfileFeed__20 > div > div:nth-child(47) > div > a.page.next.S_txt1.S_line1")
			if(nextpage){
				nextpage.click()
			}
		}
		sleep(800).then(() => {document.querySelector("p.btn > a.W_btn_a > span").click()})
	}
	},1500*i)
}

/*
吐槽微博
不知道怎么关注了很多垃圾微博账号，取消确实让人头疼。脚本取消又被认为操作过分频繁，这微博还颇有垃圾公司的风范。注销又嫌麻烦，还是删除吧。
*/
