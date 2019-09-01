/*
作者 suertang
日期 2019/09/01
版本 0.4
ISSUE 修复首页问题
*/

var me = [
  { name: "推荐资源", id: "/recom/1.html?recom=1" },
  { name: "人气热门", id: "/hot/1.html?hot=1" },
  { name: "最新", id: "/new/1.html" }
  //
]; 

var turl = 'https://' + "www.japonx.me"
//console.log(turl);
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
          geturl(data.url,data.img.src);
          
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
        $chche.set("page",$cache.get('page')+1);
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
function geturl(id,img) {
  $ui.loading(true);
  $http.get({
    
    timeout:3,
    url: turl + "/portal/index/ajax_get_js.html?identification=" + id,
    handler: function(resp) {
      
    if(resp.error){
            console.log(resp.error);
            $ui.toast(resp.error.localizedDescription);
            $ui.loading(false)
            return
          }
          //console.log()
      $ui.loading(false);
      var arr = resp.data;
      //console.log(arr)
      var fg1 = arr.split("p}('")[1];
      var fg2 = fg1.split("}});")[0] + "}});";
      var k = "|" + arr.match(/,'\|(\S*?).split/)[1];
      var tk = k.split("|");
      var ac = arr.match(/}\);',(\S*?),/)[1];
      var url=urljs(tk, ac, fg2);
      console.log("from geturl",url)
      console.log(id)
      
      console.log(tk)
      console.log(ac)
      console.log(fg2)
      vid(url,img)
    }
  });
}

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
