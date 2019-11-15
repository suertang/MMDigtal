/*
20191114
suertang
*/
$cache.set("id", "16")
$cache.set("pg", 1)
var urlt = "https://cl.kowsx.com/"
//var urlt = "https://t66y.com/"
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
        layout: $layout.fill,
        props:{
          rowHeight:80,
          template:[{
            type:"label",            
              props:{
                id:"label",
                font:$font(14),
                lines:0
              },
              layout:make=>{
                  make.left.right.inset(10)
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
        url: urlt + "thread0806.php?fid=" + id + "&page=" + pg,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            console.log("text length before split",text.length)
            //if (text.indexOf("普通主题") !== -1) {
            //console.log("找到普通主题")
            if (text.indexOf("<trclass=\"tr2\">") !== -1) {
                const para = text.split("<trclass=\"tr2\">")
                text = para[para.length-1]
            }
            console.log("text length after split",text.length)
            var shu = text.match(/class="tr3t_onetac">(\S*?)<\/h3>/g)
            var data
            if (pg == 1) {
                data = []
            } else {
                data = $("list").data
            }
            for (let i in shu) {
                var a = shu[i]
                if (a.indexOf('href=') !== -1) {
                    var txt = a.split("<h3>")[1]
                    var mc = txt.match(/">(\S*?)<\/a>/)[1].replace(/<\S*?(\/?).*?>/g,"")
                    var id = a.match(/href="(\S*?)"/)[1]
                    //console.log(id);
                    data.push({label:{text:mc},url:id})
                }
            }
            $("list").data = data
            console.info(data)
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
var genGallery = function(urls){
    //let html=''
    //urls=urls.filter(isGif)
    //console.log(urls)
    var g=[]
    for (let i of urls){
        g.push({
          type:"image",
          props:{
            src:i
            }
        })
        //html += '<img src=' + i + ' /><br /><br />'
    }
    //return html;
    return g;
}
function geting(id, mc) {
    $ui.loading(true)
    $http.get({
        url: urlt +""+ id,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.match(/<div class="tpc_content do_not_catch">[\s\S]*?<tr class="tr1">/)
            console.log(resp.data)
            //text = text[0].replace('class="tpc_cont">', "")//.replace(/([0-9a-zA-Z]{40})/g,'<a href="magnet:?xt=urn:btih:'+'$1'+'">'+'$1'+'</a>');
            
            //var mag=text.match(/hash=1\d\d([0-9a-zA-Z]{40})/);

            //const regimg = /<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\1[^>]*?\/?\s*>/g;

            const imgs = getimgsrc(text)//.match(regimg);

            console.log(imgs);
            //var shu = $detector.link(text);
            //var url = shu[shu.length - 2]

            const html = genGallery(imgs)
            console.info(html)
            //var html = `<html><head><meta charset="UTF-8"><title>${mc}</title><style> body,div{ font-size:42px;} </style> </head><body><div>${text}</body></html>`
            $ui.push({
              props:{title:mc},
            views:[{
  type: "gallery",
  props: {
    items: html,
    interval: 3,
    radius: 5.0
  },
  layout: function(make, view) {
    make.left.right.inset(10)
    make.centerY.equalTo(view.super)
    make.height.equalTo(320)
  }
}]
})
/*
            $ui.push({
                props: {
                    title: mc
                },events:{touchesBegan: function(sender, location) {
                        console.log("moved");}
                        },
                views: [{
                    type: "web",
                    props: {
                        html: html,
                    },
                    layout: $layout.fill
                }]
            })
            */
        }
    })
}

