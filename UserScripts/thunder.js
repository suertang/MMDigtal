
var obj = JSON.parse($response.body);

var nor = {
        "status" : "STATUS_OK",
        "message" : "正常资源",
        "title" : ""
      };
// console.log(body.files)
// obj.files.map((x) => x.audit = Object.create(nor))

for(var item of obj.files){
  item.audit = Object.create(nor);
}

// body = JSON.stringify(obj);

$done({body: JSON.stringify(obj)});
