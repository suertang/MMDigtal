$archiver.zip({
  directory: "Download",
  dest: "Arc/v.zip",
  handler: function(success) {
    console.log("压缩成功")
  }
})
