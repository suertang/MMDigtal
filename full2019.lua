
--Version 20190127
init(1)
setScreenScale(true, 720, 1280)--缩放
require "TSLib"--使用本函数库必须在脚本开头引用并将文件放到设备 lua 目录下
require 'sz' --设置

function fly()
	mSleep(800)
	cfg_fly=true;
	routing=false
	local i
	if not isAutoFight() and isColor(476,206,0x63413a,85) and isColor(492,206,0x735d4a,85) and isColor(492,209,0x4a3531,85) then
				--toast("Fly")
				tap(489,195)
				mSleep(2000)
	end

end

function isAccept()
	local x
	local y
	local i
	--x,y = findMultiColorInRegionFuzzy( 0xeec28c, "-9|19|0xdeb27b,21|17|0xdea263", 90, 827, 289, 967, 462)	
	if isColor(957,431,0x847973,85) and isColor(965,429,0x6b6552,85) and isColor(901,432,0xeec68c,85) then
		toast(" 日常任务接受")		
		tap(896,435)
		mSleep(2000)
		return true
	elseif isColor(834,390,0x9c968c,85) and isColor(899,394,0xeec68c,85) and isColor(942,394,0xeec28c,85) and isColor(927,402,0xeec28c,85) then
		toast("商人")
		tap(895,390)
		mSleep(2000)
		return true
	elseif isColor(188,527,0xe6ba8c,85) and isColor(190,531,0x633521,85) and isColor(208,537,0xeebe94,85) then
	--除魔任务
	
		if isColor(384,431,0x3a2d21,85) and isColor(325,469,0x312819,85) and isColor(403,465,0x312819,85) then --任务没有结束
			tap(1029,538) --点击接受任务
			mSleep(2000)
		else --任务已经完成
			tap(1149,28)
			mSleep(2000) --点击关闭 
			if isColor(1138,26,0x942829,85) and isColor(1148,28,0xe6dbc5,85) and isColor(1157,28,0x842421,85) then
				tap(1150,29)--关闭活动日历
				mSleep(1500)
			end
		end
	
		return true
	
	elseif (isColor(348,391,0x10df08,85) and isColor(351,391,0x08c608,85) and isColor(355,391,0x00f700,85) and isColor(359,390,0x08e708,85)) or (isColor(348,353,0x08df08,85) and isColor(355,354,0x00fb00,85) and isColor(382,361,0x08fb08,85)) then
		if isColor(348,353,0x08df08,85) and isColor(355,354,0x00fb00,85) and isColor(382,361,0x08fb08,85) then
			--药店购买
			tap(368,358)
			mSleep(2000)
		else
			--首饰店或者武器店购买
			
			tap(370,386)
			mSleep(2000) --如果不是
		end
		if isColor(887,517,0xeeebe6,85) and isColor(900,526,0xeeefee,85) and isColor(904,526,0x6b4d3a,85) and isColor(917,523,0xe6e7e6,85) then
			tap(1034,631)  --找到跳过引导，点击购买
			mSleep(1500)
			tap(1034,631) --再次点击购买
			mSleep(1500)
			
			tap(537,466)  --确认购买
			mSleep(2000)
			tap(1152,30) --关闭
			mSleep(3000)
			
			isBuy=true
		else
			tap(1152,30) --没有跳过引导，关闭，等待再次点击购买
			--mSleep(3000)
			
		end
		return true
	elseif isColor(436,315,0xded2c5,85) and isColor(436,326,0xcec2ad,85) and isColor(436,334,0xc5bead,85) and isColor(613,472,0x632400,85) and isColor(615,477,0xeec684,85) then
		--在线时间超过3小时
		tap(634,466)
		mSleep(3000)
		return true
	else	
		return false
	end
end

function isFinish()
	local x
	local y
	--mSleep(3000)
	if isColor(610,557,0xdeb284,85) and isColor(612,557,0x7b3d19,85) and isColor(640,556,0xb58a5a,85) and isColor(640,561,0xcea67b,85) then
		--btnFin={648,563}--仰望
		tap(648,563)
		mSleep(2000)
		tap(1086,148)
		mSleep(2000)
		return true
	elseif isColor(672,553,0x73655a,85) and isColor(689,553,0xeec694,85) and isColor(693,554,0xd5ae7b,85) and isColor(694,561,0xe6ba8c,85) then
		tap(730,557) --新版仰望
		mSleep(800)
		tap(1086,148)
		mSleep(1000)
		return true
	elseif isColor(352,394,0xe6d2a4,85) and isColor(447,393,0x6bba19,85) and isColor(539,402,0xefca5a,85) then
		tap(907,390)
		return true
	elseif isColor(833,390,0x6b655a,85) and isColor(846,391,0xd6ae7b,85) and isColor(905,396,0xe6c28c,85) and isColor(933,397,0xe6be83,85) then
		--btnFin={898,386}--商人
		tap(898,386)
		mSleep(2000)
		return true
	elseif isColor(850,396,0xa47d52,85) and isColor(902,399,0xc59663,85) and isColor(932,377,0x8c693a,85) and isColor(940,398,0xdeba84,85) then
		--btnFin={892,392}
		tap(892,392)
		mSleep(2000)
		return true
	elseif isColor(888,396,0x42393a,85) and isColor(904,432,0xe6be83,85) and isColor(913,439,0xce924a,85) and isColor(942,437,0xe6ba84,85) then
		tap(890,432)
		mSleep(2000)
		--btnFin={890,432}
		return true
	elseif isColor(188,527,0xe6ba8c,85) and isColor(190,531,0x633521,85) and isColor(208,537,0xeebe94,85) then
	--除魔任务
	
		if isColor(384,431,0x3a2d21,85) and isColor(325,469,0x312819,85) and isColor(403,465,0x312819,85) then --任务没有结束
			tap(1029,538) --点击接受任务
			mSleep(2000)
		else --任务已经完成
			tap(1149,28)
			mSleep(2000) --点击关闭 
			if isColor(1138,26,0x942829,85) and isColor(1148,28,0xe6dbc5,85) and isColor(1157,28,0x842421,85) then
				tap(1150,29)--关闭活动日历
				mSleep(1500)
			end
		end
	
		return true
	elseif isColor(337,379,0x211c19,85) and isColor(337,395,0xf7ebb5,85) and isColor(353,413,0xe6dbad,85) then
		tap(898,390) --行会任务完成奖励领取
		mSleep(2000)
		return true
	else
		return false
	end
end

function isDead()
	if isColor(710,423,0xb58e6b,85) and isColor(728,425,0xeec294,85) and isColor(768,431,0xa5714a,85) and isColor(794,426,0xc59e73,85) then
		tap(763,426)
		mSleep(5000)
		return true
	else
		return false
	end
end

function isShowTitle()
	if isColor(443,470,0xd6b27b,85) and isColor(448,469,0x521c00,85) and isColor(472,467,0xeec68c,85) and isColor(492,470,0xcea26b,85) then
		tap(487,464)
		mSleep(2000)
		return true
	else
		return false
	end

end


function isAutoFight()
	cls()
	closeToolbar()
	-- 自动战斗状态有蓝色动画，不利于取色
	if isColor(1221,347,0xd6965a,85) and isColor(1222,361,0xad9e63,85) and isColor(1208,366,0x837142,85) then
		--toast("非自动战斗中")
		return true
	else
		--toast("非战斗状态")
		return false
	end
end
---test autofight
function autofight()
	local r
	local x
	local y
	
	if(not isAutoFight()) then
		--r,x,y=isAutoFight()
		toast("点击自动战斗")
		mSleep(300)
		tap(1197,343)
		mSleep(2000)
	end
end

function stopFight()
	ClsWindows()
	cls()
	closeToolbar()
	if isAutoFight() then
		tap(1197,343)
		mSleep(2000)
	end
	
end



--autofight()
function ClsWindows()
	if nil then  --永远不要试图执行此函数 ，有不可预知的风险
		--mSleep(2000)
		local x
		local y
		if isColor(692,560,0xad855a,85) and isColor(705,559,0x9c6942,85) and isColor(718,565,0xb58a5a,85) and isColor(735,558,0xdeb684,85) then
			tap(1090,148)
			mSleep(3000)
		elseif isColor(560,319,0x3a3131,85) and isColor(554,354,0xc59242,85) and isColor(549,354,0x292421,85) and isColor(555,377,0x3a3531,85) and isColor(540,380,0x42414a,85) then
			tap(555,365) --关闭聊天
			mSleep(2000)
		end
		x,y = findMultiColorInRegionFuzzy( 0x7b2429, "5|0|0xd6cab5,12|0|0x842829", 90, 640, 0, 640, 360)
		while(x~=-1) do
			--keepScreen(true)
			toast("关闭无关窗口")
			tap(x,y)
			--keepScreen(false)
			mSleep(3000)
			--closewindow()
			x,y = findMultiColorInRegionFuzzy( 0x7b2429, "5|0|0xd6cab5,12|0|0x842829", 90, 640, 0, 640, 360)
		end
	end
end

function stop()
	stopFight()
	if(not isStop()) then
		tap(795,310)
	end
	cls()
end

function cls() --Clear screen
	--立即领取
	local ret=true
	isTransfer()
	actTaskbar()
	closeToolbar()
	if isColor(990,395,0x832429,85) and isColor(997,395,0xdeba94,85) and isColor(1004,395,0x732021,85) then
		toast("关闭立即领取",1)
		tap(999,393)
		mSleep(1000)
		--[[
		tap(913,557)
		toast("立即领取",1)
		mSleep(1500)
		tap(1078,235)
		mSleep(2000)
		if isColor(530,172,0xffd221,85) and isColor(600,169,0xffdb19,85) and isColor(657,182,0xffce3a,85) and isColor(729,191,0xeea619,85) and isColor(534,491,0x5a71b5,85) then
		toast("点击任意位置关闭 ",1)
		tap(1078,235)
		mSleep(2000)
		end
		--]]
	elseif isColor(530,172,0xffd221,85) and isColor(600,169,0xffdb19,85) and isColor(657,182,0xffce3a,85) and isColor(729,191,0xeea619,85) and isColor(534,491,0x5a71b5,85) then
		toast("点击任意位置关闭 ",1)
		tap(1078,235)
		mSleep(1000)
	elseif isColor(569,524,0x313131,85) and isColor(600,510,0xeec694,85) and isColor(621,511,0xe6be8c,85) and isColor(624,513,0x6b3108,85) then
		tap(647,505)
		toast("免费领取",1)
		mSleep(2000)
		if isColor(530,172,0xffd221,85) and isColor(600,169,0xffdb19,85) and isColor(657,182,0xffce3a,85) and isColor(729,191,0xeea619,85) and isColor(534,491,0x5a71b5,85) then
		tap(1078,235)
		mSleep(1000)
		end
	--elseif isColor(620,234,0xe6c294,85) and isColor(632,233,0xe6c294,85) and isColor(437,322,0xc5b6a4,85) and isColor(435,322,0xded2bd,85) then
	--	toast("取消龙源血路")
	--	tap(740,468)
	elseif isColor(678,458,0x423529,85) and isColor(712,470,0xd6aa73,85) and isColor(730,474,0xa47542,85) and isColor(765,461,0xeec284,85) then
		toast("取消进入")
		tap(740,468)
	elseif isColor(731,466,0xada69c,85) and isColor(746,464,0xefc68c,85) and isColor(764,469,0x632008,85) and isColor(778,468,0xd6aa73,85) and isColor(797,461,0xe6c284,85) and isColor(787,414,0x312d29,85) then
		toast("暂不显示")
		tap(794,465)
	elseif isColor(562,31,0xb59229,85) and isColor(583,34,0xb58a29,85) and isColor(649,38,0x9c6921,85) and isColor(658,38,0x292421,85) then
		toast("跳过剧情")
		tap(649,43)
		mSleep(2000)
	elseif isColor(453,360,0xded2bd,85) and isColor(453,367,0xd6cebd,85) and isColor(453,374,0x3a3129,85) and isColor(610,470,0xd6ae73,85) then
		toast("超3小时",1)
		tap(651,473)
		mSleep(2000)
	elseif isColor(565,39,0xce8e29,85) and isColor(580,40,0xc58521,85) and isColor(621,35,0x6b4d19,85) and isColor(622,32,0xf7d229,85) then
		toast("跳过引导",1)
		tap(631,33)
		mSleep(2000)
	elseif isColor(1092,39,0xdebe73,85) and isColor(1097,39,0x8c5921,85) and isColor(1100,39,0x3a2829,85) then
		toast('展开')
		tap(1099,33)
		mSleep(2000)
	elseif isColor(631,556,0x421810,85) and isColor(678,550,0x6b5d31,85) and isColor(721,556,0xd6b27b,85) and isColor(751,561,0x6b5d3a,85) then
		toast('充值')
		tap(1085,116)
		mSleep(2000)
	elseif isColor(444,430,0xeec694,85) and isColor(448,432,0x423d31,85) and isColor(466,431,0xe6be8c,85) and isColor(478,431,0x736152,85) then
		toast('夺宝')
		tap(1107,104)
		mSleep(2000)
	elseif isColor(560,319,0x3a3131,85) and isColor(554,354,0xc59242,85) and isColor(549,354,0x292421,85) and isColor(555,377,0x3a3531,85) and isColor(540,380,0x42414a,85) then
		tap(555,365) --关闭聊天
		mSleep(2000)
	else
		ret=false
	end
	return ret
end


function isSignIn()
	return (isColor(403,377,0x5a4121,85) and isColor(782,436,0x94855a,85) and isColor(827,589,0x5a4521,85) and isColor(401,577,0x735d3a,85))
end


--更换角色以后
function s()
	
	function notToday()
		return isColor(740,453,0x94855a,85) and isColor(641,521,0x94855a,85) and isColor(870,555,0x6b4d29,85) 
	end
	
	cls()
	if isColor(313,482,0xb52431,85) and isColor(407,513,0xbd283a,85) and isColor(488,435,0xde9a84,85) and isColor(240,463,0xd6b284,85) then
		toast("我和祖国",1)
		mSleep(2300)
		tap(1110,101)
		mSleep(3000)
	end
	
	
	if isColor(425,631,0xe6c294,85) and isColor(429,640,0x635542,85) and isColor(469,641,0xd6b684,85) and isColor(473,629,0x9c815a,85) then
		mSleep(2000)
		---[[
		if isColor(949,659,0xce965a,85) and isColor(967,659,0x844119,85) and isColor(1027,656,0xdea663,85) and isColor(1041,664,0x633110,85) then
			toast("微信特权签到",1)
			tap(1003,649)--微信特权签到
			
		elseif isColor(425,631,0xe6c294,85) and isColor(429,640,0x635542,85) and isColor(469,641,0xd6b684,85) and isColor(473,629,0x9c815a,85) then
			--toast("普通签到",1)
			local currDay = tonumber(os.date("%d"))
			--toast("今天是第"..os.date("%d").."天",1)
			if( currDay==31 ) then
				tap(469,391) --31号比较特殊，最后一行独立
			else
				local i = math.fmod(currDay-1,5)
				tap(500+140*i,299) --日期对5取模
			end
				--0，1，2，3，4
				--5，6
			i = math.floor(currDay/5)
			if(i>0) then
				if(i>5) then i=5 end
				local j=1
				while( j<=i ) 
				do
					--mSleep(2000)
					tap(597+113*(j-1),575)
					--toast(tostring(597+113*(i-1))..",575",1)
					mSleep(2000)
					if(notToday()) then
						--mSleep(1000)
						tap(932,359) --点击窗口外
						--toast("click outside window")
						break
					end
					j = j+1
				end
			end
			
		end
		--]]
		
		toast("关闭签到",1)
		
		tap(1102,81) --关闭
		mSleep(3000)
		--if isColor(644,63,0x292d29,85) and isColor(728,65,0xe6c294,85) and isColor(772,69,0x424142,85) and isColor(770,74,0xefc694,85) then
		--还是在签到界面
		--签到失败
		--tap(1102,81) --关闭
		--mSleep(2000)
		--end
		
	
	
	--mSleep(3000)
	--tap(1099,84) --关闭界面
	--mSleep(2000)
	end
	cls()
	mSleep(2000)
	if isColor(580,507,0xa49a94,85) and isColor(599,508,0xb5855a,85) and isColor(622,510,0xdeb684,85) and isColor(648,512,0x6b3910,85) and isColor(656,528,0x292421,85) then
		
		tap(638,513) --免费领取
		mSleep(3000)
		cls()
		if isColor(566,434,0x6b85a4,85) and isColor(566,438,0x6b8aad,85) and isColor(572,438,0x738eb5,85) and isColor(575,438,0x423542,85) then
		--分解成功
			tap(972,377)
			--mSleep(3000)
			--toast("ready")
		return
		end
		--------------
		--tap(978,334)
		--mSleep(1000)
	end

	cls()
	mSleep(3000)
	if isColor(1126,94,0x7b2421,85) and isColor(1134,94,0xc5aa84,85) and isColor(1145,94,0x7b2421,85) then
		tap(1129,97)--关闭活动
		mSleep(2000)
	end
	
	cls()
	mSleep(3000)
	if isColor(577,431,0x7392bd,85) and isColor(595,431,0x7392b5,85) and isColor(624,432,0x6b819c,85) and isColor(641,439,0x423542,85) then
	--分解成功
	tap(1061,311)
	--mSleep(3000)
	--toast("ready")
	end
end



function slideupdown(startx,starty,endy,loopcnt,callback)
	function isSubTask()
		--[[任务栏是否出现支线任务]]
		local x,y
		x,y = findMultiColorInRegionFuzzy( 0x29aa63, "-7|6|0x31aa6b,7|6|0x31aa6b,1|14|0x31b26b", 90, 2, 182, 170, 381)
		if(x~=-1) then
			return true
		else
			return false
		end
		
	end
	
	if not isStop() then
		stop()
		--back2biqi()
	end
	
	local offset
	offset=starty-endy
	---- [[if offset is nagtive]]
	----  start 360 end 200  offset=160
	local i
	local j
	for i=1,loopcnt do
		cls()
		isFinish()
		touchDown( startx, starty)
		for j=0,offset,10 do
			touchMove( startx, starty-j)
			mSleep(80)
		end
		touchMove(startx,endy)
		mSleep(10)
		touchUp(startx, endy)
		mSleep(2000)
		
		if callback then
			mSleep(1000)
			cls()
			
			if(callback()) then
				return true --找到对应任务，开始执行
			elseif isSubTask() then
				return -1 --没有找到对应任务，并且找到支线任务，结束寻找
			end
			
		end
	end	
	return -1
end
function slideright(startx,starty,endx)
	
	local offset
	offset=startx-endx
	
	local i
	local j
	--for i=1,loopcnt do
	cls()
	isFinish()
	touchDown( startx, starty)
	for j=0,offset,10 do
		touchMove( startx-j, starty)
		mSleep(80)
	end
	touchMove(endx,starty)
	mSleep(10)
	touchUp(endx,starty)
	mSleep(1000)
	--end	
	return 
end
function openToolbar()
	if not (isColor(986,651,0x42393a,85) and isColor(1009,651,0x5a4121,85) and isColor(1037,658,0xb58e4a,85)) then
	tap(642,655)
	mSleep(2000)
	end
end
function closeToolbar()
	--if (isColor(1000,639,0xbd9e52,85) and isColor(1017,639,0x524942,85) and isColor(1031,639,0x8c8a5a,85)) then
	if isColor(719,628,0x4a3d31,85) and isColor(724,650,0xceae52,85) and isColor(724,689,0xc5a683,85) then
	tap(642,655)
	mSleep(2000)
	end
end
function openEquipment()
	openToolbar()
	tap(533,663)--点击装备
	mSleep(2000)
end

function scrap()
	--分解装备
	cls()
	--ClsWindows()
	--mSleep(2000)
	openEquipment()
	tap(228,504)--点击分解
	mSleep(2000)
	cls()
	tap(890,536)--点击批量分解
	mSleep(1000)
	--先分解一次白色
	cls()
	if not(isColor(597,109,0xad8e29,85) and isColor(594,112,0xe6d75a,85) and isColor(595,111,0xe6ca73,85)) then
		--白色未勾选
		cls()
		tap(567,147) -- 勾选白色装备
		mSleep(1000)	
	end
	
	--取消其他分解选项
	
	if not(isColor(561,189,0xefba31,85) and isColor(569,197,0xef6900,85) and isColor(575,191,0xe67500,85)) then
		--蓝色未勾选
		tap(566,199)--去除蓝色已勾选
		mSleep(1000)
	end
	
	if isColor(559,243,0xf7c663,85) and isColor(568,253,0xe66900,85) and isColor(575,247,0xde7100,85) then
		--紫色已经勾选
		tap(566,250)--去除紫色已勾选
		mSleep(1000)
	end
	
	if isColor(563,304,0xde7500,85) and isColor(573,304,0xde7100,85) and isColor(569,310,0xe66900,85) then
		--橙色已经勾选
		tap(566,301)--去除橙色已勾选
		mSleep(1000)
	end
	
	if isColor(560,357,0xefd26b,85) and isColor(568,367,0xe66d00,85) and isColor(575,362,0xde6d00,85) then
		--绿色已经勾选
		tap(566,350)--去除绿色已勾选
		mSleep(1000)
	end
	
	if isColor(560,431,0xde9e19,85) and isColor(568,440,0xef6d00,85) and isColor(581,429,0xef9e08,85) then
		--符石
		tap(566,438) --去除
		mSleep(1000)
	end
	
	tap(640,521) --确定分解
	mSleep(800)
	
	tap(539,465) --点击确定
	mSleep(2000)
	
	---白色分解成功
	tap(1035,310)--点击窗口外
	

	mSleep(2000)
	tap(1152,27) --关闭
	cls()
	toast("分解完成",1)
	mSleep(2000)
	--ScrapWhite()
	--ScrapWhiteBlue()
	
end

function isStop()
	
	--取色列表
	local col={}
	local col2={}
	local h={
	{1209,57},
	{1209,61},
	{1228,61},
	{1240,61},
	{1258,61},
	}
	for k,v in ipairs(h) do
	    col[k]=getColor(table.unpack(v))
	end
	mSleep(1000)
	for k,v in ipairs(h) do
	    col2[k]=getColor(table.unpack(v))
	end
	
	for k,v in ipairs(col) do
		if(v~=col2[k]) then
			return false			
		end
	end
	return true
	
end


function isPK() --等死
	cls()
	if not (isColor(143,711,0x7b2019,85) and isColor(176,711,0x731810,85) and isColor(1092,710,0x7b1c19,85) and isColor(1263,13,0x842019,85)) then
		return true
	else
		return false
	end
	
end


function actTaskbar()
	
	if isColor(33,158,0xad9a7b,85) and isColor(46,161,0x9c8a6b,85) and isColor(78,158,0xa49673,85) then
		tap(53,156)
		mSleep(1000)
	end
	
end



function ClearButtons()

	return true
end



function back2normal()
	ClearButtons()
	cls()
	ClsWindows()
	actTaskbar()
end

function autoStartGame()
	--如果游戏没有启动，则启动游戏
	--如果当日任务已经完成，则关闭游戏，关闭手机
	--如果游戏崩溃，则重启游戏
	function isCrash()
		--游戏卡死，人物在一分钟之内没有移动则表示游戏卡死
		
		--保存游戏上下文环境(context)
		--重启游戏
		--重新载入上下文环境(context)
		return false
	end
	function isGameRunning()
		if(isFrontApp()==1) then
			return true
		else
			return false
		end
	end
	function wakeupPhone()
		--唤醒手机
		--解锁手机
		--启动游戏
	end
	function loadGame()
	end
	
	
end --end autoStartGame

function entergame()
	
	if multiColor({
	{  617,  164, 0xe6c294},
	{  631,  164, 0xeec694},
	{  618,  176, 0xe6c294},
	{  630,  175, 0xeeca94},
	})==true then
	toast("公告")
	tap(642,487) --点击确定
	elseif isColor(617,163,0xd6b28c,85) and isColor(633,165,0xdeb694,85) and isColor(649,171,0xb59a84,85) and isColor(656,175,0xb59e7b,85) then
		tap(643,486)
		mSleep(5000)
		if isColor(794,523,0xc55110,85) and isColor(813,534,0x9c493a,85) and isColor(846,530,0xceae8c,85) and isColor(871,522,0xbd966b,85) then
			tap(851,527)
			mSleep(10000)
		end
		if isColor(596,184,0xe6c29c,85) and isColor(601,184,0x6b696b,85) and isColor(606,190,0xd6b694,85) and isColor(626,188,0xd6b694,85) then
		--挂机结束
		tap(642,508) --免费领取
		mSleep(2000)
		tap(1065,303)
		mSleep(2000) --点击屏幕外
	end
	
	
	
	end
	
end




function back2biqi(force,city)
	force = force or false
	city = city or "比奇"
	while not (isColor(113,56,0x7b5d29,85) and isColor(182,56,0x84653a,85) and isColor(173,54,0x846131,85)) do
		if (isColor(591,117,0xce9a31,85) and isColor(595,117,0xe6ae31,85) and isColor(583,129,0x634931,85) and isColor(620,45,0x312d31,85)) 
		or (isColor(835,28,0xefdfbd,85) and isColor(835,37,0xe6d2b5,85) and isColor(835,46,0x5a5142,85) and isColor(836,50,0x84756b,85)) then
			tap(1149,34)
			mSleep(1000)		
		end
		mSleep(2000)
		cls()
		mSleep(1500)
	end
	if not(isColor(1176,15,0xc5a27b,85) and isColor(1190,17,0xe6be94,85) and isColor(1208,28,0xbda27b,85) and isColor(1212,31,0xcea684,85)) or force==true then
		
		tap(1212,27)  --点开地图
		mSleep(2000)
		tap(1019,42)  --世界地图
		mSleep(2000)
		cls()
		--以下内容实为cls 替换
		--[[
		mSleep(1000)
		
		if isColor(862,557,0x4a1c08,85) and isColor(875,561,0xcea273,85) and isColor(895,554,0x9d6132,85) and isColor(919,553,0xce9e6b,85) then
		tap(913,557)
		toast("立即领取",1)
		mSleep(1500)
		tap(1078,235)
		mSleep(2000)
			if isColor(530,172,0xffd221,85) and isColor(600,169,0xffdb19,85) and isColor(657,182,0xffce3a,85) and isColor(729,191,0xeea619,85) and isColor(534,491,0x5a71b5,85) then
			toast("点击任意位置关闭 ",1)
			tap(1078,235)
			mSleep(1000)
			end
		end
		--]]
		if(city == "比奇") then
			tap(860,468)  --比奇
		elseif(city == "白日门") then
			tap(624,481)  --白日门
		end
		--cls()
		mSleep(1000)
		tap(548,462)  --确认
		mSleep(4500)
	end
	
	
end

function MengZhong()

	if not(isColor(1174,16,0xc5a67b,85) and isColor(1183,17,0x73654a,85) and isColor(1183,25,0xd6b684,85)) then
		
		tap(1212,27)  --点开地图
		mSleep(2000)
		tap(1019,42)  --世界地图
		mSleep(1000)
		
		if isColor(862,557,0x4a1c08,85) and isColor(875,561,0xcea273,85) and isColor(895,554,0x9d6132,85) and isColor(919,553,0xce9e6b,85) then
		tap(913,557)
		toast("立即领取",1)
		mSleep(1500)
		tap(1078,235)
		mSleep(2000)
			if isColor(530,172,0xffd221,85) and isColor(600,169,0xffdb19,85) and isColor(657,182,0xffce3a,85) and isColor(729,191,0xeea619,85) and isColor(534,491,0x5a71b5,85) then
			toast("点击任意位置关闭 ",1)
			tap(1078,235)
			mSleep(1000)
			end
		end
		tap(657,360)  --萌重
		--cls()
		mSleep(3000)
		tap(548,462)  --确认
		mSleep(4500)
	end
	
	
end




function findTask(callback)
	toast("Finding Task...")
	
	if isColor(1142,31,0x842429,85) and isColor(1149,31,0xd6cab5,85) and isColor(1156,31,0x842829,85) then
		tap(1147,34) --关闭其他按钮
		mSleep(2000)
	end
	if isColor(1145,31,0x631819,85) and isColor(1149,31,0xeed6bd,85) and isColor(1160,31,0x8c2829,85) then
		tap(1147,34) --关闭地图
		mSleep(2000)
	end
	back2biqi(true)
	--stop()
	
	
	mSleep(2000)
	
	--back2biqi()
	actTaskbar()
	local x
	local y	
	--stop()
	if(callback()) then
		return true
	end
	mSleep(1000)
	isFinish()
	slideupdown(110,200,360,3) --move to top
	
	if(callback()) then
		return true
	end
	mSleep(1000)
	isFinish()
	if (slideupdown(110,360,260,8,callback))~=-1 then
		toast("Found! ")
		return true
	else 		
		return false
	end	
end
function isEnterCopy()
	if isColor(351,356,0x08ef08,85) and isColor(362,354,0x00e700,85) and isColor(378,354,0x216e21,85) and isColor(410,360,0x08ce08,85) then		
		tap(397,356) --捉拿劫匪
		toast("进入副本")
		mSleep(2000)
		return true
	else
		return false
	end
end

function isInCopy()
	if isColor(18,161,0xf7f7d6,85) and isColor(29,164,0xc5aa8c,85) and isColor(24,177,0xc5a284,85) then
		while isColor(18,161,0xf7f7d6,85) and isColor(29,164,0xc5aa8c,85) and isColor(24,177,0xc5a284,85) do				
			toast("在副本内")
			autofight()
			mSleep(5000)
		end
		return true
	else
		return false
	end
end
function isTransfer()
	if isColor(398,354,0x00fb00,85) and isColor(411,356,0x08d608,85) and isColor(416,356,0x00ef00,85) then
		tap(429,359)
		mSleep(3000)
		return true
	elseif isColor(428,380,0x00ff00,85) and isColor(450,391,0x08f608,85) and isColor(474,395,0x19b210,85) then
		tap(423,391)
		mSleep(2000)
		return true
	elseif isColor(424,381,0x00fb00,85) and isColor(432,381,0x00e300,85) and isColor(432,398,0x00f700,85) then
		tap(430,395)
		mSleep(2000)
		return true
	elseif isColor(357,347,0x00f300,85) and isColor(357,354,0x393531,85) and isColor(357,356,0x08e308,85) and isColor(357,371,0x00ff00,85) then
		tap(391,361)
		mSleep(2000)
		return true
	elseif isColor(350,379,0x08eb08,85) and isColor(351,381,0x313531,85) and isColor(356,387,0x314d31,85) and isColor(355,387,0x00e600,85) then
		tap(378,393)
		mSleep(2000)
		return true
	else
		
		return false
	end
end

function isInStory()
	if isColor(1102,41,0xde9e21,85) and isColor(1126,40,0x211c19,85) and isColor(1128,47,0xde9a10,85) then
		toast("跳过剧情")
		tap(1180,31)
		mSleep(2000)
		return true
	else
		return false
	end
end



function doTask(taskName)
	toast(taskName.."开始",1)
	tbug=nil
	isBuy=false
	local callback=isTask(taskName)
	mSleep(2000)
	if findTask(callback) then

		local bl=true
		local s
		local x,y=pos[1],pos[2]
		local c=pos[3]--保存颜色
		mSleep(500)
		tap(x,y)
		--toast("tap,tap,tap")
		mSleep(2000)

		--back2normal()
		while true do			
			
				cls()
				
				fly()
				

				
				if isInCopy() then
					mSleep(1000)
					cls()
					--autofight()
					
					toast("copy")
				elseif isStop() and not isFinish() and not isAutoFight() then
					isAccept()
					
					isShowTitle()
					
					isDead()
					
					isEnterCopy()
					
					isTransfer()
					
					isInStory()
					if isBuy  then
						
						if not isStop() then
							while not isFinish() do
								mSleep(3000)
								fly()
							end
							isBuy=false
						else
							mSleep(3000)
							tap(pos[1],pos[2])
							mSleep(1000)
							fly()
						end
					else
					--cls()
						if not isInCopy() and not isAutoFight()  then
							cls()
							if not isColor(pos[1],pos[2],pos[3],90) then
									if(taskName=="日常任务") then
										return
									end
									toast("没有找到")
									if not findTask(callback) then
										return
									end
							else
								tap(pos[1],pos[2])
								mSleep(1500)
							end
						end
					end
				elseif isStop() and isFinish() then
						mSleep(2000)
						if isBuy  then
							
							if not isStop() then
								while not isFinish() do
									mSleep(3000)
									fly()
								end
								isBuy=false
							else
								if not isColor(pos[1],pos[2],pos[3],90) then
									if(taskName=="日常任务2") then
										return
									end
									toast("没有找到")
									if not findTask(callback) then
										return
									end
								else 
									tap(pos[1],pos[2])
									mSleep(1500)
									isBuy=false
								end
							end
						end
						if not isAccept() then
							cls()
							if not isColor(pos[1],pos[2],pos[3],90) then
									if(taskName=="日常任务2") then
										return
									end
									toast("没有找到")
									if not findTask(callback) then
										return
									end
							else 
								tap(pos[1],pos[2])
								mSleep(1500)
							end
						end
					toast('-----2-----')
				else
					cls()
					if isAutoFight() then
						if isStop() then
							if tbug==nil then
								tbug=os.time()
								mSleep(1000)
								tskcol={}
								local h={
									{1209,57},
									{1209,61},
									{1228,61},
									{1240,61},
									{1258,61},
								}
								
								for k,v in ipairs(h) do
									tskcol[k]=getColor(table.unpack(v))
								end
							elseif os.time()-tbug>60 then
								local h={
									{1209,57},
									{1209,61},
									{1228,61},
									{1240,61},
									{1258,61},
								}
								
								for k,v in ipairs(tskcol) do
									if v~=getColor(table.unpack(h[k])) then
											--已经运动了
											tbug=nil
									end
										
								end
								if tbug~=nil then							
									nobuggy()
									autofight()
									tbug=nil
								end
								
								
							end
							
							
						end
						
						tap(pos[1],pos[2])
						mSleep(3000)
						toast("----4-----")
					end
					
				end
			

		end
	else
		toast(taskName.."结束",1)
		return -1 --tasknotfind
	end

end



function isnoSpace()
	if isColor(462,207,0xcec6b5,85) and isColor(457,213,0xdecebd,85) and isColor(459,216,0x3a413a,85) then
		tap(912,153)
		mSleep(3000)
		scrap()
		return true
	else
		return false
	end
end

function isBonous()
	--mSleep(2000)
	ClsWindows()
	actTaskbar()
	local x,y
	
	local t={
		{0x3189e6, "-2|5|0x3a8ade,-3|17|0x3181d5,5|18|0x318ae6", 90, 6, 182, 36, 377},
		{0x3175c5, "-1|6|0x2969ad,-2|16|0x3175c5,5|18|0x2969b5", 90, 6, 182, 36, 377},}
	for k,v in ipairs(t) do
		x, y = findMultiColorInRegionFuzzy(table.unpack(v))
		if(x~=-1) then
			pos={x,y,getColor(x,y)}
			return true
		end
	end
	return false
end


function nobuggy()
	local x,y=101,541
	touchDown(x,y)
	x=x+math.random(10,50)-20
	y=y+math.random(10,50)-20
	mSleep(1000)
	touchMove(x,y)
	mSleep(3000)
	touchUp(x,y)
end


function isTask(taskName)
	--任务栏任务
	local t={
		日常任务={
		--{0xb555ad, "0|11|0xa451a4,14|11|0xad55a4,0|-8|0xad55ad", 90, 9, 177, 33, 383},
		{0xb559b5, "5|4|0xb559b5,0|13|0xb559b5,9|18|0xb559b5", 90, 108, 174, 133, 382}
	},
		日常任务2={{0xb555ad, "0|11|0xa451a4,14|11|0xad55a4,0|-8|0xad55ad", 90, 9, 177, 33, 383}},
		皇城悬赏={
		--{0x3189e6, "-2|5|0x3a8ade,-3|17|0x3181d5,5|18|0x318ae6", 90, 6, 182, 36, 377},
		--{0x3175c5, "-1|6|0x2969ad,-2|16|0x3175c5,5|18|0x2969b5", 90, 6, 182, 36, 377},
		{0x3a79bd, "5|0|0x2979ce,5|9|0x3181d6,0|11|0x3186de,3|9|0x3a92ff", 90, 87, 182, 114, 383}
		},
		
		行会任务={
			{0x3a91f6, "20|12|0x3a96ff,32|11|0x318eee", 90, 2, 184, 63, 383},
			{0x2975cd, "14|-3|0x2975c5,30|4|0x3179cd", 90, 2, 184, 63, 383},
		},
		任务栏任务={
			{0xb559b5, "5|4|0xb559b5,0|13|0xb559b5,9|18|0xb559b5", 90, 108, 174, 133, 382},
			{0xb555ad, "0|11|0xa451a4,14|11|0xad55a4,0|-8|0xad55ad", 90, 9, 177, 33, 383},
			{0x3a79bd, "5|0|0x2979ce,5|9|0x3181d6,0|11|0x3186de,3|9|0x3a92ff", 90, 87, 182, 114, 383},
			{0x3a91f6, "20|12|0x3a96ff,32|11|0x318eee", 90, 2, 184, 63, 383},
			{0x2975cd, "14|-3|0x2975c5,30|4|0x3179cd", 90, 2, 184, 63, 383}			
			},
		周常任务={{0x00fbf7, "-2|4|0x00fbf7,-4|8|0x00f7f7,-5|15|0x00f7f7", 90, 90, 169, 119, 392}},
		除魔任务={{0x3a8eee, "11|11|0x3a8eee,37|18|0x318ae6", 90, 4, 183, 62, 382}},
		降伏兽兵={{0x3a8eee, "11|11|0x3a8eee,37|18|0x318ae6", 90, 4, 183, 62, 382}},
		世界任务={{0xdecebd, "11|8|0xbdb6a4,24|7|0xcec6b5,24|14|0xc5baad", 90, 8, 186, 95, 378}},
		主线任务={{0xf7f37b, "6|15|0xf7f77b,22|14|0xe6e77b,22|9|0xf7f37b", 90, 5, 190, 59, 354}},
		事件任务={{0xee75e6, "16|0|0xc569c5,31|1|0xf67df6,31|8|0xff81ff", 90, 3, 181, 63, 378}},
		--支线任务={},  支线任务可能导致卡死		
	}
	local k,v,p,q,x,y,f
	for k,v in pairs(t) do
		if taskName==k then
			
			f=function()
				for p,q in ipairs(v) do
					x, y = findMultiColorInRegionFuzzy(table.unpack(q))
					if x~=-1 then
						pos={x,y,getColor(x,y)}
						return true
					end					
				end
				return false
			end
			return f
		end
		
	end
	
end



--doTask('日常任务')






function openCal()
	--if isColor(1158,17,0xc53131,85) and isColor(1148,28,0xe6dbc5,85) and isColor(1136,41,0x7b2021,85) then
	--	tap(1146,20)
	--end
	
			cls()
			--ClsWindows()
			--ClearButtons()
			tap(949,149)
			mSleep(3000)
			return true
	
	
end


function Admire() --参拜龙卫
	toast("开始参拜龙卫",1)
	cls()
	back2biqi()
	openCal()
	cls()
	if isColor(552,668,0xa49e8c,85) and isColor(557,667,0x8c8173,85) and isColor(558,654,0x292d29,85) then
		
		--今天没有参拜过
		toast("参拜龙卫",1)
		tap(568,612)
		mSleep(4000)
		
		if isColor(728,567,0xac815a,85) and isColor(729,569,0x4a1c08,85) and isColor(729,572,0xd6ae84,85) then
			toast("参与活动")
			tap(779,568)
			mSleep(2000)
		end
		while not ( isColor(475,643,0x4a2000,85) and isColor(479,643,0xd6ae7b,85) and isColor(484,643,0x522008,85) and isColor(530,649,0xe6be8c,85)) do
			cls()
			mSleep(1500)
			fly()
			mSleep(1500)
		end
		tap(521,641)--免费参拜
		mSleep(3000)
		--tap(1131,25) --点击关闭
	else
		toast("已经参拜过了！")
		tap(1149,26) --关闭日历
		mSleep(2000)
	end
	toast("参拜结束！")
end

function antiEvil()
	mSleep(2000)
	cls()
	mSleep(1500)
	openCal()
	--tap(1004,612)
	
	mSleep(2000)
	cls()
	if isColor(982,510,0x52be84,85) and isColor(995,510,0xe6ba63,85) and isColor(1008,505,0x5ac684,85) then
		toast("除魔已经做完")
		tap(1149,26) --关闭日历
		mSleep(2000)
		
	else
		toast("除魔")
		--除魔还没有做完
		tap(1004,612)
		mSleep(2000)
		tap(1027,539) --点击领取任务
		mSleep(900)
		stop()
		mSleep(2000)
		cls()
		mSleep(2000)
		stop()
		doTask("除魔任务")
		if isColor(1142,24,0xd69252,85) and isColor(1142,28,0x842421,85) and isColor(1147,28,0xe6caad,85) then
			tap(1149,26) --关闭日历
			mSleep(2000)
		end
		
		
	end
end

function reject()
	if isColor(323,317,0xceae84,85) and isColor(328,323,0xceae7b,85) and isColor(334,327,0xdeb684,85) then
		tap(1000,152)
		mSleep(1000)
	end
	
end

function brave()
	--勇者令
	back2biqi()
	mSleep(2000)
	cls()
	mSleep(1500)
	openCal()	
	mSleep(1500)
	slideupdown(1097,671,0,3)
	cls()
	--tap(791,591)
	tap(1010,302)--版本更新，位置移动
	fly()
	
	while not isStop() do
			cls()
			--reject()
			mSleep(3000)
			fly()
	end
	if (isColor(373,303,0x08f708,85) and isColor(370,315,0x217121,85) and isColor(383,308,0x08eb00,85)) then
		tap(410,310)
		mSleep(500)
		stop()
		mSleep(1500)
		doTask("降伏兽兵")
	else
		return brave()
	end
	
end



function Treasure()
	back2biqi()
	mSleep(1500)
	cls()
	mSleep(1500)
	openCal()
	tap(305,291) --打开限时任务
	mSleep(2000)
	cls()
	tap(998,325) --神龙宝藏地址变化
	toast("点击神龙宝藏",3)
	mSleep(4000)
	if not(isColor(414,167,0xf7be4a,85) and isColor(416,174,0x523129,85) and isColor(418,181,0xdeae42,85) and isColor(412,178,0xe6b64a,85)) then
		if isColor(426,590,0x6b3919,85) and isColor(430,592,0xefbe8c,85) and isColor(437,602,0xdeae7b,85) then
			toast("点击进入副本",3)
			tap(463,592)
			mSleep(3000)
			autofight()
			mSleep(3000)
			--if isColor(458,12,0xf70000,85) and isColor(469,21,0xff0000,85) and isColor(485,21,0xde0408,85) then
			toast("退出副本")
			tap(1184,34)
			--end
		end
	else
		toast("神龙宝藏已经完成",1)
		tap(1063,112)
		mSleep(2000)
		tap(1143,23)--关闭活动日历
		mSleep(2000)
		return false
	end
	toast("神龙宝藏结束",2)
	--slideupdown()
end


function Hall()
	back2biqi()
	mSleep(1500)
	cls()
	mSleep(1500)
	openCal()
	mSleep(1500)
	slideupdown(1097,671,0,1)
	mSleep(1500)
	local x,y
	x,y = findMultiColorInRegionFuzzy( 0xe6be8c, "5|7|0xbd926b,33|7|0x6b2d08,59|7|0xd6ae84", 90, 494, 109, 636, 680)
	if(x~=-1) then
		tap(x,y)
		mSleep(2000)
		if isColor(587,631,0xdeb68c,85) and isColor(606,631,0xdeb284,85) and isColor(616,637,0xe6be8c,85) then
			tap(639,628)
			mSleep(2000)
			tap(540,467) --确认
			mSleep(2000)
			while isInCopy() do
				cls()
				mSleep(1500)
				autofight()
				
				if isColor(439,385,0x423d31,85) and isColor(449,385,0xf7efa4,85) and isColor(465,385,0xa49263,85) then
				--通关奖励
				tap(587,386)
				mSleep(3000)
				if isColor(1136,24,0xbd9e19,85) and isColor(1136,28,0x7b4d00,85) and isColor(1146,34,0xad7d29,85) and isColor(1152,45,0x291c21,85) then
				tap(1178,33)--离开副本
				mSleep(2000)
				end
				if isColor(612,342,0xded2bd,85) and isColor(612,353,0xc5bead,85) and isColor(630,353,0xded2bd,85) then
					tap(538,471) --确认
					mSleep(2000)
				end
				
				
				if isColor(1140,28,0x842421,85) and isColor(1148,28,0xe6dbc5,85) and isColor(1156,28,0x842421,85) then
				tap(1143,23)--关闭活动日历
				end
				
				
				return
				end
			end
		else
			--已经完成了 点击关闭
			cls()
			mSleep(1500)
			tap(1124,116)
			mSleep(2000)
			tap(1143,23)--关闭活动日历
			mSleep(2000)
			return
		end
	else
		return
	end	
end
--Hall()
function Hell()
	cls()
	mSleep(1500)
	back2biqi()	
	mSleep(1500)
	openCal()
	mSleep(1500)
	tap(787,605)
	mSleep(2500)
	tap(645,635)--点击挑战
	mSleep(2000)
	cls()
	tap(649,544)--前往挑战
	mSleep(1500)
	--do 自动战斗
	
	while not (isColor(511,493,0x5a75bd,85) and isColor(523,495,0x4a495a,85) and isColor(539,495,0x5a71b5,85)) do
		--领奖界面
		cls()
		mSleep(1500)
		autofight()
		mSleep(3000)
	end
	tap(587,392) -- 领取第二个宝箱
	mSleep(4000)
	
	if isColor(467,462,0xefc68c,85) and isColor(467,464,0x8c5d31,85) and isColor(467,475,0xefc68c,85) and isColor(457,498,0x42413a,85) then
	--离开按钮
		tap(486,466)
		mSleep(2000)
	else --没有找到离开按钮
		tap(1186,36)--离开副本
		mSleep(2000)
		if isColor(465,475,0x4a4942,85) and isColor(510,472,0xb58152,85) and isColor(534,470,0x632d08,85) and isColor(552,498,0x4a4542,85) then
		tap(530,463) --点击确认
		mSleep(2000)
		end
	
	end
	
	if isColor(511,493,0x5a75bd,85) and isColor(523,495,0x4a495a,85) and isColor(539,495,0x5a71b5,85) then
		--是否有没有领取的宝箱
		tap(587,392) -- 领取第二个宝箱
		mSleep(4000)
	end
	
	--直到领取奖励
	--离开副本
	--关闭日历
	
end
--mSleep(5000)
--Hell()
function autogroup()
	--自动组队 等待
end

function Hole()
	back2biqi()
	mSleep(1500)
	openCal()
	
	
	
	slideupdown(1088,641,0,2)  --挪动三次到达算卦
		
	tap(1003,394) --点击降魔
	
	cls()
	mSleep(1500)
	if isColor(559,551,0x848184,85) and isColor(625,615,0x7b7d7b,85) and isColor(600,628,0x6b696b,85) and isColor(646,632,0x4a494a,85) and isColor(671,637,0x313131,85) then--已经完成 退出
		tap(1127,107)--关闭降魔洞
		mSleep(300)
		tap(1159,33) --关闭日历
		return
	end
	tap(637,631)--开始挑战
	mSleep(2000)
	--if isColor(488,471,0xeec68c,85) and isColor(492,470,0x522408,85) and isColor(496,470,0xe6ba84,85) and isColor(502,470,0xbd9663,85) then
	tap(539,468) --前往参与
	
	mSleep(3000)
	if isColor(487,384,0xded2bd,85) and isColor(500,463,0xeec68c,85) and isColor(517,467,0xe6be84,85) and isColor(569,467,0xe6be84,85) and isColor(512,405,0x313129,85) then
		tap(739,463) --令牌不够，点击关闭
		mSleep(3000)
		tap(1125,119) --关闭降魔界面
		mSleep(2000)
		clsCal()
		mSleep(800)
	end
	--if isColor(1149,16,0xceaa84,85) and isColor(1152,16,0x635142,85) and isColor(1154,16,0xc5a27b,85) and isColor(1154,21,0xd6b28c,85) then
	--在洞窟里面，点击退出
	tap(1191,121)
	mSleep(2000)
	tap(536,467) --点击确定退出
	mSleep(3000)	
	--end
	
	

end

function Competition()
	back2biqi()
	openCal()
	slideupdown(1097,407,100,1)
	cls()
	local x,y
	x,y = findMultiColorInRegionFuzzy( 0xdeb684, "2|5|0xdeae84,2|7|0x632808,24|6|0xe6be8b", 90, 716, 129, 858, 705)
	if (x~=-1) then
		tap(x,y)
		mSleep(2000)
	else
		tap(1151,30)
		mSleep(2000)

		return
	end
	
	
	local i
	for i=1,3 do
		if isColor(586,612,0xde6942,85) and isColor(592,612,0xd6cece,85) and isColor(592,616,0xf7fbf7,85) and isColor(601,616,0xeff3ef,85) and isColor(597,619,0x3a353a,85) then
			--剩余次数0
			tap(1149,28)
			mSleep(2000)
			tap(1150,26)
			mSleep(2000)
			return
			
		end
		
		
		
		
		tap(1034,168)--第一对手
		mSleep(2000)
		if isColor(506,469,0xb58a5a,85) and isColor(511,469,0x7b3d21,85) and isColor(520,469,0x632400,85) and isColor(452,462,0x4a4542,85) then
			tap(536,458)--确认
			mSleep(2000)
		--autofight()
		end
		if isColor(616,493,0xe6be94,85) and isColor(620,493,0x844921,85) and isColor(623,496,0x6b3108,85) and isColor(629,496,0xefc29c,85) then
		--胜利或者失败
			tap(645,488) --点击返回
			mSleep(3000)
		end
		tap(1194,34) --退出挑战
		mSleep(3000)
		if isColor(616,493,0xe6be94,85) and isColor(620,493,0x844921,85) and isColor(623,496,0x6b3108,85) and isColor(629,496,0xefc29c,85) then
		--胜利或者失败
			tap(645,488) --点击返回
			mSleep(2000)
		end
	end
	
	--满3次，退出
	tap(1149,28)
	mSleep(2000)
	if isColor(1140,29,0x7b2421,85) and isColor(1146,29,0xc58a52,85) and isColor(1153,29,0x5a1819,85) then
	tap(1150,26)
	mSleep(2000)
end

	return
	
end


function Training()
	back2biqi()
	cls()
	openCal()
	cls()
	tap(784,318) --click traing
	mSleep(3000)
	tap(847,578) --click onekey
	--tap(confirm)
	mSleep(2000)
	if isColor(556,319,0x08ff08,85) and isColor(554,337,0x00ff00,85) and isColor(581,337,0x00f700,85) and isColor(564,334,0x315929,85) then
		--RMB jump
		tap(742,461)--click cancel
		mSleep(2000)
		tap(1109,105)--click close
		mSleep(2000)
		tap(1149,29) --close calendar
		mSleep(2000)
	else
		tap(539,460) --click confirm
		mSleep(4000)
		cls()
		tap(638,504) --click confirm
		mSleep(2000)
		tap(1103,101) --click close
		mSleep(2000)
		tap(1149,29)
		mSleep(2000)
	end
end
function clsCal()
	if isColor(1139,29,0x842429,85) and isColor(1147,29,0xdebe94,85) and isColor(1156,29,0x7b2421,85) then
		tap(1150,27)
		mSleep(2000)
	end
end


function mine()
	cls()
	openCal()
	slideupdown(1088,661,0,1)
	tap(1011,609)--前往挖矿
	while not (isColor(363,462,0x10b210,85) and isColor(400,470,0x08db08,85) and isColor(467,499,0x313131,85) and isColor(487,413,0x3a4531,85) ) do
		cls()
		fly()
		mSleep(2500)
	end
	tap(437,403)--矿洞三层
	mSleep(2000)
	--function selfmove()
		local x,y=101,541
		touchDown(x,y)
		
		--y=y+20
		x=x-40
		mSleep(500)
		touchMove(x,y)
		mSleep(10000) -- 跑步十秒，应该怎么都到边了
		touchUp(x,y)
		mSleep(1000)
		cls()
	--end
	selfmove()
	while (isColor(1154,29,0x9c8663,85) and isColor(1157,56,0xb51008,85) and isColor(1172,67,0xde0400,85) and isColor(1175,28,0xe6be8c,85) ) do
		cls()
		if isColor(941,624,0xbd9642,85) and isColor(950,630,0x3a3131,85) and isColor(969,627,0x5a4521,85) and isColor(952,642,0x3a2810,85) then
			tap(955,620) --挖矿
		end
		mSleep(10000)		
	end

	
	
end

function openTools()
	openToolbar()
	tap(360,652)
	mSleep(2000)
end


function Smith()
	toast("开始铁匠铺",1)
	
	mSleep(2000)
	openTools()
	local x=-1
	local y=-1
	function useSmithBox()
		toast("铁匠铺宝箱在"..x..","..y)
		mSleep(1500)
		tap(x,y)
		mSleep(1500)
		if isColor(1037,509,0x7b4519,85) and isColor(1061,516,0xb5855a,85) and isColor(1070,514,0xdeb683,85) and isColor(1111,511,0x311400,85) then
			--找到使用按钮
			tap(1059,513)
			mSleep(500)
			if isColor(526,591,0x834d21,85) and isColor(556,564,0x212021,85) and isColor(556,594,0xc59e73,85) and isColor(591,587,0x845d3a,85) then
				--确定使用
				tap(545,592)
				mSleep(500)
			end		
		end
		--关闭当前窗口
		tap(1144,25)
		mSleep(500)
	end
	x,y = findMultiColorInRegionFuzzy( 0xada6a4, "20|10|0x9c5d3a,24|12|0xd6966b,9|30|0x3a3531,20|32|0x292929,26|-1|0xbdbabd", 90, 151, 103, 617, 563)
	if(x~=-1) then
		useSmithBox()
	else
		--关闭当前窗口
		tap(1144,25)
		--mSleep(1500)
		toast("背包没有宝箱")
		openCurrentMap()
		mSleep(2000)
		--点击武器店老板
		tap(983,190)
		mSleep(12000)
		if isColor(561,391,0x312d29,85) and isColor(558,389,0x08f308,85) and isColor(559,403,0x00ff00,85) and isColor(565,398,0x10d208,85) then
			--铁匠铺
			tap(572,392)
			mSleep(1000)
		end
		--金币购买
		tap(322,599)
		mSleep(1000)
		--关闭购买
		tap(1075,76)
		mSleep(1000)
		--关闭地图
		tap(1159,31)
		mSleep(1000)
		openTools()
		x,y = findMultiColorInRegionFuzzy( 0xada6a4, "20|10|0x9c5d3a,24|12|0xd6966b,9|30|0x3a3531,20|32|0x292929,26|-1|0xbdbabd", 90, 151, 103, 617, 563)
			if(x~=-1) then
				useSmithBox()
			end
	end
	toast("铁匠铺结束")
	mSleep(2000)
end
function MaFatower()
	cls()
	back2biqi()
	openCal()
	slideupdown(1088,641,0,3)
	
	--if isColor(542,646,0xd6d2bd,85) and isColor(545,646,0x212021,85) and isColor(550,646,0xcec6b5,85) and isColor(547,651,0x3a3531,85) then
	if isColor(766,347,0xc5baad,85) and isColor(766,349,0x424142,85) and isColor(762,352,0xb5b29c,85) and isColor(772,353,0xcec2ad,85) then
	--玛珐塔没有做过，哪怕一层
		tap(784,301)
		mSleep(2000)
		if isColor(595,638,0x633919,85) and isColor(611,638,0x845129,85) and isColor(653,640,0xc5956b,85) then
			--找到挑战按钮
			tap(643,641)
			mSleep(2000)
			tap(637,545)--前往挑战
			mSleep(3000)
			while not (isColor(453,463,0x733d10,85) and isColor(459,463,0xcea26b,85) and isColor(505,464,0x94693a,85) and isColor(528,472,0x4a1c08,85)) do
			--没有离开
			
			
				if isColor(956,20,0xc5a631,85) and isColor(998,28,0xdeb252,85) and isColor(1028,19,0x212021,85) then
					--超时
					tap(1193,27)--点击离开副本
					mSleep(2000)
					
					tap(535,461) --确定离开
					mSleep(2000)
					clsCal()
					return
				end
				cls()
				mSleep(3000)
			end
				tap(495,466)
				mSleep(2000)
				cls()
				mSleep(3000)
				return
		
		
		
		--end
		
		else
		--挑战灰色
		tap(1148,21)--关闭玛珐塔
		mSleep(2000)
		clsCal()
		end
	else
	 clsCal()
	end
	
	
end





function fate()
	cls()
	back2biqi(true,"白日门")
	mSleep(2000)
	function findDaXian(wait,noneed)
		openCurrentMap() 
		if(not noneed) then
			slideupdown(1067,650,100,1) --上滑两次到郑大仙
		end
		tap(984,513) --点击郑大仙
		mSleep(wait)
	end
	function buyBone(count)
		
		tap(535,467)  --点击确认
		
		--tap(407,386)
		
	
		mSleep(2000)
		tap(777,426)

		mSleep(2000)
		tap(545,589)
		mSleep(1500)
		--tap(1153,29)
	end
	function BoneFate()
			tap(735,586) --甲骨算卦1
			mSleep(2000) 
			tap(503,467)--确认
			mSleep(2000)
			if isColor(562,335,0xcec2b5,85) and isColor(581,335,0xbdbaa4,85) and isColor(575,340,0x5a514a,85) then
				--甲骨不够
				buyBone()
				tap(735,586) --再次甲骨算卦1
				mSleep(2000) 
				tap(503,467)--确认
			end
			
			mSleep(2000)
			tap(735,586) --甲骨算卦2
			mSleep(2000) 
			tap(503,467)--确认
			mSleep(2500)
			if isColor(562,335,0xcec2b5,85) and isColor(581,335,0xbdbaa4,85) and isColor(575,340,0x5a514a,85) then
				--甲骨不够
				buyBone()
				tap(735,586) --再次甲骨算卦2
				mSleep(2000) 
				tap(503,467)--确认
			end
			mSleep(2000)
	end
	
	findDaXian(6000)
	
	
	--buyBone()
	--findDaXian(1000,true)
	tap(649,395)--绿色算卦的文字
	mSleep(2000)
	tap(1153,29)--点击算卦
	mSleep(2000)
	
	if isColor(688,586,0x6b4121,85) and isColor(689,586,0xa47d52,85) and isColor(690,586,0xe6ba8c,85) and isColor(698,584,0xefc694,85) and isColor(696,587,0x522000,85) then
	--甲骨算卦
	BoneFate()
	tap(1100,111) --退出算卦
	mSleep(2000)
	end
	if isColor(718,594,0xdeb683,85) and isColor(721,594,0x6b3510,85) and isColor(728,594,0xe6c28b,85) then
		--挂金算卦
		tap(1100,111) --退出算卦
		mSleep(2000)
	end
	
	if isColor(698,581,0x733d10,85) and isColor(698,579,0xdeb684,85) and isColor(698,589,0xe6c28c,85) and isColor(694,591,0x421c00,85) then
	--免费算卦
		tap(734,584) --点击免费算卦
		mSleep(14000) --等待11秒
		--if isColor(707,591,0x632408,85) and isColor(715,591,0xefc694,85) and isColor(729,591,0xe6be8c,85) and isColor(737,591,0x8c5931,85) then
		cls()
		mSleep(2000)
		tap(735,586) --解卦
		mSleep(2000)
		
		BoneFate()
		mSleep(2000)
		cls()
		tap(1100,111) --退出算卦
		mSleep(2000)
		--end
	end
	if isColor(707,591,0x632408,85) and isColor(715,591,0xefc694,85) and isColor(729,591,0xe6be8c,85) and isColor(737,591,0x8c5931,85) then
		cls()
		tap(735,586) --解卦
		mSleep(2000)
		BoneFate()
		cls()
		tap(1100,111) --退出算卦
		mSleep(2000)
	end
	cls()
	findDaXian(1000)
	cls()
	tap(739,390)--点击炼丹
	
	mSleep(2000)
	if isColor(714,592,0x521c00,85) and isColor(716,598,0xefc294,85) and isColor(718,600,0x5a2408,85) and isColor(720,600,0xe6be8c,85) then
		--免费炼丹
		cls()
		tap(714,592) --免费炼丹
		mSleep(4000)
		
	end
	cls()
	tap(1100,111)--关闭
	mSleep(2000)
	tap(1153,29)
end

---------------没有任何提示----------------
function DrognCityGift() --魔龙四礼
	toast("开始魔龙四礼",5)
		cls()
		tap(1212,27)  --点开地图
		mSleep(2000)
		tap(1019,42)  --世界地图
		mSleep(3000)
		
	
		tap(920,325)  --molong
		--cls()
		mSleep(1000)
		tap(548,462)  --确认
		mSleep(4500)

	
	
	--toast("")
	tap(1198,26) --点开当前地图
	mSleep(2000)
	slideupdown(1067,187,650,2)
	cls()
	tap(981,444) --严将军
	mSleep(2000)
	while not (isColor(326,430,0x6b6d6b,85) and isColor(333,523,0x5a555a,85) and isColor(504,475,0x313131,85) and isColor(931,518,0x63615a,85)) do
		mSleep(2000)
	end
		tap(454,354)
		mSleep(2000)
		if isColor(903,163,0x732421,85) and isColor(910,160,0xdea263,85) and isColor(918,159,0x631819,85) then
		tap(908,162) --关闭
		mSleep(2000)
	end
	cls()
	tap(984,586) --药店老板
	mSleep(2000)
	while not (isColor(327,412,0x636563,85) and isColor(331,520,0x3a3d3a,85) and isColor(930,522,0x313131,85) and isColor(785,455,0x3a393a,85)) do
		
		mSleep(2000)
	end
	if isColor(450,348,0x08ef08,85) and isColor(450,353,0x293529,85) and isColor(450,357,0x00df00,85) then
			tap(540,353)
			mSleep(2000)
	end
		
		if isColor(903,163,0x732421,85) and isColor(910,160,0xdea263,85) and isColor(918,159,0x631819,85) then
		tap(908,162) --关闭
		mSleep(2000)
		end
	cls()
	tap(1002,510) --武器店老板
	mSleep(2000)
	while not (isColor(326,402,0x6b696b,85) and isColor(349,402,0x3a3531,85) and isColor(333,520,0x3a3d3a,85) ) do
		mSleep(2000)
	end
	tap(582,361)
		mSleep(2000)
		if isColor(903,163,0x732421,85) and isColor(910,160,0xdea263,85) and isColor(918,159,0x631819,85) then
		tap(908,162) --关闭
		mSleep(2000)
		end
	
	
	--[[ 取消杂货店老板
	--x,y==杂货店老板
	slideupdown(1083,642,446,1)
		cls()
		tap(1006,602)
		while not (isColor(494,348,0x10ca10,85) and isColor(495,359,0x08e708,85) and isColor(518,363,0x00ef00,85)) do
			mSleep(3000)			
		end
		tap(565,358)
		mSleep(2000)
	
	if isColor(903,163,0x732421,85) and isColor(910,160,0xdea263,85) and isColor(918,159,0x631819,85) then
		tap(908,162) --关闭
		mSleep(2000)
	end
	--]]
		tap(1154,39)
		mSleep(1500)
end

function FakeShaBuck() --幻沙老兵
	MengZhong()
	mSleep(2000)
	tap(1198,26) --点开当前地图
	slideupdown(1081,167,650,3)
	local find=slideupdown(1081,650,120,3,function()
		local x,y = findMultiColorInRegionFuzzy( 0xeea619, "0|5|0x523110,27|13|0xd6b284,32|13|0x423931,38|9|0x423931,45|19|0xb59a73,48|8|0xeec694", 90, 909, 165, 1057, 658)
		if x~=-1 then 
			laobing={x,y}
			return true
		else return false
		end	
	end)
	if find==-1 then
		--寻找失败
		tap(1149,30) --关闭地图
		mSleep(1500)
		return false
	else
		cls()
		tap(laobing[1],laobing[2])
		mSleep(2000)
		
		while not (isColor(352,470,0x10b610,85) and isColor(354,475,0x218a21,85) and isColor(354,480,0x19a210,85) and isColor(375,480,0x294929,85)) do
			mSleep(2000)
		end
		cls()
		tap(598,416) --全服经验
		mSleep(2000)
		cls()
		tap(laobing[1],laobing[2])
		mSleep(2000)
		tap(785,416) --全服礼包
		mSleep(2000)
		if isColor(905,152,0xce9263,85) and isColor(905,158,0x842429,85) and isColor(913,158,0xd6c6ad,85) and isColor(919,158,0x842421,85) then
			tap(911,157) --关闭老兵
			mSleep(2000)
		end
		if isColor(1143,32,0x7b2421,85) and isColor(1147,32,0x632810,85) and isColor(1156,31,0x521010,85) then
		tap(1147,27)--关闭地图
		mSleep(800)
		end
		
		
	end
	
end

----------------需要定时点击进入---------------
function WinnerKing() --胜者为王
	--15:00
	--21:00
end
function Grap() --地下夺宝
	--14:00
	--20:00
end
function getWine() -- 卧龙领酒(无提示)
	--after 9:25
end
----------------寻路---------------
function heavyKnight()  --兽人重骑
end

function wolfSpider()  --天狼蜘蛛
end

----------------领取奖励----------
function TargetToday() --今日目标	
	back2biqi()
	mSleep(1000)
	openCal()
	cls()
	tap(1007,610)
	mSleep(1500)
	local x=1040
	local btns={
		203,335,472,607}
	local i
	for i=1,4 do
		cls()
		tap(x,btns[i])
		mSleep(1500)
	end
	slideupdown(1029,600,327,1)
	cls()
	tap(1040,607) --点击最后一个
	mSleep(2000)
	tap(1149,27)--点击关闭
	mSleep(1500)
	
	clsCal()
	--end Target
end
----------------邮件---------------
function mail()
	
	openToolbar()
	tap(748,657) --点击社交
	mSleep(5000)
	tap(756,37)
	mSleep(6000) --点击邮件
	tap(479,143) --点击一键领取
	mSleep(1500) 
	tap(534,472) --点击确定
	mSleep(2000)
	------------------------------
	
	if not (isColor(169,201,0xc5b294,85) and isColor(182,201,0xbd413a,85) and isColor(182,214,0xad2429,85)) then
		tap(479,143) --点击全部删除
		mSleep(1500) 
		tap(534,472) --点击确定
		mSleep(2000)
	end

	tap(1155,25) --关闭界面
	
	
	
	--end mail
end

function donation()
	cls()
	back2biqi()
	mSleep(1500)
	tap(76,33)--点击头像
	mSleep(5000)
	touch():on(1068,45):move(300,45):off()
	mSleep(1000)
	tap(604,41)--尝试点击官阶
	mSleep(1500)
	cls()
	--if isColor(992,527,0xad865a,85) and isColor(993,535,0xefca9c,85) and isColor(993,538,0x5a3919,85) and isColor(993,541,0xe6ba8c,85) and isColor(1018,541,0xdeba84,85) then
	if isColor(626,121,0x7b5d21,85) and isColor(641,112,0xad6921,85) and isColor(832,538,0xc5966b,85) then
		--确定是官阶
		--开始捐献
		mSleep(1000)
	elseif isColor(612,110,0xbd7921,85) and isColor(638,121,0xdea23a,85) and isColor(695,128,0x844d29,85) and isColor(597,133,0xad815a,85) then
		tap(1171,333) --金榜题名，点后一个页面
		mSleep(1000)
	else
		--不是官阶
		tap(1097,41) --点击后一个按钮
		mSleep(2000)
		cls()
		--if isColor(992,527,0xad865a,85) and isColor(993,535,0xefca9c,85) and isColor(993,538,0x5a3919,85) and isColor(993,541,0xe6ba8c,85) and isColor(1018,541,0xdeba84,85) then
			if isColor(626,121,0x7b5d21,85) and isColor(641,112,0xad6921,85) and isColor(832,538,0xc5966b,85) then
			--确定这把是官阶了,开始捐献
			mSleep(1000)
		else
			--没有找到官阶
			tap(1150,30)--关闭
			mSleep(500)
			return
		end
	end
	--开始领取俸禄
	tap(853,536) --点击俸禄
	mSleep(1000)
	tap(621,532) --点击领取俸禄
	mSleep(1500)
	if isColor(909,164,0x7b2421,85) and isColor(914,164,0xbd713a,85) and isColor(924,164,0x7b2421,85) then
		--如果领取之后窗口没有关闭则点击关闭按钮
		tap(920,161)
		mSleep(1500)
	end
	cls()
	tap(1040,539) --点击获取功勋
	mSleep(2000)
	local dt=os.time()
	mSleep(1000)
	while not(isColor(169,171,0xdeba8c,85) and isColor(173,171,0x423d42,85) and isColor(176,171,0xdeba8c,85) and isColor(176,177,0xbda27b,85) and isColor(176,182,0x4a3d3a,85)) do
		--寻路
		--todo：超时
		local ct=os.time()
		mSleep(1000)
		if(ct-dt>60) then
			return
		end
		mSleep(3000)
		cls()
		mSleep(1000)
		fly()
	end
	--tap(521,635) --点击最下面的一个捐献按钮
	--mSleep(1500)
	local btnidx=1
	local btnx=514
	local btny={
		634,508,385,262
	}
	local n
	for n=1,4 do
		tap(btnx,btny[btnidx]) --点击最下面一个捐献按钮
		mSleep(1500)
		if isColor(669,640,0x5271b5,85) and isColor(683,636,0x5a75c5,85) and isColor(683,640,0x3a495a,85) then
			--技能书
			tap(828,68)--关闭技能书
			mSleep(2000)
			tap(1148,34) --关闭捐献界面
			mSleep(2000)
			--确保离开PK区
			local x,y=101,541
			touchDown(x,y)
			
			y=y+20
			x=x-20
			mSleep(500)
			touchMove(x,y)
			mSleep(2000)
			touchUp(x,y)
			mSleep(1500)
			return
		elseif isColor(499,422,0xe6be8c,85) and isColor(499,431,0x732d08,85) and isColor(493,408,0x8c5d21,85) then
			--找到物品
			slideright(473,484,787)  --右滑最大
			mSleep(1500)
			tap(545,597) --点击捐赠
			mSleep(1500)
			
			if isColor(509,466,0xefc68c,85) and isColor(512,470,0x844521,85) and isColor(520,469,0x632400,85) and isColor(523,469,0xe6be84,85) then
				tap(541,469) --确认捐献
				mSleep(2000)
			end
			
			
		elseif isColor(682,635,0x5271b5,85) and isColor(688,635,0x526dad,85) and isColor(697,635,0x5a79c5,85) then
			--装备捐献
			if isColor(458,284,0x8c8eef,85) and isColor(462,284,0x6b69a4,85) and isColor(460,289,0x8486de,85) then
				--没有装备
				tap(828,63)--关闭装备
				btnidx=btnidx+1
				mSleep(1500)
				--没有装备
			else --找到装备
				
				tap(705,177) --点第一个装备
				mSleep(1500)
				if isColor(509,466,0xefc68c,85) and isColor(512,470,0x844521,85) and isColor(520,469,0x632400,85) and isColor(523,469,0xe6be84,85) then
					tap(541,469) --确认捐献
					mSleep(2000)
				end
				
				
			end
		elseif isColor(544,344,0xbdb6a4,85) and isColor(553,347,0xcec2b5,85) and isColor(621,471,0xbd8e5a,85) and isColor(623,471,0x945931,85) then
			--没有可捐献的物品
			tap(639,464) --确定
			mSleep(1500)
			btnidx=btnidx+1
		end	
	end
	
	
	tap(1148,34) --关闭捐献界面
	mSleep(2000)
	--确保离开PK区
	local x,y=101,541
	touchDown(x,y)
	
	y=y+20
	x=x-20
	mSleep(500)
	touchMove(x,y)
	mSleep(1500)
	touchUp(x,y)
	mSleep(1000)
end
--mSleep(5000)
--donation()


function wait(callback,timeout) --秒为单位
	local now=os.time()
	local newtime=os.time()
	while not callback() do
		newtime=os.time()
		if(newtime-now>timeout) then
			return false
		end
		mSleep(3000)
	end
	return true
end



function openWorldMap()
	cls()
	openCurrentMap()
	tap(1015,42)
	mSleep(2000)
end



function toKinght()
	openWorldMap()
	tap(1073,597)  --点击石原
	mSleep(2000)
	tap(544,457) --点击确认
	mSleep(5000)
	slideupdown(1012,424,244,1)--下滑
	mSleep(2000)
	tap(1002,633) --点击兽人帝国
	mSleep(1000)
	tap(1151,35) --点击确认
	mSleep(10000)
	openCurrentMap()
	slideupdown(1012,424,244,1) --下滑
	tap(1002,633) --点击兽人陵墓
	mSleep(1000)
	ClsWindows()
	fly()

end

function isNight()
		if isColor(1157,17,0x423929,85) and isColor(1233,20,0xceae84,85) and isColor(1229,30,0x312829,85) and isColor(1174,13,0xeec294,85) then
		return true
	else
		return false
	end
	end
function openCurrentMap()
	--ClsWindows()
	tap(1204,20)
	mSleep(1000)
end

function hitKnight()
	openCurrentMap()
	tap(1003,317)
	mSleep(2000)
	tap(1152,26)
	mSleep(8000)
end
	
	
function overNight()
	toKinght()
	while true do
		if isPK() then
			mSleep(5000)
		elseif isDead() then
			mSleep(1000)
			toKinght()
		elseif not isNight() then
			toKinght()
		else
			
			hitKnight()
		end
	end
end





function getLevel()
	whitelist = "1234567890"
	return ocrText(1120, 239, 1177, 265,0,whitelist,0)
end



function changeChar(id)
	
	
	local T={
		{182,135},
		{115,240},
		{184,351},
		{119,452},
		{176,571},
		}
	
	
	openToolbar()
	--cls()
	tap(1016,652)  --点击设置
	mSleep(2000)
	cls()
	tap(491,40) --点击账号管理
	mSleep(2000)
	cls()
	tap(341,339) --点击选择角色
	mSleep(4000)
	
	if isColor(177,81,0xfffbd6,85) and isColor(177,90,0xce8a31,85) and isColor(187,93,0xd69242,85) then
		currid=1
	elseif isColor(113,187,0xf7f7de,85) and isColor(113,196,0xce8631,85) and isColor(130,200,0x734100,85) then
		currid=2
	elseif isColor(175,300,0xad7931,85) and isColor(169,301,0x9c6929,85) and isColor(186,303,0xce8e29,85) then
		currid=3
	elseif isColor(112,399,0xf7f3ce,85) and isColor(112,408,0xce8a3a,85) and isColor(107,408,0x844d10,85) then
		currid=4
	else
		currid=5
		return -1
	end
	
	
	
	tap(table.unpack(T[currid+1]))  --点击角色
	mSleep(2000)

	--if isColor(589,67,0xf7ebce,85) and isColor(591,81,0xa4814a,85) and isColor(595,86,0xe6c29c,85) and isColor(613,85,0x947542,85) then
	if isColor(776,646,0xefe7bd,85) and isColor(779,646,0x080408,85) and isColor(786,654,0x080000,85) and isColor(793,657,0xffffe6,85) then	
		--如果 创建角色，退出
		tap(178,662)--返回
		mSleep(2000)
		return -1
	else
		level=tonumber(getLevel()) --convert string to number
		mSleep(2000)
	end
	
	tap(637,663) --点击进入游戏
	mSleep(15000) --等待loading
end



function findZone(num)
	local whitelist = "1234567890"
	local col,row
	
	
	local x,y=560,240
	local xoff,yoff=230,70
	local t={
	{473, 228, 517, 555},
	{707, 225, 749, 546},
	{938, 228, 983, 553},
	}
	for k,v in ipairs(t) do
		local m=ocrText(v[1],v[2],v[3],v[4],0,whitelist,true)
		
		tt=strSplit(m,'\n')
		for i=1,#tt do
			if tt[i]==num then
				row=i
				col=k
				--toast(num.."小区在第"..col.."列 第"..row.."行")
				return x+(col-1)*xoff,y+(row-1)*yoff
			end
		end
	end
	return -1,-1
end
function changeZone()
	mSleep(2000)
	tap(177,665)--返回
	mSleep(1500)
	if isColor(617,163,0xd6b28c,85) and isColor(620,170,0xd6b68c,85) and isColor(617,176,0xefc294,85) and isColor(634,176,0x636563,85) and isColor(617,481,0xce9e73,85) then
		tap(640,480) --公告
		mSleep(2000)
	end
	if isColor(581,528,0xd6c694,85) and isColor(593,528,0xadaa9c,85) and isColor(624,535,0xa49663,85) and isColor(655,530,0xad9a7b,85) then
		tap(486,526) --选择小区
		mSleep(2000)
	end
	
	local whitelist = "1234567890"
	local currZone=ocrText(185, 209, 227, 234,0,whitelist,0)
	--toast("当前服务器"..currZone)
	local targetZone
	if(currZone=="327") then
		targetZone="330"
	else
		targetZone="327"
	end
	local x,y=findZone(targetZone)
	if(x~=-1) then
		--toast("330号小区位置"..x..y)
		tap(x,y)
		mSleep(2000)
		tap(778,619) --确定
		mSleep(2000)
		tap(824,527) --进入游戏
		mSleep(10000)
		return true
	end
	return false
	--toast(table.concat(t[1],','))

end


function regpack()
	openCal()
	slideupdown(376,617,166,1)
	mSleep(2000)
	tap(309,630)
	mSleep(2000)
	cls()
	tap(986,607)
	mSleep(1500)
	tap(1147,32)
	mSleep(1500)
end
function tidy()
	back2biqi()
	mSleep(10000)
	openToolbar()
	tap(353,655) --打开背包
end




function startGame()
	zone=0
	id=1
	while true do	
		mSleep(2000)
		
		s() --开始游戏
		cls()
		mSleep(2000)
		
		--mSleep(3000)
		
		back2biqi(true) --返回比奇
		mSleep(2000)
		scrap() --分解
		--toast("识别"..getLevel() or "")


		donation() --捐献		
		doTask("日常任务")		
		doTask("皇城悬赏")
		
		Treasure()
		mSleep(2000)
		

		DrognCityGift()
		mSleep(2000)
		Admire()
		Training()
		Competition()
		fate()		
		Hell()			
		Hole() --洞窟		
		cls()
		--back2biqi(true)
		
		--doTask("行会任务")
		
		--brave()
		if ((os.date("%w") == "6" or os.date("%w") == "0") and findTask(isTask("周常任务")) ~= false) then			
			doTask("周常任务")
		else
			doTask("日常任务2")
			doTask("行会任务")
			Smith()
			MaFatower()
			brave()
		end	
		
		--mine()
		TargetToday()			
		mail()
		mSleep(3000)
		
		back2biqi()
		id=id+1
		if (-1==changeChar(id)) then
			if(zone==0) then
				if changeZone()==true then --换区
					mSleep(5000)
					tap(175,132) --第一个角色
					mSleep(2000)
					id=1
					zone=zone+1
					tap(637,663) --点击进入游戏
					mSleep(15000) --等待loading
				else
					return
				end
				
			else  --换过区，且所有角色任务都已经完成，准备做周俸
			tap(175,132) --第一个角色
			mSleep(2000)	
			return
			end
		end
		
		
		
	end
	
	toast(getLevel())
	
	

end
function goWeek()
	mSleep(2000)
	tap(637,663) --点击进入游戏
	mSleep(10000) --等待loading
	zone=0
	id=1
	while true do	
		mSleep(2000)
		s()
		--mSleep(2000)
		cls()
		--mSleep(3000)
		back2biqi()
		mSleep(2000)
		scrap()
		cls()		
		Admire()
		Training()
		--mSleep(3000)
		Hall()
		--mSleep(2000)
		
		Competition()
		--mSleep(3000)
		fate()
		--mSleep(3000)
		Hell()
		--mSleep(3000)
		--Smith()
		--mSleep(3000)
		MaFatower()
		--mSleep(2000)
		Hole() --洞窟
		Smith() --铁匠铺
		--donation()--	doTask("日常任务2")
		cls()
		back2biqi(true)
		--antiEvil()
		
		doTask("行会任务")
		
		brave()
		if(os.date("%w") == "6" or os.date("%w") == "0") then
			doTask("周常任务")
		end		
		mine()		
		TargetToday()		
		mSleep(2000)
		back2biqi()
		id=id+1
		if (-1==changeChar(id)) then
			if(zone==0) then
				if changeZone()==true then --换区
					mSleep(5000)
					tap(175,132) --第一个角色
					mSleep(2000)
					id=1
					zone=zone+1
					tap(637,663) --点击进入游戏
					mSleep(15000) --等待loading
				else
					return
				end
				
			else
				
			return
			end
		end
	end	
	toast(getLevel())
end
function closeGame()
closeApp("com.tencent.tmgp.rxcq")
lockDevice();
lua_exit()
end
----

--[[
toast('debug',3)
mSleep(3000)
	
toast(os.date("%w"))
if(os.date("%w") == "6" or os.date("%w") == "0") then
	toast("今天是周末，开始周常")
			doTask("周常任务")
end
toast('end debug')
--]]
startGame() --先循环所有人物做做官任务，捐献，仰望强者，皇城悬赏，魔龙四礼，龙柱

closeGame()









