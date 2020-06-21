/*
20191123
采用了list纵向显示图片。
*/
$cache.set("id", "16")
$cache.set("pg", 1)
var urlt = "https://cl.dc72.xyz/"

var data = [{ "name": "达盖尔的旗帜", "id": "16" }, 
            { "name": "新时代的我们", "id": "8" }, ]

$ui.render({
    props: {
        title: "1024BT图片"
    },
    views: [{
        type: "menu",
        props: {
            id: "meun",
            items: data.map(function (item) {
                return item.name
            }),
        },
        layout: function (make,view) {
            make.left.top.right.equalTo(0)
            make.height.equalTo(50)
make.width.equalTo(view.width)
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
        layout: function(make,view){make.top.equalTo($("meun").bottom)
        make.left.right.inset(10)
        make.height.equalTo(view.super.height)
        },
        props:{
          rowHeight:80,
          template:[{
            type:"label",            
              props:{
                id:"label",
                font:$font(14),
                lines:0
              },
              layout:(make,view)=>{
                  make.left.right.inset(10)
make.width.equalTo(view.width)
                  make.top.bottom.equalTo(0)

                  //make.right.inset(10)
                }
            }
          ]},
        events: {
            didSelect: function (sender, indexPath, data) {
                let title = data.label.text
                geting(data.url, title)
            },
            didReachBottom: function (sender) {
                sender.endFetchingMore()
                var page = $cache.get("pg") + 1
                $cache.set("pg", page)
                getdata()
            }
        }

    },]
})

function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + "thread0806.php?fid=" + id + "&page=" + pg+"",
        header: {
                    'User-Agent': "mozilla/5.0 (iphone; cpu iphone os 11_0 like mac os x) applewebkit/604.1.38 (khtml, like gecko) version/11.0 mobile/15a372 safari/604.1"},
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            //console.log(text)
            //console.log("text length before split",text.length)
            //if (text.indexOf("普通主题") !== -1) {
            //console.log("找到普通主题")
            if(text.indexOf("普通主題") !== -1) {
                const para = text.split("普通主題")
                text = para[para.length-1]
            }
            //console.info(text)

	
            
            //console.log("text length after split",text.length)
            //var shu = text.match(/class="listt_one"(\S*?)<\/a>/g)
            const reg = /(htm_data.*?)".*id="">(<.*?>)?(.*?)(<\/font>)?<\/a>+?/g
            var data
            if (pg == 1) {
               data = []
            } else {
              data = $("list").data
            }
//            let matches = []
            let match=reg.exec(resp.data)
            while(match)
            {
              
              data.push({label:{text:match[3]},url:match[1]})
              //matches.push(match[3])
              match=reg.exec(resp.data)
            }
            console.log(data)
            //let newmatch = resp.data.match()
            
                
            
            $("list").data = data
            //console.info(data)
            $("list").endFetchingMore()
        }
    })
}

getdata()
function  getimgsrc(htmlstr){
    console.log(htmlstr)
    var reg=/<[input|img].+?(?:data-)?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    var tem=reg.exec(htmlstr)
    while(tem != null){
        arr.push(tem[2]);
        tem=reg.exec(htmlstr)
    }
    return arr;
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
/*
function isGif(imgurl){
    return !imgurl.toLowerCase().endsWith('gif')
}
*/
var genGallery = function(urls,mc){
    //let html=''
    //urls=urls.filter(isGif)
    //console.log(urls)
   
    //var g=[]
    let imgs=""
    for (let i of urls){
        //g.push(
        //    {"ima":{"src":i}
        //})
        imgs += '<img style="width:100%;height:auto" src=' + i + ' /><br /><br />'
    }
     let html=`<html><head><meta name=”viewport” content=”width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=1.0, user-scalable=yes” /><meta charset="UTF-8"><title>${mc}</title></head><body>${imgs}</body></html>`
    return html;
    //return g;
}
function geting(id, mc) {
    $ui.loading(true)
    $http.get({
        url: urlt +""+ id,
        handler: function (resp) {
            $ui.loading(false)
            console.log(resp.data)
            const attr = resp.data.match(/img\[(.*?)\]/)[1]
            console.log(attr)
            const imgReg = new RegExp(attr+"='(.*?)'","g")
            
            var text = resp.data//.match(/<div class="tpc_cont">[\s\S]*?$/)
            //console.info(text)
            //const imgs = getimgsrc(text)//.match(regimg);
            let imgs=[]
           let m=imgReg.exec(text)
           while(m)
           {
             
             imgs.push(m[1])
             m=imgReg.exec(text)
           }
            const html = genGallery(imgs,mc)
            console.info(html)
            $ui.push({
              props:{
                title:mc,
                //data:imgs
                },
            views:[
                {
                    type: "web",
                    
                    props:{
                      id:'ga',
                      html:html
                      },
                      
                 layout: $layout.fill
                }]      
            
        })
    
}

})
}
