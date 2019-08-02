$app.strings = {
    "en": {
      "title": "QR Code installer",
      "btn-open-title": "Install"
    },
    "zh-Hans": {
      "title": "二维码安装",
      "btn-open-title": "安装"
    }    
  }
  
  var resultView = function(result) {
    return {
      views: [
        {
          type: "label",
          props: {
            id: "result-label",
            text: result,
            align: $align.center,
            font: $font(20),
            textColor: $color("#000000"),
            selectable: false,
            lines: 0
          },
          layout: function(make, view) {
            make.top.equalTo(view.super).offset(30)
            make.left.right.equalTo(view.super).inset(15)
          }
        },
        {
          type: "button",
          props: {
            id: "btn-open",
            title: $l10n("btn-open-title"),
            bgcolor: $color("#34495E"),
            radius: 8,
            tintColor: $color("#ffffff")
          },
          layout: function(make, view) {
            make.left.right.equalTo(view.super).inset(15)
            make.bottom.equalTo(view.super).inset(30)
            make.height.equalTo(50)
          },
          events: {
            tapped: function(sender) {
//              $app.openURL(result)
if (result.substr(0,5)==="jsbox")
{
  console.log($text.URLDecode(result))
  urlcl($text.URLDecode(result));
return}
$http.download({
        url: result,
        handler: function (resp) {
            install(resp.data,result.substr(result.lastIndexOf("/")+1))
        }
    })
            }
          }
        }
      ]
    }
  }
  
  $qrcode.scan(function(text) {
    $ui.render(resultView(text))  
  })
  function urlcl(link) {
      console.log(link)
      var url = link.match(/url=(.+?)&/)[1];
      var name = link.match(/name=(.+?)&/)[1];
      console.log(url,name)
      //return
      $ui.toast("正在安装中 ...");
      $http.download({
          url: url,
          handler: function (resp) {
              install(resp.data, name)
          }
      })
  }
  function install(data, name) {
      $addin.save({
          name: name,
          data: data,
          handler: function () {
              $ui.alert({
                  title: "安装完成",
                  message: "\n是否打开？\n" + name,
                  actions: [
                      {
                          title: "打开",
                          handler: function () {
                              $app.openExtension(name)
                              $app.close(2)
                          }
                      },
                      {
                          title: "不了"
                      }]
              });
          }
      })
  }
  
