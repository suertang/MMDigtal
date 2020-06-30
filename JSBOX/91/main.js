/*
20200626
修复title获取
by https://github.com/suertang
*/
$include("scripts/md5");
var PromisePool=require("scripts/es6-promise-pool")
$cache.set("id", "rf")
$cache.set("pg", 1)

//let gdata=[]
//var urlt = "https://" + $text.base64Decode("NjI3LndvcmthcmVhNy5saXZlLw==");
//var urlt="https://91porn.com/"
var urlt = "http://0122.workarea1.live/"
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
            var videourls=text.match(/<imgsrc="http:\/\/img.*?jpg".*?href="http.*?">/g)
            if(!videourls){
                
                $ui.alert({
                  title: "对不起",
                  message: "当前网络环境引起了CDN阻滞，建议更换代理"
                })
                return
            }
            
            let newdata=[]
            var data
            if (pg == 1 ) {
                data = [];
              } else {
                data = $("list").data;
            }
            for (let video of videourls) {
                //console.log(video)
                //http://img2.t6k.co/thumb/328522.jpg
                let imgurl = video.match(/src="(http\S*jpg)"/)[1]
                imgurl = imgurl.replace(/\d_/,'').replace(/^http:/,'https:');
                //console.log('img'+imgurl);
                const videokey = video.match(/viewkey=([0-9a-fA-F]*?)&/)[1]
                console.log(video);
                const label = video.match(/title="(.*?)"/)[1]
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
                    if(!$file.exists("Download/"+label+".mp4")){
                    newdata.push({
                    image: {
                      src: imgurl
                    },
                    label:{
                        text: label
                    },
                    url: videokey        
                    })
                    };
              }
              $("list").data = data;
              //renderItems($("list").data);
              //let index=0;
              console.log(newdata)
              $("list").endRefreshing();
              console.info("数据长度"+newdata.length+"/"+data.length)
              var index=0
                var producer = function(){
                  if(index<newdata.length){                   
                    return getVideo(newdata[index++]);                    
                   }else{
                     return null;
                   }
                }
                //batchDownload(data)
              var pool=new PromisePool(producer,2)
              pool.start().then(function(){console.log("Complete")})
              //gdata=data;
              //batchDownload(data)
              
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
          let videourl = data.match(/<source src="(.*?)" type='video\/mp4'>/);
          if(videourl==null){
          const code = data.match(/strencode.*?\)/)[0];
          //console.log(code);
          videourl = eval(code);          
          console.log(videourl);
          videourl = videourl.match(/(http.*?)['"]/)[1]
          //.replace(/http:\/\/.*?\//,"http://185.38.13.131/");
          //http://185.38.13.131//mp43/356119.mp4?st=GJR-mR9l4HQTbQvOAlPQfg&e=1581798734
          }else{
            videourl=videourl[1]
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
        title: "91飞车"
      },
      // events:{
      //   appeared: function() {
      //     $app.openURL("shadowrocket://close");
      //   },
      //   disappeared: function() {
      //     $app.openURL("shadowrocket://open");
      //   }
      // },
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
            title: "下载"
          },
          layout: function(make, view) {
              make.top.equalTo(346)
              make.left.right.insets(10)              
            //make.height.equalTo(256)
          },
          events:
          {
            
              tapped : (sender) => 
              {
                let downurl=item.url
                console.log(downurl)
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
  function downloadVideo(item){
   console.info("Downloading "+item.title.substr(0,6)+"... from:"+item.url.match(/http:\/\/([.\d]+)\//)[1])
    return $http.download({
      url:item.url,
      handler:function(resp){
        var success = $file.write({
          data: resp.data,
          path: "Download/"+item.title+".mp4"
        })
        console.info(item.title.substr(0,6)+"...下载"+(success?"成功":"失败"))
  }})}
  async function getVideo(item){
    // get mp4 address and pass it to download worker
    // multiThreads later
    console.info("获取:"+item.label.text)
     let code = await $http.get({
            url: urlt + "view_video.php?viewkey=" + item.url,        
            timeout:3,
            header: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
                'X-Forwarded-For':random_ip(),
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer':urlt
            }
            })
            var respCode = code.response.statusCode;
            if(respCode!=200){
            console.log(respCode+"获取失败")
               return;
            }
              const data = code.data
              //console.log(data)
               let videourl = data.match(/<source src="(.*?)" type='video\/mp4'>/)[1];
                        if(videourl==null){
              const code = data.match(/strencode.*?\)/)[0];
              
              videourl = eval(code);
              
              videourl = videourl.match(/(http.*?)['"]/)[1];
              }
              if(videourl!=null){
                console.info("获取成功 "+videourl)
              return downloadVideo(
     {url:videourl,title:item.label.text})
     }else{
       console.info("视频获取失败"+item.label.text)
       return;
     }
  }

