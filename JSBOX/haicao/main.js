/*
20200626
修复title获取
by https://github.com/suertang
*/
$include("scripts/md5");
$include("scripts/string")
$cache.set("id", "latest-updates")
$cache.set("pg", 1)



// encode the url to keep it safe and cool
var urlt = "请自行填入海草的地址"

//console.log(urlt)
// menu data
var data = [{ "name": "最新", "id": "latest-updates" }, 
            { "name": "佳作", "id": "most-popular" }, 
            { "name": "合集", "id": "channels" },]
// main ui, which is a list of entries
$ui.render({
    props: {
        title: "海草飞车"
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
          // on tap item getdata and push another view
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
            
            getdata();
          }
        }
      }
    ]
})






// fill the list with data get from page
// random ip address to simulate proxy, cheat the server as we are from different IPs.
function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    console.log(`${urlt+id}/${pg}/`)
    $ui.loading(true)
    $http.get({
        url: pg==1?`${urlt}${id}/`:`${urlt}${id}/${pg}/`,
        header: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        },
        handler: function (resp) {
            $ui.loading(false)
            // remove blank characters
            var text = resp.data.replace(/\n|\s|\r/g, "")
            // matches the img src on page, as small preview picture.
            var videourls=text.match(/<divclass="item(.*?)<\/div>/g)
            if(!videourls){
                // if no data match, mostly caused by network problem
                $ui.alert({
                  title: "对不起",
                  message: "当前网络环境引起了CDN阻滞，建议更换代理"
                })
                console.log(text)
                return
            }
            
            let newdata=[]
            var data
            if (pg == 1 ) {
                data = [];
              } else {
                data = $("list").data;
            }
            // extract data from matched value
            for (let video of videourls) {
                
                let imgurl = video.match(/data-original="(http\S*jpg)"/)[1]
                imgurl = imgurl.replace(/\d_/,'');
                console.log(video);
                const videokey = video.match(/videos\/(\d+?)\//)[1]
                console.log(video);
                const label = video.match(/title="(.*?)"/)[1]
                // this data structure matched the $list requirement
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
              // assign data to list
              $("list").data = data;
              // make ui stop fetch more
              $("list").endRefreshing();

              
        }
    })
}


// call getdata firstly. very urgly here
getdata()

// this function generate random ip for http requests
function random_ip(){
    var randomIP = []
    for(var i = 0; i < 4; i++){
      var eachIP = Math.floor(Math.random() * 256)
      randomIP.push(eachIP)
    }
    return randomIP.join('.')
}

// get page content from view page, not ads loaded. !!!!
function geturl(item){
    console.log(urlt + `embed/${item.url}/`)
    $http.get({
        url: urlt + `embed/${item.url}/`,        
        header: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        },
        handler: function(resp) {
          const data = resp.data
          // sometimes the video is not encoded
          let videourl = data.match(/https:(\S*?)embed=true/);
          // if it is encodeded
          if(videourl==null){
            console.log(data)
            $ui.toast("没有发现视频地址");
            return
          }else{
            videourl=videourl[0]
          }
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
        title: "海草飞车"
      },
      views: [
        {
            type: "label",
            id:"title",
            props: 
            {
              text: item.text
            },
            layout: function(make, view) 
            {
              make.left.right.insets(10)
              
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
            title: "下载"
          },
          layout: function(make, view) {
              make.top.equalTo(346)
              make.left.right.insets(10)              
            //make.height.equalTo(256)
          },
          events:
          {
            // this download function need to be updated.
            // at least tell user the size if the download started or not.
            // although there is a prcess bar.
              tapped : (sender) => 
              {
                let downurl=item.url
                //console.log(downurl)
                $http.download({
                  url:downurl,
                  handler:function(resp)
                  {
                    let success = $file.write({
                      data: resp.data,
                      path: "Download/"+item.text+".mp4"
                    })
                    success && $ui.toast(`文件 ${item.text}.mp4 下载成功`)
                  }
                })
              }
          }
        }
      ]
    });
  }
//thank you very much.