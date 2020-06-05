


//@Author	suertang
//@Match	zhidao.baidu.com
//@Date		6/5/2020
//@Apply	Alook iOS
//@Runat	DOMContentLoaded

//因为隐藏发生在页面载入之后，所以必须等隐藏结束后再调用此脚本，手动延时800ms
setTimeout(()=>{
//显示全部
const div = document.querySelector(".w-detail-container.w-detail-index");
div.style.maxHeight="";
div.style.overflow="";
//去除还剩多少的按钮
document.querySelector(".w-detail-display-btn").style.display="none";
},800);