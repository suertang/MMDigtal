/*2019 08 03*/
/*by suertang */
var me = [
  { name: "推荐资源", id: "/recom/1.html?recom=1" },
  { name: "人气热门", id: "/hot/1.html?hot=1" },
  { name: "最新", id: "/new/1.html" }
  //
]; 

var turl = 'https://' + $text.base64Decode("d3d3LmphcG9ueC5tZQ==");

$ui.render({
  props: {
    title: "狩都高速 MOD"
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
          geturl(data.url);
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
    timeout:5,
    url: turl + "/portal/index/search" + type + "&page=" + page,
    handler: function(resp) {
      
      $ui.loading(false);
      if(resp.error){
          $ui.toast(resp.error.localizedDescription)
          return
      }
      var arr = resp.data;
      var html = arr.replace(/\n|\s|\r/g, "");
      var te = html.match(/<ulid="works"[\s\S]*?<\/ul>/)[0];

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
function geturl(id) {
  $ui.loading(true);
  $http.get({
    timeout:5,
    url: turl + "/portal/index/ajax_get_js.html?identification=" + id,
    handler: function(resp) {
      $ui.loading(false);
      if(resp.error){
          $ui.toast(resp.error.localizedDescription)
          return
      }
      var arr = resp.data;
      //console.log(arr)
      var fg1 = arr.split("p}('")[1];
      var fg2 = fg1.split("}});")[0] + "}});";
      var k = "|" + arr.match(/,'\|(\S*?).split/)[1];
      var tk = k.split("|");
      var ac = arr.match(/}\);',(\S*?),/)[1];
      urljs(tk, ac, fg2);
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
  play(url);
}

function play(url) {
  $ui.push({
    props: {
      title: "狩都高速 MOD"
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

