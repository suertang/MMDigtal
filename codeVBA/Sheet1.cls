VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Sheet1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Private Sub ToggleButton1_Change()
If Me.ToggleButton1.Value Then
    Dim NewTime
    NewTime = Now + TimeValue("00:00:10")                       '第一次手工执行，后面30s定时执行 刷新，测试ok by
    Sheet1.[a1] = "Getting data..."
    geturl
    DoEvents
    Sheet1.[a1] = ""
    
        Application.OnTime NewTime, "mycalc"
    With Me.ToggleButton1
        .BackColor = vbBlue
        .ForeColor = vbWhite
    End With
    
Else
    With Me.ToggleButton1
        .BackColor = &H8000000F
        .ForeColor = &H80000012
    End With
End If

End Sub

Private Sub ToggleButton1_Click()

End Sub
