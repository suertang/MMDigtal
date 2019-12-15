Attribute VB_Name = "模块1"
Function FormatDate(ByRef strDate As String)
iYear = Mid(strDate, 1, 4)
iMonth = Mid(strDate, 5, 2)
iDay = Mid(strDate, 7, 2)

FormatDate = iYear + "-" + iMonth + "-" + iDay
End Function

'http://eryk.javaeye.com/blog/638277
'0：”大秦铁路”，股票名字；
'1：”27.55″，今日开盘价；
'2：”27.25″，昨日收盘价；
'3：”26.91″，当前价格；
'4：”27.55″，今日最高价；
'5：”26.20″，今日最低价；
'6：”26.91″，竞买价，即“买一”报价；
'7：”26.92″，竞卖价，即“卖一”报价；
'8：”22114263″，成交的股票数，由于股票交易以一百股为基本单位，所以在使用时，通常把该值除以一百；
'9：”589824680″，成交金额，单位为“元”，为了一目了然，通常以“万元”为成交金额的单位，所以通常把该值除以一万；
'10：”4695″，“买一”申请4695股，即47手；
'11：”26.91″，“买一”报价；
'12：”57590″，“买二”
'13：”26.90″，“买二”
'14：”14700″，“买三”
'15：”26.89″，“买三”
'16：”14300″，“买四”
'17：”26.88″，“买四”
'18：”15100″，“买五”
'19：”26.87″，“买五”
'20：”3100″，“卖一”申报3100股，即31手；
'21：”26.92″，“卖一”报价
'(22, 23), (24, 25), (26,27), (28, 29)分别为“卖二”至“卖四的情况”
'30：”2008-01-11″，日期；
'31：”15:05:32″，时间；
Function getFundData(ByRef StockCode As String)
Url = "http://hq.sinajs.cn/list=" + StockCode
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "")
strData = Replace(strData, Chr(10), "")

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

getFundData = Split(strData, ",")

End Function

Function getStockPrice2(ByRef StockCode As String)
Application.Volatile
getStockPrice = 0
End Function
Function getStockPrice(ByRef StockCode As String)
Application.Volatile                            '定义为易失性函数(每次需要重新计算)
Url = "https://hq.sinajs.cn/list=" + StockCode
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "") '替换换行符
strData = Replace(strData, Chr(10), "") '替换回车符

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")  'note定义了一个正则表达式，去除http返回的前面一堆乱七八糟的头
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

StockData = Split(strData, ",")                    '将strData通过Split函数分开,split函数返回一个包含各种数据的数组
getStockPrice = Val(StockData(3))                   '将strData(3)改变为数值类型输出

End Function

Function getLastDayStockPrice(ByRef StockCode As String)
Application.Volatile                            '定义为易失性函数(每次需要重新计算)
Url = "https://hq.sinajs.cn/list=" + StockCode
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "") '替换换行符
strData = Replace(strData, Chr(10), "") '替换回车符

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")  'note定义了一个正则表达式，去除http返回的前面一堆乱七八糟的头
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

StockData = Split(strData, ",")                    '将strData通过Split函数分开,split函数返回一个包含各种数据的数组
getLastDayStockPrice = Val(StockData(2))                   '将strData(2)改变为数值类型输出

End Function
Function getHKStockPrice(ByRef StockCode As String)
Application.Volatile                            '定义为易失性函数(每次需要重新计算)

'HK Stock Sina Http
'http://hq.sinajs.cn/list=hk00001
''var hq_str_hk00001="CHEUNG KONG,长和,90.300,91.050,91.050,90.000,90.750,-0.300,-0.329,90.650,90.750,627798876,6932826,2.954,2.810,118.800,87.600,2016/06/22,16:01";
'temp[0]------CHEUNG KONG------名称
'temp [1] - -----长和 - -----股票名称
'temp [2] - -----90.3 - -----今日开盘价
'temp [3] - -----91.05 - -----昨日收盘价
'temp [4] - -----91.05 - -----最高价
'temp [5] - -----90# - -----最低价
'temp [6] - -----90.75 - -----当前价(现价)
'temp [7] - ------0.3 - -----涨跌
'temp [8] - ------0.329 - -----涨幅
'temp [9] - -----90.65 - -----买一
'temp [10] - -----90.75 - -----卖一
'temp [11] - -----627798876 - -----成交额
'temp [12] - -----6932826 - -----成交量
'temp [13] - -----2.954 - -----市盈率
'temp[14]------2.810------周息率（2.810%）
'temp[15]------118.800------52周最高
'temp[16]------87.600------52周最低
'temp [17] - -----2016 / 6 / 22 - -----日期
'temp[18]------16:01------时间


Url = "https://hq.sinajs.cn/list=" + StockCode
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "") '替换换行符
strData = Replace(strData, Chr(10), "") '替换回车符

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")  'note定义了一个正则表达式，去除http返回的前面一堆乱七八糟的头
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

StockData = Split(strData, ",")                    '将strData通过Split函数分开,split函数返回一个包含各种数据的数组
getHKStockPrice = Val(StockData(6))                   '将strData(6)改变为数值类型输出

End Function
Function getLastDayHKStockPrice(ByRef StockCode As String)
Application.Volatile                            '定义为易失性函数(每次需要重新计算)

'HK Stock Sina Http
'http://hq.sinajs.cn/list=hk00001
''var hq_str_hk00001="CHEUNG KONG,长和,90.300,91.050,91.050,90.000,90.750,-0.300,-0.329,90.650,90.750,627798876,6932826,2.954,2.810,118.800,87.600,2016/06/22,16:01";
'temp[0]------CHEUNG KONG------名称
'temp [1] - -----长和 - -----股票名称
'temp [2] - -----90.3 - -----今日开盘价
'temp [3] - -----91.05 - -----昨日收盘价
'temp [4] - -----91.05 - -----最高价
'temp [5] - -----90# - -----最低价
'temp [6] - -----90.75 - -----当前价(现价)
'temp [7] - ------0.3 - -----涨跌
'temp [8] - ------0.329 - -----涨幅
'temp [9] - -----90.65 - -----买一
'temp [10] - -----90.75 - -----卖一
'temp [11] - -----627798876 - -----成交额
'temp [12] - -----6932826 - -----成交量
'temp [13] - -----2.954 - -----市盈率
'temp[14]------2.810------周息率（2.810%）
'temp[15]------118.800------52周最高
'temp[16]------87.600------52周最低
'temp [17] - -----2016 / 6 / 22 - -----日期
'temp[18]------16:01------时间


Url = "https://hq.sinajs.cn/list=" + StockCode
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "") '替换换行符
strData = Replace(strData, Chr(10), "") '替换回车符

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")  'note定义了一个正则表达式，去除http返回的前面一堆乱七八糟的头
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

StockData = Split(strData, ",")                    '将strData通过Split函数分开,split函数返回一个包含各种数据的数组
getLastDayHKStockPrice = Val(StockData(3))                   '将strData(3)改变为数值类型输出

End Function
Function getStockDate()
Application.Volatile
Url = "https://hq.sinajs.cn/list=sz399001"
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "")
strData = Replace(strData, Chr(10), "")

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

StockData = Split(strData, ",")
getStockDate = StockData(30) + " " + StockData(31)

End Function


Function getStockData(ByRef StockCode As String)
Url = "http://hq.sinajs.cn/list=" + StockCode
strData = GetHttp(Url)
strData = Replace(strData, Chr(13), "")
strData = Replace(strData, Chr(10), "")

Set objREGEXP = CreateObject("VBSCRIPT.REGEXP")
With objREGEXP
.Global = True
.Pattern = "var hq_str_.*=\"""
strData = .Replace(strData, "")
.Pattern = "\"";"
strData = .Replace(strData, "")

End With
Set objREGEXP = Nothing

getStockData = Split(strData, ",")

End Function

Function GetHttp(Url)
Dim objXML
On Error Resume Next
Set objXML = CreateObject("Microsoft.XMLHTTP")
With objXML
.Open "Get", Url, False, "", ""
.Send
GetHttp = .ResponseBody
End With
GetHttp = BytesToBstr(GetHttp, "GB2312")
Set objXML = Nothing
On Error GoTo 0
End Function

Function BytesToBstr(strBody, CodeBase)
Dim objStream
Set objStream = CreateObject("Adodb.Stream")

With objStream
.Type = 1
.Mode = 3
.Open
.Write strBody
.Position = 0
.Type = 2
.Charset = CodeBase
BytesToBstr = .ReadText
End With
objStream.Close
Set objStream = Nothing
End Function


