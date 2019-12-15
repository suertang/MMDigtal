Attribute VB_Name = "模块2"

Sub mycalc()
Attribute mycalc.VB_Description = "宏由 L.Wang 录制，时间: 2017-7-11"
Attribute mycalc.VB_ProcData.VB_Invoke_Func = " \n14"
'
' delete2triggle Macro
' 时间: 2017-7-11
'

'
If (Sheet1.ToggleButton1.Value) Then
    Dim NewTime
    NewTime = Now + TimeValue("00:00:10")                       '第一次手工执行，后面30s定时执行 刷新，测试ok by
    Sheet1.[a5] = "Getting data..."
    geturl
    DoEvents
    Sheet1.[a5] = ""
    Application.OnTime NewTime, "mycalc"
End If
End Sub
