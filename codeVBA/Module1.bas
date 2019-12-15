Attribute VB_Name = "Module1"

#If VBA7 Then
    Public Declare PtrSafe Function MessageBoxU Lib "user32" Alias "MessageBoxW" _
                                    (ByVal hwnd As LongPtr, _
                                     ByVal lpText As LongPtr, _
                                     ByVal lpCaption As LongPtr, _
                                     ByVal wType As Long) As Long
#Else
    Public Declare Function MessageBoxU Lib "user32" Alias "MessageBoxW" _
                            (ByVal hwnd As Long, _
                             ByVal lpText As Long, _
                             ByVal lpCaption As Long, _
                             ByVal wType As Long) As Long
#End If
Sub Button2_Click()
Sheet1.[a5] = "Fetching data..."
Sheet1.Calculate
Sheet1.[a5] = "done..."
DoEvents
Sheet1.[a5] = ""
ActiveWindow.Caption = "Hello My World"
End Sub


Sub geturl()
Dim startline
startline = 6
Dim codes
codes = ""
Set codeRng = Sheet1.[B6]
While codeRng.Value <> ""
    codes = codes & codeRng.Value & ","
    Set codeRng = codeRng.Offset(1, 0)
Wend
codelen = Len(codes)
codes = Mid(codes, 1, codelen - 1)
Url = "http://hq.sinajs.cn/list=" & codes
'Debug.Print codes
'Exit Sub
s = GetHttp(Url)
's = Replace(strData, Chr(13), "")
's = Replace(strData, Chr(10), "")
'
zqlist = Split(s, ";" & vbLf)
'Debug.Print zqlist(0)
For Each zq In zqlist
    If (zq <> "") Then
        stockString = Split(zq, """")(1)
        fillLine stockString, startline
        startline = startline + 1
    End If
Next
'stockString = Split(zqlist(0), """")(1)
'fillLine Split(zqlist(0), """")(1), 7
'Debug.Print stockString
Exit Sub
stName = Mid(s, 22, 4)
stData = Split(Mid(s, 26), ",")
Sheet1.[a7] = stName
Sheet1.[b7] = stData(3)
Sheet1.[c7] = stData(2)
Sheet1.[f7] = stData(31)
'Sheet1.[d10] = stData(3)
Rem var hq_str_sz002100="天康生物,9.790,9.770,9.780,9.830,9.660,9.770,9.780,15883000,154882442.780,75900,9.770,22100,9.760,27400,9.750,17900,9.740,9800,9.730,61000,9.780,182347,9.790,152112,9.800,163600,9.810,238900,9.820,2019-09-09,11:30:00,00";
'Dim s As String
's = "天康生物,9.790,9.770,9.780,9.830,9.660,9.770,9.780,15883000,154882442.780,75900,9.770,22100,9.760,27400,9.750,17900,9.740,9800,9.730,61000,9.780,182347,9.790,152112,9.800,163600,9.810,238900,9.820,2019-09-09,11:30:00,00"
'MessageBoxU 0, StrPtr(s), StrPtr("test"), 0
'Sheet1.[a10] = s
End Sub
Sub fillLine(stockString, line)
Dim idx(5) As Integer
idx(0) = 0
idx(1) = 3
idx(2) = 2
idx(3) = 31
idx(4) = 4
idx(5) = 5
s = Split(stockString, ",")
Set startCell = Sheet1.Range("C" & line)
For i = 0 To 5
    startCell.Offset(0, i) = s(idx(i))
Next
End Sub
