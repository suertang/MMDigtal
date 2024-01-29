/*
2022年 suertang

本脚本基于小良的脚本二次开发,脚本仅供代码学习
by suertang https://github.com/suertang
*/
$cache.set("id", "toupai");
$cache.set("pg", 1);

var urlt = "https://4hu.tv/"//$text.base64Decode('aHR0cHM6Ly93d3cuODNzcy5uZXQv');
var data = [
  { "name": "自拍", "id": "toupai" },
  { "name": "美腿", "id": "meitui" },
  { "name": "欧美", "id": "oumei" },
  { "name": "卡通", "id": "katong" }
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
    title: "4Hu图库"
  },
  views: [
    {
      type: "menu",
      props: {
        id: "menu",
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
      type: "matrix",
      props: {
        id: "mat",
        itemHeight: 180,
        columns: 2,
        spacing: 7,
        template: [
          {
            type: "image",
            props: {
              id: "img",
              radius: 3
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.height.equalTo(90);
              make.width.equalTo(180);
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              align: $align.center,
              lines: 0,
              font: $font("bold", 15)
            },
            layout: function(make, view) {
              make.top.equalTo($("img").bottom).offset(10);
              make.right.left.inset(0);
            }
          }
        ]
      },
      layout: function(make) {
        make.top.equalTo($("menu").bottom);
        make.bottom.left.right.inset(0);
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          let {
            label: { text: title },
            url
          } = data;

          geting(url, title, indexPath);
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
  let cacheurl = $cache.get("urlt")
  let url = cacheurl ? cacheurl : urlt
  
  $ui.toast(url)
  url = url + "pic/"
  var id = $cache.get("id");
  var pg = $cache.get("pg");
  let suffix = pg == 1 ? "" : "index_" + pg + ".html";
  $ui.loading(true);
  $http.get({
    url: url + id + "/" + suffix,
    timeout: 5,
    handler: function(resp) {
      $ui.loading(false);
      if (resp.error) {
        // console.log("no response");
        $ui.alert("网站没有响应");
        return;
      } else {
        // console.log(resp);
        //$cache.set("urlt", url);
      }
      if (
        resp.response.statusCode != 200 ||
        !resp.response.url.startsWith(url)
      ) {
        $ui.toast("地址跳转到" + resp.response.url.match(/(https?:\/\/.*?\/)/)[1]);
        $cache.set("urlt", resp.response.url.match(/(https?:\/\/.*?\/)/)[1]);
        
        
        getdata();
        
        return;
      }
      
      let data = resp.data.replace(/>(\s+)</g,"><");
      console.log(data)
      /* 			<dl>
 	<dt><a href="/view/202401/79306.html" target="_blank"><img class="nature" src="/images/loading.svg" data-original="https://img.997pp.com/Tu/202312/xjdljkplgsm.jpg"/><i></i></a></dt>
 	<dd><a href="/view/202401/79306.html" target="_blank"><h3><script type="text/javascript">document.write(d('5paw5aWz5Y+L6KaB5rGC5LiN5oi05aWX5pON5aW55oOz57uR5L2P5oiRWzEwUF0='));</script></h3>
 </a></dd>
 </dl>
 */
      const res = data.match(/<dl>.*?original.*?document\.write.*?<\/dl>/g).map(i => {
        console.log(i)
        const ret = {
          img: {
            src: i.match(/original="(.*?)"/)[1]
          },
          label: {
            text:
            $text.base64Decode(i.match(/d\('(.*?)'/)[1])
          },
          url: i.match(/href="\/(.*?\.html)/)[1]
        };
        // console.log(ret);
        return ret;
      });

      if (pg == 1) $("mat").data = [];
      if ($("mat").data) {
        $("mat").data = [...$("mat").data, ...res];
      } else {
        $("mat").data = res;
      }
      $("mat").endFetchingMore();
    }
  });
}

getdata();

function loadPage(url, title) {
  // let cacheurl = $cache.get("urlt")
  
  // let urlt = cacheurl?cacheurl:urlt
  
  $cache.set("title",title)
  $http.get({
    url: urlt + url,
    handler: function(resp) {
      if(resp.error){
        $ui.alert("发生错误或超时")
        $ui.toast(resp.error)
        return
      }
      $ui.loading(false);
      var text = resp.data.replace(/\n|\s|\r/g, "");
      // console.log(text);
      if (!text) {
        $ui.toast("🈚️内容");
        return;
      }
      var ingz = "";
      
      text.match(/imgsrc='(.*?)'/g).forEach(i=>{
        const it = i.match(/'(.*)'/)[1]
        ingz += `<img class="lazyload" src="https://fakeimg.pl/200x200/" data-src="${it}" data-sizes="auto">\n`;
      });

      // console.info(ingz);
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

      const html = `
            <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
            <meta charset="UTF-8">
            <title>${title}</title>
            ${style}
            ${prefetch()}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"></script>
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
      title: "板块名称:" + myGetName($cache.get("id"))
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
         didFinish:(s,n)=>{
           //console.log($("myweb").title)
           $ui.get("myweb").title=$cache.get("title")
         },
          didReachBottom: function(sender) {
            $ui.alert("滑到底了！！！");
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
function prefetch() {
  const currentindex = $cache.get("index");
  const maxIndex = $("mat").data.length;
  let row = currentindex.row;
  if (row == maxIndex - 2) {
    //      alert("最后一个了");
    return "";
  } else {
    //$ui.pop()
    const idx = $indexPath(row + 1, row + 1);
    const data = $("mat").object(idx);
    //const [title, url] = data.split("\n");
    let {
      url,
      label: { text: title }
    } = data;

    //geting(url, title, indexPath)
    console.log("Prefetching " + title);
    return `<link rel="prefetch" href="${url}">`;
    //var id=data.split("\n")
  }
}
function getnext() {
  const currentindex = $cache.get("index");
  const maxIndex = $("mat").data.length;
  let row = currentindex.row;
  if (row == maxIndex - 2) {
    $ui.alert("最后一个了");
    return;
  } else {
    //$ui.pop()
    const idx = $indexPath(row + 1, row + 1);
    const data = $("mat").object(idx);
    //const [title, url] = data.split("\n");
    //var id=data.split("\n")
    let {
      label: { text: title },
      url
    } = data;
    $cache.set("index", idx);
    loadPage(url, title);
  }
}
function getprev() {
  //const maxIndex = $("list").data.length
  const currentindex = $cache.get("index");
  let row = currentindex.row;
  if (row == 0) {
    $ui.alert("已经是第一个");
    return;
  } else {
    const idx = $indexPath(row - 1, row - 1);
    const data = $("mat").object(idx);
    //const [title, url] = data.split("\n");
    let {
      label: { text: title },
      url
    } = data;
    //var id=data.split("\n")
    $cache.set("index", idx);
    loadPage(url, title);
  }
}