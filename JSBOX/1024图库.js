/*
2019年5月28日 更新
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://ae85.cn/
*/
/*
2020年6月23日 优化

0. 修复某些板块无法显示的bug
1. 采用网页视图
2. 优化图片宽度
3. 增加导航按钮，方便查看上下页面
4. 优化代码

本脚本基于小良的脚本二次开发
by suertang https://github.com/suertang
*/
$cache.set("id", "15");
$cache.set("pg", 1);
var urlt = "请自行填入地址";
var data = [
  { "name": "SelfShot", "id": "15" },
  { "name": "RealMe", "id": "14" },
  { "name": "Out", "id": "16" },
  { "name": "Street", "id": "49" },
  { "name": "Sock", "id": "21" },
  { "name": "West", "id": "114" }
];
function myGetName(myid) {
  for (let comb of data) {
    const { name, id } = comb;
    if (myid == id) {
      return name;
    }
  }
  return null;
}
//console.info(myGetName("15"))
$ui.render({
  props: {
    title: "7086图库"
  },
  views: [
    {
      type: "menu",
      props: {
        id: "meun",
        items: data.map(function(item) {
          return item.name;
        })
      },
      layout: function(make) {
        make.left.top.right.equalTo(0);
        make.height.equalTo(50);
      },
      events: {
        changed: function(sender) {
          $cache.set("id", data[sender.index].id);
          $cache.set("pg", 1);
          getdata();
        }
      }
    },
    {
      type: "list",
      layout: function(make) {
        make.right.left.bottom.inset(0);
        make.top.equalTo($("meun").bottom);
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          var id = data.split("\n");
          geting(id[1], id[0], indexPath);
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore();
          var page = $cache.get("pg") + 1;
          $cache.set("pg", page);
          getdata();
        }
      }
    }
  ]
});

function getdata() {
  var id = $cache.get("id");
  var pg = $cache.get("pg");
  $ui.loading(true);
  $http.get({
    url: urlt + "pw/thread.php?fid=" + id + "&page=" + pg,
    handler: function(resp) {
      $ui.loading(false);
      var text = resp.data.replace(/\n|\s|\r/g, "");
      if (text.indexOf("普通主题") !== -1) {
        text = text.split("普通主题")[1];
      }
      var shu = text.match(/class="tr3t_one">(\S*?)<\/h3>/g);
      let data = [];
      if (pg !== 1) {
        data = $("list").data;
      }
      for (let i in shu) {
        var a = shu[i];
        if (a.indexOf("href=") !== -1) {
          var txt = a.split("<h3>")[1];
          var mc = txt.match(/">(\S*?)<\/a>/)[1];
          var id = a.match(/href="(\S*?)"/)[1];
          data.push(mc + "\n" + id);
        }
      }
      $("list").data = data;
      $("list").endFetchingMore();
    }
  });
}

getdata();
String.prototype.getMatchGroup = function(reg, group) {
  let matches = this.match(reg);
  if (matches != null) {
    return matches.map(i => {
      return i.replace(reg, "$" + group);
    });
  }
  return null;
};
function loadPage(url, title) {
  $http.get({
    url: urlt + "pw/" + url,
    handler: function(resp) {
      $ui.loading(false);
      var text = resp.data.replace(/\n|\s|\r/g, "");
      var ingz = "";
      text.getMatchGroup(/(<br><br>)?<imgsrc="(http\S*?)"/g, 2).forEach(i => {
        ingz += `<img src="${i}">`;
      });

      console.info(ingz);
      const style = `
            <style>
            body{
              box-sizing:border-box
            }
              img{
                width:100%;
                height:auto;
                margin-bottom:1rem;
                border-radius:0.5rem;
              }
              .nomore,.title{
                display:flex;
                justify-content:center;
                align-items:center;
                height:16vh;
              }
              .title{
                height:auto;
                
                
              }
            </style>
            `;
      const scrollJs = `
            //文档高度
            function getDocumentTop() {
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if (document.body) {
                    bodyScrollTop = document.body.scrollTop;
                }
                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            }
            
            //可视窗口高度
            function getWindowHeight() {
                var windowHeight = 0;
                if (document.compatMode == "CSS1Compat") {
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    windowHeight = document.body.clientHeight;
                }
                return windowHeight;
            }
            
            //滚动条滚动高度
            function getScrollHeight() {
                var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                if (document.body) {
                    bodyScrollHeight = document.body.scrollHeight;
                }
            
                if (document.documentElement) {
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                return scrollHeight;
            }
            
            
            /*
            当滚动条滑动，触发事件，判断是否到达最底部
            然后调用ajax处理函数异步加载数据
            */
           
            window.onscroll = function () {
                //监听事件内容
                if (getScrollHeight() == (getWindowHeight() + getDocumentTop() )) {
                    //当滚动条到底时,这里是触发内容
                    //异步请求数据,局部刷新dom
                    //alert("Hello"); 
                }
            }
            `;
      const html = `
            <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
            <meta charset="UTF-8">
            <title>${title}</title>
            ${style}
            <script defer>${scrollJs}</script>
            </head>
            <body>
            <div class="title">${title}</div>
                ${ingz}
            <div class="nomore" id="nomore">到底了</div>
            </body>
            </html>
           `;
      $("web1").html = html;
      $("myweb").title = title;
    }
  });
}
function geting(id, mc, index) {
  $ui.loading(true);
  $ui.push({
    props: {
      id: "myweb",
      title: "板块名称:"+myGetName($cache.get("id"))
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
    const [title, url] = data.split("\n");
    //var id=data.split("\n")
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
    const [title, url] = data.split("\n");
    //var id=data.split("\n")
    $cache.set("index", idx);
    loadPage(url, title);
  }
}
