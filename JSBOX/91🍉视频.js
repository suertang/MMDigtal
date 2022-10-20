/*
20220619
by suertang
https://github.com/suertang
*/
function strencode(a, b, c) {
  const l = c.substr(-1)
  if (l == 2) {
    const t = a
    a = b
    b = t
  }
  a = $text.base64Decode(a)
  const len = b.length
  let code = ''
  for (let i = 0; i < a.length; i++) {
    let k = i % len
    code += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(k))
  }
  //console.log(code)
  return $text.base64Decode(code)
}
function strencode2(a){
  return unescape(a)
}
$cache.set("id", "rf");
$cache.set("pg", 1);
var urlt = "http://" + $text.base64Decode("NjI3LndvcmthcmVhNy5saXZlLw==");
urlt = "https://f0529.wonderfulday22.live/";
console.log(urlt);
var data = [
  { "name": "最近加精", "id": "rf" },
  { "name": "当前最热", "id": "hot" },
  { "name": "最近得分", "id": "rp" },
  { "name": "10+分钟", "id": "long" }
];

$ui.render({
  props: {
    title: "￼￼￼￼就要🍉视频"
  },
  views: [{
      type: "menu",
      props: {
        id: "menu",
        items: data.map(item => item.name)
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
      props: {
        id: "list",
        rowHeight: 100,
        template: [{
            type: "image",
            props: {
              id: "image"
            },
            layout: (make, view) => {
              make.left.top.bottom.inset(5);
              make.width.equalTo(view.height);
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              font: $font("bold", 17),
              lines: 0
            },
            layout: make => {
              make.left.equalTo($("image").right).offset(10);
              make.top.bottom.equalTo(0);
              make.right.inset(10);
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
          geturl(data);
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore();
          var page = $cache.get("pg") + 1;
          $cache.set("pg", page);
          //console.log('OK')
          getdata();
        }
      }
    }
  ]
});

function getdata() {
  var id = $cache.get("id");
  var pg = $cache.get("pg");
  //console.log(urlt +"video.php?category="+ id + "&page=" + pg)
  $ui.loading(true);
  $http.get({
    url: urlt + "v.php?category=" + id + "&page=" + pg,
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Version/12.0 Safari/604.1",
      "X-Forwarded-For": random_ip(),
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "referer": urlt
    },
    handler: function(resp) {
      $ui.loading(false);
      var text = resp.data.replace(/\n|\s|\r/g, "");

      var videourls = text.match(/class="wellwell-sm(.*?)(?:wellwell)/g);
      if (!videourls) {

        $ui.toast("🙅响应");
        return;
      }
      //console.log(videos)
      if (pg == 1) {
        var data = [];
      } else {
        var data = $("list").data;
      }
      for (let video of videourls) {
        //console.log(video)
        //continue
        //console.log(video)
        //http://img2.t6k.co/thumb/328522.jpg
        const imgurl = video.match(/src="(http.*?)"/)[1];
        //console.log('img'+imgurl);
        const videokey = video.match(/viewkey=(.*?)&/)[1];
        //console.log(videokey);
        const label = video.match(/titletitle.*?>(.*?)</)[1];
        //videourl = turl + "view_video.php?viewkey=" + videourl;
        record = {
          image: {
            src: imgurl
          },
          label: {
            text: label
          },
          url: videokey
        };
        console.log(record);
        data.push(record);
      }
      $("list").data = data;
      
      $("list").endRefreshing();
    }
  });
}

getdata();

function random_ip() {
  var randomIP = [];
  for (var i = 0; i < 4; i++) {
    var eachIP = Math.floor(Math.random() * 256);
    randomIP.push(eachIP);
  }
  return randomIP.join(".");
}

function geturl(item) {
  //获取真实的视频地址，带key
  //let url=''
  $http.get({
    url: urlt + "view_video.php?viewkey=" + item.url,
    header: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
      "X-Forwarded-For": random_ip(),
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "referer": urlt
    },
    handler: function(resp) {
      const data = resp.data;
      console.log(data);
      const code = data.match(/strencode.*?\)/)[0];
      //console.log(code);
      let videourl = eval(code);

      videourl = videourl.match(/(http.*?)['"]/)[1];
      // $ui.toast(videourl)
      // return
      play({
        text: item.label.text,
        url: videourl,
        image: item.image.src
      });
    }
  });
}

function play(item) {
  const title = item.text?item.text:"91视频播放器"
  $ui.push({
    props: {
      title: title
    },
    views: [

      {
        type: "web",
        id: "web",
        props: {
          html: `
          <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
            <meta charset="UTF-8">
            <title>${item.title}</title>
            <body>
          <div id='vs'></div>
          <script src="https://cdn.jsdelivr.net/npm/xgplayer@2.31.6/browser/simple_player.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/npm/xgplayer@2.31.6/browser/controls/volume.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/npm/xgplayer@2.31.6/browser/controls/playbackRate.js" type="text/javascript"></script>
<script type="text/javascript">
  let player = new window.Player({
    id: 'vs',
    url: '${item.url}',
    width: '100%',
    fitVideoSize: 'fixWidth',
    autoplay: true,
    skipTime: 10,
    poster: '${item.image}',
    controlPlugins: [
      window.PlayerControls.volume,
      window.PlayerControls.playbackRate
    ],
    playbackRate: [0.5, 0.75, 1, 1.5, 2] //传入倍速可选数组
  });
</script>
</body></html>`,
        },
        layout: $layout.fill,
        //function(make, view) {
          //make.full
          //make.top.equalTo(90);
          //make.left.right.equalTo(0);

          //make.height.equalTo(256);
        //},
        events: {
          didFinish: function(sender, nav) {
            // $ui.alert("Load finish.")
            // sender.play()
          }
        }
      }
    ]
  });

}