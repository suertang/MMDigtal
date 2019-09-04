/*
作者 suertang
日期 2019/09/04 晚22 点
版本 0.6
ISSUE 修复不能播放的问题
*/

var me = [
  { name: "推荐资源", id: "/recom/1.html?recom=1" },
  { name: "人气热门", id: "/hot/1.html?hot=1" },
  { name: "最新", id: "/new/1.html" }
  //
]; 
var retryCount = 0;
var turl = 'https://www.' + $text.base64Decode("amFwb254Lm1l");
//console.log(turl);

function getweburl(id,img){
  console.log("https://www."+ $text.base64Decode("amFwb254Lm1l") + "/portal/index/ekzloi.html?identification=" + id);
  $ui.push({
    views:[{
      type: "web",
      props: {
          id:'myweb',
          ua:'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Version/12.0 Safari/604.1',
          url:turl + "/portal/index/detail/identification/" + id + ".html",
          script: function(){
            

            const id=window.location.href.match(/identification\/(.*)\.html/)[1];
            //alert(id);
            $.get(
              'https://www.'+atob("amFwb254Lm1l")+'/portal/index/ekzloi.html',{'identification':id},
              function(res){
                //alert(res);          
                $notify("bypassed",res);                
                },'text'
              );
              
          }
      },
      layout: $layout.fill,
      /*layout: function(make,view) {
          
          //make.size.equalTo($size())
          //make.bottom.left.right.inset(0);
        },*/
      events: {
          bypassed: function (obj){
                  //renderItems(obj)
                  //$('list').data=obj;
                  $('myweb').stopLoading()
                  $('myweb').remove()
                  
                  var fg1 = obj.split("p}('")[1];
                  var fg2 = fg1.split("}});")[0] + "}});";
                  var k = "|" + obj.match(/,'\|(\S*?).split/)[1];
                  var tk = k.split("|");
                  var ac = obj.match(/}\);',(\S*?),/)[1];
                  var url=urljs(tk, ac, fg2);
                  //console.log("notify:",obj)
                  vid(url,img)
                  return
              
      
          },
          didSendRequest: function(request) {
            var method = request.method
            var url = request.url
            var header = request.header
            var body = request.body
            console.log(url)
          }
      }
    }
  ]
});
}
function sleep(ms) {
  return new Promise(resolve => 
      setTimeout(resolve, ms)
  )
}
$ui.render({
  props: {
    title: "狩都高速 tzj"
  },
  views: [
    {
      type: "menu",
      props: {
        id: "menu",
        items: me.map(function(item) {
          return item.name;
        })
      },
      layout: function(make) {
        make.left.top.right.equalTo(0);
        make.height.equalTo(50);
      },
      events: {
        changed: function(sender) {
          $cache.set("type", me[sender.index].id);
          $cache.set("page", 1);
          getdata();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "Video",
        itemHeight: 280,
        columns: 2,
        spacing: 5,
        template: [
          {
            type: "image",
            props: {
              id: "img",
              radius: 3
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.top.bottom.right.left.inset(3);
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
          //geturl(data.url,data.img.src);
          getweburl(data.url,data.img.src)
          //sleep(3000).then(()=>{geturl(data.url,data.img.src)});
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore();
          var page = $cache.get("page") + 1;
          $cache.set("page", page);
          getdata();
        }
      }
    }
  ]
});

function getdata() {
  var page = $cache.get("page");
  var type = $cache.get("type");
  $ui.loading(true);
  $http.get({
    timeout:3,
    url: turl + "/portal/index/search" + type + "&page=" + page,
    handler: function(resp) {      
      if(resp.error){
        console.log(resp.error);
        $ui.toast(resp.error.localizedDescription);
        $ui.loading(false)
        return
      }
      $ui.loading(false);
      var arr = resp.data;
      var html = arr.replace(/\n|\s|\r/g, "");
      var te = html.match(/<ulid="works"[\s\S]*?<\/ul>/)
      if(te){te=te[0]}else{
        $cache.set("page",$cache.get('page')+1);
        getdata();
        return
      };
      var li = te.match(/<li><ahref=\S*?<\/a>/g);
      if (page == 1) {
        var data = [];
      } else {
        data = $("Video").data;
      }
      for (let i in li) {
        var dli = li[i];
        var img = turl + dli.match(/\/upload\/admin.*?\.jpg/);
        if (dli.search("detail/identification") != -1) {
          
          data.push({
            img: {
              src: img
            },
            url: dli.match(/detail\/identification\/(\S*?).html/)[1]

            });
        } //过滤会员片
      }
      $("Video").data = data;
      $("Video").endRefreshing();
    }
  });
}
getdata();


function urljs(tk, ac, fg2) {
  var aa = (function(p, a, c, k, e, d) {
    e = function(c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function(e) {
          return d[e];
        }
      ];
      e = function() {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(fg2, ac, ac, tk, 0, {});
  var url = aa.match(/url:\\'(\S*?)\\'/)[1];
  url = url.replace(/'/g, "");
  //console.log(url,img);
  //$app.openURL("thunder://"+url);
  //play(url);
  //vid(url,img)
  //return(url)
  //console.log("from urljs",url)
  return url
}
function vid(url,poster){
  $ui.push({props:{title:"like"},
  views:[{
    type: "video",
    props: {
      src: url,
      poster: poster
    },
    layout: function(make, view) {
      make.left.right.equalTo(0)
      make.centerY.equalTo(view.super)
      make.height.equalTo(256)
    }
  }]})
}
function play(url) {
  $ui.push({
    props: {
      title: "狩都高速 tzj"
    },
    views: [
      {
        type: "web",
        props: {
          id: "bof",
          url: url
        },
        layout: $layout.fill
      }
    ]
  });
}

