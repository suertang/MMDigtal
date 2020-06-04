/*
20190822
suertang
*/


$cache.set("id", "rf")
$cache.set("pg", 1)
var urlt = "https://" + $text.base64Decode("NjI3LndvcmthcmVhNy5saXZlLw==");
console.log(urlt)
var data = [{ "name": "最近加精", "id": "rf" }, 
            { "name": "当前最热", "id": "hot" }, 
            { "name": "最近得分", "id": "rp" }, 
            { "name": "10+分钟", "id": "long" },]

$ui.render({
    props: {
        title: "91飞车"
    },
    views: [{
        type: "menu",
        props: {
            id: "menu",
            items: data.map(item=> item.name),
        },
        layout: function (make) {
            make.left.top.right.equalTo(0)
            make.height.equalTo(50)

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
        props: {
          id:"list",
          rowHeight: 100,          
          template: [
            {
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
})




function  getimgsrc(htmlstr){
    var reg=/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    while(tem=reg.exec(htmlstr)){
        arr.push(tem[2]);
    }
    return arr;
}
function  getimgsrcsolo(htmlstr){
    var reg=/<imgsrc="(\S*jpg)"/;
    //var arr = [];
    
    return htmlstr.match(reg)[1]
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}


function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    //console.log(urlt +"video.php?category="+ id + "&page=" + pg)
    $ui.loading(true)
    $http.get({
        url: urlt +"v.php?category="+ id + "&page=" + pg,
        header: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Version/12.0 Safari/604.1',
            'X-Forwarded-For':random_ip(),
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'referer':urlt
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var videourls = text.match(/class="imagechannel(hd)?">.*?<\/div>/g)
            if(!videourls){
                
                toast("CDNblock，请稍后重试")
                return
            }
            //console.log(videos)
            if (pg == 1 ) {
                var data = [];
              } else {
                var data = $("list").data;
            }
            for (let video of videourls) {
                //console.log(video)
                //http://img2.t6k.co/thumb/328522.jpg
                const imgurl = getimgsrcsolo(video).replace(/\d_/,'').replace(/^http\:/,'https:');
                //console.log('img'+imgurl);
                const videokey = video.match(/viewkey=(\S*)&/)[1]
                //console.log(videokey);
                const label = video.match(/title="(\S*)"/)[1]
                //videourl = turl + "view_video.php?viewkey=" + videourl; 
                  data.push({
                    image: {
                      src: imgurl
                    },
                    label:{
                        text: label
                    },
                    url: videokey        
                    });
              }
              $("list").data = data;
              //renderItems($("list").data);
              $("list").endRefreshing();
        }
    })
}



getdata()
function random_ip(){
    var randomIP = []
    for(var i = 0; i < 4; i++){
      var eachIP = Math.floor(Math.random() * 256)
      randomIP.push(eachIP)
    }
    return randomIP.join('.')
}

function geturl(item){
    //获取真实的视频地址，带key
    //let url=''
    $http.get({
        url: urlt + "view_video.php?viewkey=" + item.url,        
        header: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
            'X-Forwarded-For':random_ip(),
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'referer':urlt
        },
        handler: function(resp) {
          const data = resp.data
          //console.log(data)
          //const code = data.match(/strencode\((\S+)\)\)/)[1];
          //console.log(code);
          //let videourl = eval(code);
          //const pars = code.match(/"(.*?)"/g);
          //removequotes(pars)
          //console.log(pars)
          //let videourl = strencode(pars[0],pars[1],pars[2]);
          //console.log(videourl);   
          const videourl = data.match(/<source src="(.*?)" type='video\/mp4'>/)[1];
          //console.log(videourl)
          play({
              text:item.label.text,
              url:videourl,
              image:item.image.src
        });
        }
      })
}

 

function play(item) {
    $ui.push({
      props: {
        title: "91飞车"
      },
      views: [
        {
            type: "label",
            id:"title",
            props: {
              text: item.text
            },
            layout: function(make, view) {
              make.left.right.insets(10)
              
              //make.height.equalTo(80)
            }
          },
        {
            type: "video",
            id:"player",
            props: {
              src: item.url,
              poster: item.image
            },
            layout: function(make, view) {
                make.top.equalTo(90)
                make.left.right.equalTo(0)
              
                make.height.equalTo(256)
            }
          },
          {
            type: "button",
            props: {
              title: "使用玩客云下载"
            },
            layout: function(make, view) {
                make.top.equalTo(346)
                make.left.right.insets(10)              
              //make.height.equalTo(256)
            },
            events:{
                tapped : (sender) => {
                    $clipboard.text='thunder://' + $text.base64Encode("AA"+item.url+"ZZ");
                    $app.openURL("wky://");
                }
            }
          }
      ]
    });
  }
