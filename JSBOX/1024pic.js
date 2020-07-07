/*
2020/06/24
1.优化了页面显示
2.增加了前后导航按钮

by https://github.com/suertang

*/
$cache.set("id", "16")
$cache.set("pg", 1)
var urlt = "请自行获取地址"

var data = [{ "name": "盖区", "id": "16" }, 
            { "name": "新区", "id": "8" }, ]
/// helper functions
function myGetName(myid) {
    for (let comb of data) {
        const { name, id } = comb;
        if (myid == id) {
        return name;
        }
    }
    return null;
    }
String.prototype.getMatchGroup = function(reg, group) {
    let matches = this.match(reg);
    if (matches != null) {
        return matches.map(i => {
        return i.replace(reg, "$" + group);
        });
    }
    return null;
};
///end of helper functions

function loadPage(url, title) {
    $http.get({
        url: urlt + url,
        header: {'User-Agent': "mozilla/5.0 (iphone; cpu iphone os 11_0 like mac os x) applewebkit/604.1.38 (khtml, like gecko) version/11.0 mobile/15a372 safari/604.1"},
        handler: function(resp) {
        $ui.loading(false);
        // 获取图片真实地址的属性名称
        let attr = ""
        try{
            attr = resp.data.match(/img\[(.*?)\]/)[1]
        }catch(e){
            console.info(resp.data)
            console.info(url)
            $ui.toast("没有获取图片属性")
            return
        }
        // 获取图片地址的正则表达式         
        const imgReg = new RegExp(attr+"='(.*?)'","g")

        var text = resp.data.replace(/\n|\s|\r/g, "");
        var ingz = "";
        text.getMatchGroup(imgReg, 1).forEach(i => {
            ingz += `<img src="${i}">`;
        });
    
        //console.info(ingz);
        const style = `
                <style>
                body{
                  box-sizing:border-box;
                  margin:0px
                }
                img{
                    width:100%;
                    height:auto;
                    margin-bottom:1rem;
                    border-radius:0.5rem;
                }
                .nomore{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:16vh;
                }
                .head{
                    display:block;                    
                    width:100vw;
                    position:fixed;
                    top:0px;
                    background:lightblue;                 
                    opacity:0.75;
                    margin-top:0px;
                    padding:0px;
                }
                .container{
                    margin-top:5rem;
                    min-height:100vh;
                }
                </style>
                `;
        
        const html = `
                <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
                <meta charset="UTF-8">
                <title>${title}</title>
                ${style}
                
                </head>
                <body>
                <div class="head">${title}</div>
                <div class="container">
                    ${ingz}
                </div>
                <div class="nomore" id="nomore">到底了</div>
                </body>
                </html>
                `;
        $("web1").html = html;
        
        }
    });
}
$ui.render({
    props: {
        title: "1024BT图片"
    },
    views: [{
        type: "menu",
        props: {
            id: "meun",
            items: data.map(function (item) {
                return item.name
            }),
        },
        layout: function (make,view) {
            make.left.top.right.equalTo(0)
            make.height.equalTo(50)
            make.width.equalTo(view.width)
        },
        events: {
            changed: function (sender) {
                $cache.set("id", data[sender.index].id)
                $cache.set("pg", 1)
                getdata()
            }
        }
    },
    {
        type: "list",
        layout: function(make,view){make.top.equalTo($("meun").bottom)
        make.left.right.inset(10)
        make.height.equalTo(view.super.height)
        },
        props:{
          rowHeight:80,
          template:[{
            type:"label",            
              props:{
                id:"label",
                font:$font(14),
                lines:0
              },
              layout:(make,view)=>{
                make.left.right.inset(10)
                make.width.equalTo(view.width)
                make.top.bottom.equalTo(0)

                  //make.right.inset(10)
                }
            }
          ]},
        events: {
            didSelect: function (sender, indexPath, data) {
                // 对象解构
                let {label:{text:title},url}=data
                
                geting(url, title, indexPath)
            },
            didReachBottom: function (sender) {
                sender.endFetchingMore()
                var page = $cache.get("pg") + 1
                $cache.set("pg", page)
                getdata()
            }
        }

    },]
})

function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + "thread0806.php?fid=" + id + "&page=" + pg+"",
        header: {
                    'User-Agent': "mozilla/5.0 (iphone; cpu iphone os 11_0 like mac os x) applewebkit/604.1.38 (khtml, like gecko) version/11.0 mobile/15a372 safari/604.1"},
        handler: function (resp) {
            $ui.loading(false)
            
            let data = pg==1?[]:$("list").data

            /**************
            var text = resp.data.replace(/\n|\s|\r/g, "")
            if(text.indexOf("普通主題") !== -1) {
                const para = text.split("普通主題")
                text = para[para.length-1]
            }
            const reg = /(htm_data.*?)".*id="">(<.*?>)?(.*?)(<\/font>)?<\/a>+?/g
            let match=reg.exec(resp.data)
            while(match)
            {
              data.push({label:{text:match[3]},url:match[1]})
              match=reg.exec(resp.data)
            }
            *********/
           let posts = resp.data.replace(/\n|\r/g,"").match(/<td class="tal"(.*?)<\/h3>/g)

            //标题正则
            //"<td class="tal" style="padding-left:8px" id=""> 		↑3		<h3><a href="read.php?tid=5877" target="_blank" id=""><b><font color="red">草榴官方客戶端 &amp; 大陸入口 &amp; 永久域名 ** 必須加入收藏夾 9.13更新</font></b></a></h3>"
            const texts = posts.filter((i)=>{return !/↑/.test(i) && !/read.php/.test(i) })

            texts.forEach(text=>{
                const title = text.replace(/<.*?>/g,"").replace(/\s/g,"")
                const url = text.match(/href="(.*?)"/)[1]
                data.push({label:{text:title},url:url})
            })
            $("list").data = data
            $("list").endFetchingMore()
        }
    })
}

getdata()

function geting(id, mc, index) {
    $ui.loading(true);
    $ui.push({
      props: {
        id: "myweb",
        title: myGetName($cache.get("id"))
      },
      views: [
        {
          type: "web",
          props: {
            html: "<h1>加载中...</h1>",
            id: "web1"
          },
          layout: function(make, view) {
            make.bottom.equalTo(view.bottom); //.offset(50)
            make.height.equalTo(view.super.height).offset(-50);
            make.left.right.equalTo(0);
            //make.width.equalTo(view.super.width)
            //make.top.equalTo(view.top)
            //make.size.equalTo($size(200,50))
          },
          events: {
            didReachBottom: function(sender) {
              alert("滑到底了！！！");
            }
          }
        },
        {
          type: "button",
          events: {
            tapped: function() {
              getprev();
            }
          },
          props: {
            title: "上一篇"
          },
          layout: function(make, view) {
            make.bottom.equalTo(view.super.bottom);
            make.size.equalTo($size(200, 50));
          }
        },
        {
          type: "button",
          events: {
            tapped: function() {
              //alert(index.next())
              getnext();
              //console.log(data)
            }
          },
          props: {
            title: "下一篇"
          },
          layout: function(make, view) {
            make.bottom.equalTo(view.super.bottom);
            make.right.equalTo(view.super.right);
            make.size.equalTo($size(200, 50));
          }
        }
      ]
    });
    $cache.set("index", index);
    loadPage(id, mc);
  }
  function getnext() {
    const currentindex = $cache.get("index");
    const maxIndex = $("list").data.length;
    let row = currentindex.row;
    if (row == maxIndex - 2) {
      alert("最后一个了");
      return;
    } else {
      //$ui.pop()
      const idx = $indexPath(row + 1, row + 1);
      const data = $("list").object(idx);
      let {label:{text:title},url}=data
      $cache.set("index", idx);
      loadPage(url, title);
    }
  }
  function getprev() {
    //const maxIndex = $("list").data.length
    const currentindex = $cache.get("index");
    let row = currentindex.row;
    if (row == 0) {
      alert("已经是第一个");
      return;
    } else {
      const idx = $indexPath(row - 1, row - 1);
      const data = $("list").object(idx);
      let {label:{text:title},url}=data
      //var id=data.split("\n")
      $cache.set("index", idx);
      loadPage(url, title);
    }
  }
  