/*
20190730
suertang
*/

;
var encode_version = 'sojson.v5',
lbbpm = '__0x33ad7',
__0x33ad7 = ['QMOTw6XDtVE=', 'w5XDgsORw5LCuQ==', 'wojDrWTChFU=', 'dkdJACw=', 'w6zDpXDDvsKVwqA=', 'ZifCsh85fsKaXsOOWg==', 'RcOvw47DghzDuA==', 'w7siYTLCnw==']; (function(_0x94dee0, _0x4a3b74) {
    var _0x588ae7 = function(_0x32b32e) {
        while (--_0x32b32e) {
            _0x94dee0['push'](_0x94dee0['shift']());
        }
    };
    _0x588ae7(++_0x4a3b74);
} (__0x33ad7, 0x8f));
var _0x5b60 = function(_0x4d4456, _0x5a24e3) {
    _0x4d4456 = _0x4d4456 - 0x0;
    var _0xa82079 = __0x33ad7[_0x4d4456];
    if (_0x5b60['initialized'] === undefined) { (function() {
            var _0xef6e0 = typeof window !== 'undefined' ? window: typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global: this;
            var _0x221728 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0xef6e0['atob'] || (_0xef6e0['atob'] = function(_0x4bb81e) {
                var _0x1c1b59 = String(_0x4bb81e)['replace'](/=+$/, '');
                for (var _0x5e3437 = 0x0,
                _0x2da204, _0x1f23f4, _0x3f19c1 = 0x0,
                _0x3fb8a7 = ''; _0x1f23f4 = _0x1c1b59['charAt'](_0x3f19c1++);~_0x1f23f4 && (_0x2da204 = _0x5e3437 % 0x4 ? _0x2da204 * 0x40 + _0x1f23f4: _0x1f23f4, _0x5e3437++%0x4) ? _0x3fb8a7 += String['fromCharCode'](0xff & _0x2da204 >> ( - 0x2 * _0x5e3437 & 0x6)) : 0x0) {
                    _0x1f23f4 = _0x221728['indexOf'](_0x1f23f4);
                }
                return _0x3fb8a7;
            });
        } ());
        var _0x43712e = function(_0x2e9442, _0x305a3a) {
            var _0x3702d8 = [],
            _0x234ad1 = 0x0,
            _0xd45a92,
            _0x5a1bee = '',
            _0x4a894e = '';
            //console.log(_0x2e9442)
            _0x2e9442 = _atob(_0x2e9442);
            //_0x2e9442 = Base64.decode(_0x2e9442);
            //console.log(_0x2e9442)
            for (var _0x67ab0e = 0x0,
            _0x1753b1 = _0x2e9442['length']; _0x67ab0e < _0x1753b1; _0x67ab0e++) {
                _0x4a894e += '%' + ('00' + _0x2e9442['charCodeAt'](_0x67ab0e)['toString'](0x10))['slice']( - 0x2);
            }
            //console.log(_0x4a894e);
            _0x2e9442 = decodeURIComponent(_0x4a894e);
            for (var _0x246dd5 = 0x0; _0x246dd5 < 0x100; _0x246dd5++) {
                _0x3702d8[_0x246dd5] = _0x246dd5;
            }
            for (_0x246dd5 = 0x0; _0x246dd5 < 0x100; _0x246dd5++) {
                _0x234ad1 = (_0x234ad1 + _0x3702d8[_0x246dd5] + _0x305a3a['charCodeAt'](_0x246dd5 % _0x305a3a['length'])) % 0x100;
                _0xd45a92 = _0x3702d8[_0x246dd5];
                _0x3702d8[_0x246dd5] = _0x3702d8[_0x234ad1];
                _0x3702d8[_0x234ad1] = _0xd45a92;
            }
            _0x246dd5 = 0x0;
            _0x234ad1 = 0x0;
            for (var _0x39e824 = 0x0; _0x39e824 < _0x2e9442['length']; _0x39e824++) {
                _0x246dd5 = (_0x246dd5 + 0x1) % 0x100;
                _0x234ad1 = (_0x234ad1 + _0x3702d8[_0x246dd5]) % 0x100;
                _0xd45a92 = _0x3702d8[_0x246dd5];
                _0x3702d8[_0x246dd5] = _0x3702d8[_0x234ad1];
                _0x3702d8[_0x234ad1] = _0xd45a92;
                _0x5a1bee += String['fromCharCode'](_0x2e9442['charCodeAt'](_0x39e824) ^ _0x3702d8[(_0x3702d8[_0x246dd5] + _0x3702d8[_0x234ad1]) % 0x100]);
            }
            return _0x5a1bee;
        };
        _0x5b60['rc4'] = _0x43712e;
        _0x5b60['data'] = {};
        _0x5b60['initialized'] = !![];
    }
    var _0x4be5de = _0x5b60['data'][_0x4d4456];
    if (_0x4be5de === undefined) {
        if (_0x5b60['once'] === undefined) {
            _0x5b60['once'] = !![];
        }
        _0xa82079 = _0x5b60['rc4'](_0xa82079, _0x5a24e3);
        _0x5b60['data'][_0x4d4456] = _0xa82079;
    } else {
        _0xa82079 = _0x4be5de;
    }
    return _0xa82079;
};
if (typeof encode_version !== 'undefined' && encode_version === 'sojson.v5') {
    function strencode(_0x50cb35, _0x1e821d) {
        var _0x59f053 = {
            'MDWYS': '0|4|1|3|2',
            'uyGXL': function _0x3726b1(_0x2b01e8, _0x53b357) {
                return _0x2b01e8(_0x53b357);
            },
            'otDTt': function _0x4f6396(_0x33a2eb, _0x5aa7c9) {
                return _0x33a2eb < _0x5aa7c9;
            },
            'tPPtN': function _0x3a63ea(_0x1546a9, _0x3fa992) {
                return _0x1546a9 % _0x3fa992;
            }
        };
        var _0xd6483c = _0x59f053[_0x5b60('0x0', 'cEiQ')][_0x5b60('0x1', '&]Gi')]('|'),
        _0x1a3127 = 0x0;
        while ( !! []) {
            switch (_0xd6483c[_0x1a3127++]) {
            case '0':
                _0x50cb35 = _0x59f053[_0x5b60('0x2', 'ofbL')](_atob, _0x50cb35);
                continue;
            case '1':
                code = '';
                continue;
            case '2':
                return _0x59f053[_0x5b60('0x3', 'mLzQ')](_atob, code);
            case '3':
                for (i = 0x0; _0x59f053[_0x5b60('0x4', 'J2rX')](i, _0x50cb35[_0x5b60('0x5', 'Z(CX')]); i++) {
                    k = _0x59f053['tPPtN'](i, len);
                    code += String['fromCharCode'](_0x50cb35[_0x5b60('0x6', 's4(u')](i) ^ _0x1e821d['charCodeAt'](k));
                }
                continue;
            case '4':
                len = _0x1e821d[_0x5b60('0x7', '!Mys')];
                continue;
            }
            break;
        }
    }
} else {
    alert('');
};

// Create Base64 Object
var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        
// btoa method
function _btoa (s) {
    if (/([^\u0000-\u00ff])/.test(s)) {
        throw new Error('INVALID_CHARACTER_ERR');
    }    
    var i = 0,
        prev,
        ascii,
        mod,
        result = [];


    while (i < s.length) {
        ascii = s.charCodeAt(i);
        mod = i % 3;


        switch(mod) {
            // 第一个6位只需要让8位二进制右移两位
            case 0:
                result.push(base64hash.charAt(ascii >> 2));
                break;
            //第二个6位 = 第一个8位的后两位 + 第二个8位的前4位
            case 1:
                result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
                break;
            //第三个6位 = 第二个8位的后4位 + 第三个8位的前2位
            //第4个6位 = 第三个8位的后6位
            case 2:
                result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
                result.push(base64hash.charAt(ascii & 0x3f));
                break;
        }


        prev = ascii;
        i ++;
    }


    // 循环结束后看mod, 为0 证明需补3个6位，第一个为最后一个8位的最后两位后面补4个0。另外两个6位对应的是异常的“=”；
    // mod为1，证明还需补两个6位，一个是最后一个8位的后4位补两个0，另一个对应异常的“=”
    if(mod == 0) {
        result.push(base64hash.charAt((prev & 3) << 4));
        result.push('==');
    } else if (mod == 1) {
        result.push(base64hash.charAt((prev & 0x0f) << 2));
        result.push('=');
    }


    return result.join('');
}


// atob method
// 逆转encode的思路即可
function _atob (s) {
    s = s.replace(/\s|=/g, '');
    var cur,
        prev,
        mod,
        i = 0,
        result = [];


    while (i < s.length) {
        cur = base64hash.indexOf(s.charAt(i));
        mod = i % 4;


        switch (mod) {
            case 0:
                //TODO
                break;
            case 1:
                result.push(String.fromCharCode(prev << 2 | cur >> 4));
                break;
            case 2:
                result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                break;
            case 3:
                result.push(String.fromCharCode((prev & 3) << 6 | cur));
                break;
                
        }


        prev = cur;
        i ++;
    }


    return result.join('');
}
$cache.set("id", "rf")
$cache.set("pg", 1)
var urlt = "https://"+ $text.base64Decode("NjI3LndvcmthcmVhNy5saXZlLw==");
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
            items: data.map(function (item) {
                return item.name
            }),
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
            var page = $cache.get("pg") + 1;
            $cache.set("pg", page);
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

function isGif(imgurl){
    return !imgurl.toLowerCase().endsWith('gif')
}
var genGallery = function(urls){
    let html=''
    urls=urls.filter(isGif)
    console.log(urls)
    for (let i of urls){
        
        html += '<img src=' + i + ' /><br /><br />'
    }
    return html;
}
function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    //console.log(urlt +"video.php?category="+ id + "&page=" + pg)
    $ui.loading(true)
    $http.get({
        url: urlt +"v.php?category="+ id + "&page=" + pg,
        header: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
            'X-Forwarded-For':random_ip(),
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'referer':urlt
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var videourls = text.match(/class="imagechannel(hd)?">.*?<\/div>/g)
            //console.log(videos)
            if (pg == 1) {
                var data = [];
              } else {
                var data = $("Video").data;
            }
            for (let video of videourls) {
                //console.log(video)
                //http://img2.t6k.co/thumb/328522.jpg
                const imgurl = getimgsrcsolo(video).replace(/\d_/,'');
                //console.log('img'+imgurl);
                const videokey = video.match(/viewkey=(\S*)&/)[1]
                //console.log(videokey);
                
                //videourl = turl + "view_video.php?viewkey=" + videourl; 
                  data.push({
                    img: {
                      src: imgurl
                    },
                    url: videokey        
                    });
              }
              $("Video").data = data;
              $("Video").endRefreshing();
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

function geturl(key){
    //获取真实的视频地址，带key
    //let url=''
    $http.get({
        url: urlt + "view_video.php?viewkey=" + key,        
        header: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
            'X-Forwarded-For':random_ip(),
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'referer':urlt
        },
        handler: function(resp) {
          const data = resp.data
          const code = data.match(/strencode\((\S+)\)\)/)[1];
          //console.log(code);
          //let videourl = eval(code);
          const pars = code.match(/"(.*?)"/g);
          removequotes(pars)
          console.log(pars)
          let videourl = strencode(pars[0],pars[1],pars[2]);
          console.log(videourl);   
          videourl = videourl.match(/<source src=\'(.*?)\' type=\'video\/mp4\'>/)[1];
          console.log(videourl)
          play(videourl);
        }
      })
}
function removequotes(arr){
    for (let i in arr){
        arr[i] = arr[i].replace(/"/g,'');
    }
}
 

function play(url) {
    $ui.push({
      props: {
        title: "91飞车"
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
