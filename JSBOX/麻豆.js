const encoded = "6aaW6aG1LOm6u+ixhuinhumikSw5MeWItueJh+WOgizlpKnnvo7kvKDlqpIs6Jyc5qGD5Lyg5aqSLOeah+WutuWNjuS6uizmmJ/nqbrkvKDlqpIs57K+5Lic5b2x5LiaLOS5kOaSreS8oOWqkizmiJDkurrlpLTmnaEs5LmM6bim5Lyg5aqSLOWFlOWtkOWFiOeUnyzmnY/lkKfljp/liJss546p5YG25aeQ5aeQLG1pbmnkvKDlqpIs5aSn6LGh5Lyg5aqSLOW8gOW/g+msvOS8oOWqkizokJ3ojonnpL4sUHN5Y2hvUG9ybizns5blv4NWbG9n"
const menu = $text.base64Decode(encoded).split(",")

var header = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
};

let id = 1
let page = 1
const base_url = "https://" + $text.base64Decode("d3d3Ljc1a3AuY29t")
const js_name = $text.base64Decode("6bq76LGG6KeG6aKR")
$ui.render({
  props: {
    title: js_name
  },
  views: [
    {
      type: "menu",
      props: {
        id: "meun",
        items: menu.slice(1)
      },
      layout: function (make) {
        make.left.top.right.equalTo(0);
        make.height.equalTo(50);
      },
      events: {
        changed: function (sender) {
          id = sender.index;
          page = 1
          $("list").data=[]
          enter();
        }
      }
    },
    {
      type: "list",
      layout: function (make) {
        make.right.left.bottom.inset(0);
        make.top.equalTo($("meun").bottom);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          const id = data.split("\n");
          sub(id[1], id[0]);
        },
        didReachBottom: function (sender) {
          sender.endFetchingMore();
          page = page + 1
          enter();
        }
      }
    }
  ]
});

function enter(){
    const page_string = page > 1 ? "/page/" + page : ""
    const url = `${base_url}/index.php/vod/type/id/${id}${page_string}.html`
    $http.get({
      url: url,
      timeout: 5,
      header: header,
      handler: function (resp) {
        $ui.loading(false);
        var text = resp.data
        
        //console.log(text)
        let data = [];
        $xml.parse({
          string: text,
          mode: "html"
        }).enumerate({
          selector:"div.video-item a",
          handler: function(e){
            data.push(e.string.replace(/\s/g,"") + "\n" +e.attributes.href)
          }
        })
        // console.log(data)
        $("list").data = $("list").data.concat(data);
        $("list").endFetchingMore();
        if($("list").data.length < 20){
          page++;
          enter();
        }
      }
    });
}
enter()

function sub(path, title){
  // 构造url
  const url = `${base_url}${path}`;
  // console.log(url)
  // request, 提取m3u8
  $http.get({
    url: url,
    timeout: 5,
    header: header,
    handler: function (resp) {
      $ui.loading(false);
      var text = resp.data
      // console.log(text)
      let videoUrlGroups = text.match(/"url":\s*?"(.*?m3u8)"/)
      if( !videoUrlGroups) {
        $ui.toast('Cannot find url')
        return
      }
      const video = JSON.parse("{" + videoUrlGroups[0] +"}").url
      console.log(video)
      $ui.push({
        props: {
            title: title
        },
        views: [{
            type: "web",
            props: {
                url: video,
            },
            layout: $layout.fill
        }]
    })
    }
  });
}