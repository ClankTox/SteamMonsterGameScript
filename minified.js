function startAutoClicker(){return autoClicker?void console.log("Autoclicker is already running!"):(autoClicker=setInterval(function(){if(gameRunning()){var e=Math.floor(Math.random()*autoClickerVariance*2)-autoClickerVariance,t=clicksPerSecond+e;g_Minigame.m_CurrentScene.m_nClicks+=t,g_msTickRate=1100;var a=g_Minigame.m_CurrentScene.m_rgGameData.lanes[g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane].active_player_ability_gold_per_click,n=getTarget();if(n&&a>0&&n.m_data.hp>0){var r=n.m_data.gold*a*g_Minigame.m_CurrentScene.m_nClicks;g_Minigame.m_CurrentScene.ClientOverride("player_data","gold",g_Minigame.m_CurrentScene.m_rgPlayerData.gold+r),g_Minigame.m_CurrentScene.ApplyClientOverrides("player_data",!0)}var i=g_Minigame.m_CurrentScene.m_rgStoredCrits.length;if(g_Minigame.m_CurrentScene.m_rgStoredCrits=[],debug){i>1&&console.log("Clicking "+g_Minigame.m_CurrentScene.m_nClicks+" times this second. ("+i+" crits)."),console.log(1==i?"Clicking "+g_Minigame.m_CurrentScene.m_nClicks+" times this second. (1 crit).":"Clicking "+g_Minigame.m_CurrentScene.m_nClicks+" times this second.");var o=g_Minigame.m_CurrentScene.CalculateDamage(g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_per_click*userMaxElementMultiiplier*g_Minigame.m_CurrentScene.m_nClicks),l="(unknown)";o>1e9?l=o/1e9+"B":o>1e6?l=o/1e6+"M":o>1e3&&(l=o/1e3+"K"),console.log("We did roughly "+l+" damage in the last second.")}}},autoClickerFreq),void console.log("autoClicker has been started."))}function startAutoUpgradeManager(){if(autoUpgradeManager)return void console.log("UpgradeManager is already running!");var e,t=30,a=.35,n=1,r=clicksPerSecond+Math.ceil(autoClickerVariance/2),i={id:-1,cost:0},o=[{id:0,level:1},{id:11,level:1},{id:2,level:10},{id:1,level:10}],l=[11,13,16,18,17,14,15,12],s=[0,8,20],g=[1,9,21],u=[2,10,22],c=[3,4,5,6],m=function(t){var a=null;return e.m_rgPlayerUpgrades&&e.m_rgPlayerUpgrades.some(function(e){return e.upgrade==t?(a=e,!0):void 0}),a},p=function(t){if(!e.bHaveUpgrade(t))return!1;var a=e.m_rgTuningData.upgrades[t],n=a.required_upgrade;if(void 0!==n){var r=a.required_upgrade_level||1;return r<=e.GetUpgradeLevel(n)}return!0},d=function(){for(var t,a,n={id:-1,cost:0};o.length>0;){if(t=o[0],a=t.id,m(a).level<t.level){n={id:a,cost:e.m_rgTuningData.upgrades[a].cost};break}o.shift()}return n},_=function(){var t={id:-1,cost:0};return l.some(function(a){return p(a)&&m(a).level<1?(t={id:a,cost:e.m_rgTuningData.upgrades[a].cost},!0):void 0}),t},A=function(){var t={id:-1,cost:0,hpg:0};return s.forEach(function(a){if(p(a)){var n=e.m_rgTuningData.upgrades[a],r=m(a),i=n.cost*Math.pow(n.cost_exponential_base,r.level),o=e.m_rgTuningData.player.hp*n.multiplier/i;o>=t.hpg&&(t={id:a,cost:i,hpg:o})}}),t},b=function(){var t,i,o,l={id:-1,cost:0,dpg:0},s=e.m_rgPlayerTechTree.damage_per_click;g.forEach(function(a){p(a)&&(t=e.m_rgTuningData.upgrades[a],i=t.cost*Math.pow(t.cost_exponential_base,m(a).level),o=e.m_rgPlayerTechTree.base_dps/r*t.multiplier/i,o>=l.dpg&&(l={id:a,cost:i,dpg:o}))}),u.forEach(function(a){p(a)&&(t=e.m_rgTuningData.upgrades[a],i=t.cost*Math.pow(t.cost_exponential_base,m(a).level),o=e.m_rgTuningData.player.damage_per_click*t.multiplier/i,o>=l.dpg&&(l={id:a,cost:i,dpg:o}))}),p(7)&&(t=e.m_rgTuningData.upgrades[7],i=t.cost*Math.pow(t.cost_exponential_base,m(7).level),o=e.m_rgPlayerTechTree.crit_percentage/100*s*t.multiplier/i,o>l.dpg&&(l={id:7,cost:i,dpg:o})),t=e.m_rgTuningData.upgrades[4];var d=c.reduce(function(e,t){return e+m(t).level},1);if(i=t.cost*Math.pow(t.cost_exponential_base,d),o=a*s*t.multiplier/i,o>=l.dpg){var _=c.map(function(e){return m(e).level}).sort(function(e,t){return t-e})[n-1],A=c.filter(function(e){return m(e).level==_});A=A[Math.floor(Math.random()*A.length)],l={id:A,cost:i,dpg:o}}return l},y=function(){var t,a=0;return function(){var n=e.m_rgGameData.level;if(n!==a){var r=e.m_rgGameData.lanes.reduce(function(e,t){return Math.max(e,t.enemies.reduce(function(e,t){return e+t.dps},0))},0)||4*n;t=e.m_rgPlayerTechTree.max_hp/r}return a=n,t}}(),h=function(){if(i=d(),-1===i.id)if(y()<t)i=A();else{var a=b(),n=_();i=a.cost<n.cost||-1===n.id?a:n}debug&&-1!==i.id&&console.log("next buy:",e.m_rgTuningData.upgrades[i.id].name,"("+FormatNumberForDisplay(i.cost)+")")};autoUpgradeManager=setInterval(function(){debug&&console.log("Checking for worthwhile upgrades"),e=g_Minigame.CurrentScene(),e.m_bUpgradesBusy||((-1===i.id||y()<t)&&h(),-1!==i.id&&i.cost<=e.m_rgPlayerData.gold&&$J(".link").each(function(){return $J(this).data("type")===i.id?(e.TryUpgrade(this),i.id=-1,!1):void 0}))},upgradeManagerFreq),console.log("autoUpgradeManager has been started.")}function startAutoRespawner(){return autoRespawner?void console.log("autoRespawner is already running!"):(autoRespawner=setInterval(function(){debug&&console.log("Checking if the player is dead."),g_Minigame.m_CurrentScene.m_bIsDead&&(debug&&console.log("Player is dead. Respawning."),RespawnPlayer())},respawnCheckFreq),void console.log("autoRespawner has been started."))}function startAutoTargetSwapper(){return autoTargetSwapper?void console.log("autoTargetSwapper is already running!"):(updateUserElementMultipliers(),autoTargetSwapperElementUpdate=setInterval(updateUserElementMultipliers,elementUpdateRate),autoTargetSwapper=setInterval(function(){var e=null;g_Minigame.m_CurrentScene.m_rgEnemies.each(function(t){compareMobPriority(t,e)&&(e=t)});var t=getTarget();null==e||t&&e.m_data.id==t.m_data.id?null==e||t||e.m_data.id==t.m_data.id||g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane==e.m_nLane||g_Minigame.m_CurrentScene.TryChangeLane(e.m_nLane):(debug&&null!=swapReason&&(console.log(swapReason),swapReason=null),g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane!=e.m_nLane&&g_Minigame.m_CurrentScene.TryChangeLane(e.m_nLane),g_Minigame.m_CurrentScene.TryChangeTarget(e.m_nID))},targetSwapperFreq),void console.log("autoTargetSwapper has been started."))}function startAutoAbilityUser(){return autoAbilityUser?void console.log("autoAbilityUser is already running!"):(autoAbilityUser=setInterval(function(){debug&&console.log("Checking if it's useful to use an ability.");var e=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100,t=getTarget(),a=g_Minigame.m_CurrentScene.m_rgGameData.lanes[g_Minigame.CurrentScene().m_rgPlayerData.current_lane];if(t){var n=t.m_data.hp/t.m_data.max_hp*100,r=g_Minigame.m_CurrentScene.m_rgLaneData[g_Minigame.CurrentScene().m_rgPlayerData.current_lane].friendly_dps,i=t.m_data.hp/r;if(0==t.m_data.type){var o=hasAbility(5),l=hasAbility(6),s=hasAbility(18)&&null!=autoItemUser;if(n>=90)hasAbility(14)?castAbility(14):hasAbility(15)&&castAbility(15);else if(o||s||l){var g=abilityIsUnlocked(5),u=abilityIsUnlocked(6);if(!g&&!s||!u||(o||s)&&l){var c=currentLaneHasAbility(9);(n>=70||c&&n>=60)&&(c||hasAbility(9)||!abilityIsUnlocked(9)||abilityCooldown(9)>60)&&(hasAbility(9)&&!currentLaneHasAbility(9)?(debug&&console.log("Triggering Decrease Cooldown!"),castAbility(9)):(s?(debug&&console.log("Using Crit!"),castAbility(18)):o&&(debug&&console.log("Casting Morale Booster!"),castAbility(5)),l&&(debug&&console.log("Casting Good Luck Charm!"),castAbility(6))))}}(2==t.m_data.type||4==t.m_data.type)&&10>i&&hasAbility(8)&&(debug&&console.log("Using Metal Detector."),castAbility(8)),hasAbility(10)&&n>=useNukeOnSpawnerAbovePercent?(debug&&console.log("Nuclear launch detected."),castAbility(10)):hasAbility(12)&&n>=useNukeOnSpawnerAbovePercent&&a.enemies.length>=4?(debug&&console.log("Triggering napalm!"),castAbility(12)):hasAbility(11)&&n>=useNukeOnSpawnerAbovePercent&&a.enemies.length>=4&&(debug&&console.log("Triggering cluster bomb!"),castAbility(11))}}for(var m=0,p=0,d=1;10>d;d++){var _=10*(d-1)+5;m+=_*a.player_hp_buckets[d],p+=a.player_hp_buckets[d]}var A=m/p*100,b=p/(p+a.player_hp_buckets[0])*100;(useMedicsAtPercent>=e||useMedicsAtLanePercent>=A&&b>useMedicsAtLanePercentAliveReq)&&!g_Minigame.m_CurrentScene.m_bIsDead&&(debug&&(useMedicsAtPercent>=e&&console.log("Health below threshold. Need medics!"),useMedicsAtLanePercent>=A&&b>useMedicsAtLanePercentAliveReq&&console.log("Average lane below threshold. Need medics!")),hasAbility(7)&&!currentLaneHasAbility(7)?(debug&&console.log("Unleash the medics!"),castAbility(7)):debug&&console.log("No medics to unleash!"))},abilityUseCheckFreq),void console.log("autoAbilityUser has been started."))}function startAutoItemUser(){return autoItemUser?void console.log("autoItemUser is already running!"):(autoItemUser=setInterval(function(){debug&&console.log("Checking if it's useful to use an item.");var e=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100;useStealHealthAtPercent>=e&&!g_Minigame.m_CurrentScene.m_bIsDead&&hasAbility(23)&&!currentLaneHasAbility(7)&&(debug&&console.log("Stealing Health!"),castAbility(23));var t=getTarget();if(t){var a=t.m_data.hp/t.m_data.max_hp*100;2==t.m_data.type&&hasAbility(17)&&a>useRainingGoldAbovePercent&&(debug&&console.log("Raining Gold!"),castAbility(17))}},itemUseCheckFreq),void console.log("autoItemUser has been started."))}function startAllAutos(){startAutoClicker(),startAutoRespawner(),startAutoTargetSwapper(),startAutoAbilityUser(),startAutoItemUser(),startAutoUpgradeManager()}function stopAutoClicker(){autoClicker?(clearInterval(autoClicker),autoClicker=null,console.log("autoClicker has been stopped.")):console.log("No autoClicker is running to stop.")}function stopAutoRespawner(){autoRespawner?(clearInterval(autoRespawner),autoRespawner=null,console.log("autoRespawner has been stopped.")):console.log("No autoRespawner is running to stop.")}function stopAutoTargetSwapper(){autoTargetSwapper?(clearInterval(autoTargetSwapper),autoTargetSwapper=null,console.log("autoTargetSwapper has been stopped.")):console.log("No autoTargetSwapper is running to stop.")}function stopAutoAbilityUser(){autoAbilityUser?(clearInterval(autoAbilityUser),autoAbilityUser=null,console.log("autoAbilityUser has been stopped.")):console.log("No autoAbilityUser is running to stop.")}function stopAutoItemUser(){autoItemUser?(clearInterval(autoItemUser),autoItemUser=null,console.log("autoItemUser has been stopped.")):console.log("No autoItemUser is running to stop.")}function stopAutoUpgradeManager(){autoUpgradeManager?(clearInterval(autoUpgradeManager),autoUpgradeManager=null,console.log("autoUpgradeManager has been stopped.")):console.log("No autoUpgradeManager is running to stop.")}function stopAllAutos(){stopAutoClicker(),stopAutoRespawner(),stopAutoTargetSwapper(),stopAutoAbilityUser(),stopAutoItemUser(),stopAutoUpgradeManager()}function disableAutoNukes(){useNukeOnSpawnerAbovePercent=200,console.log("Automatic nukes have been disabled")}function castAbility(e){hasAbility(e)&&(12>=e&&null!=document.getElementById("ability_"+e)?g_Minigame.CurrentScene().TryAbility(document.getElementById("ability_"+e).childElements()[0]):null!=document.getElementById("abilityitem_"+e)&&g_Minigame.CurrentScene().TryAbility(document.getElementById("abilityitem_"+e).childElements()[0]))}function currentLaneHasAbility(e){return laneHasAbility(g_Minigame.CurrentScene().m_rgPlayerData.current_lane,e)}function laneHasAbility(e,t){return"undefined"==typeof g_Minigame.m_CurrentScene.m_rgLaneData[e].abilities[t]?0:g_Minigame.m_CurrentScene.m_rgLaneData[e].abilities[t]}function abilityIsUnlocked(e){return 12>=e?1<<e&g_Minigame.CurrentScene().m_rgPlayerTechTree.unlocked_abilities_bitfield:getAbilityItemQuantity(e)>0}function getAbilityItemQuantity(e){for(var t=0;t<g_Minigame.CurrentScene().m_rgPlayerTechTree.ability_items.length;++t){var a=g_Minigame.CurrentScene().m_rgPlayerTechTree.ability_items[t];if(a.ability==e)return a.quantity}return 0}function abilityCooldown(e){return g_Minigame.CurrentScene().GetCooldownForAbility(e)}function hasAbility(e){return abilityIsUnlocked(e)&&abilityCooldown(e)<=0}function updateUserElementMultipliers(){gameRunning()&&g_Minigame.m_CurrentScene.m_rgPlayerTechTree&&(userElementMultipliers[3]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_air,userElementMultipliers[4]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_earth,userElementMultipliers[1]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_fire,userElementMultipliers[2]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_water,userMaxElementMultiiplier=Math.max.apply(null,userElementMultipliers))}function getMobTypePriority(e){switch(mobType=e.m_data.type,mobType){case 0:return 0;case 3:return 1;case 2:return 2;case 4:return 3}return-Number.MAX_VALUE}function compareMobPriority(e,t){if(null==e)return!1;if(null==t)return swapReason="Swapping off a non-existent mob.",!0;var a=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100,n=laneHasAbility(e.m_nLane,7)||laneHasAbility(e.m_nLane,23),r=laneHasAbility(t.m_nLane,7)||laneHasAbility(t.m_nLane,23),i=laneHasAbility(e.m_nLane,17),o=laneHasAbility(t.m_nLane,17),l=getMobTypePriority(e),s=getMobTypePriority(t),g=userElementMultipliers[g_Minigame.m_CurrentScene.m_rgGameData.lanes[e.m_nLane].element],u=userElementMultipliers[g_Minigame.m_CurrentScene.m_rgGameData.lanes[t.m_nLane].element];laneHasAbility(e.m_nLane,16)&&(g=userMaxElementMultiiplier),laneHasAbility(t.m_nLane,16)&&(u=userMaxElementMultiiplier);var c=e.m_data.hp,m=t.m_data.hp;if(e.m_bIsDestroyed||0>=c)return!1;if(t.m_bIsDestroyed||0>=m)return swapReason="Swapping off a destroyed mob.",!0;if(seekHealingPercent>=a&&!g_Minigame.m_CurrentScene.m_bIsDead){if(n!=r&&n)return swapReason="Swapping to lane with active healing.",!0}else if(i!=o){if(i>o&&(3==t.m_data.type||1==t.m_data.type))return swapReason="Switching to target with Raining Gold.",!0}else if(l!=s){if(l>s)return swapReason="Switching to higher priority target.",!0}else if(g!=u){if(g>u)return swapReason="Switching to elementally weaker target.",!0}else if(c!=m&&m>c)return swapReason="Switching to lower HP target.",!0;return!1}function gameRunning(){try{return"object"==typeof g_Minigame&&2==g_Minigame.m_CurrentScene.m_rgGameData.status}catch(e){return!1}}function addPointer(){g_Minigame.m_CurrentScene.m_rgFingerTextures=[];for(var e=26,t=49,a=0;4>a;a++)for(var n=0;5>n;n++)g_Minigame.m_CurrentScene.m_rgFingerTextures.push(new PIXI.Texture(g_rgTextureCache.pointer.texture,{x:n*e,y:a*t,width:e,height:t}));g_Minigame.m_CurrentScene.m_nFingerIndex=0,g_Minigame.m_CurrentScene.m_spriteFinger=new PIXI.Sprite(g_Minigame.m_CurrentScene.m_rgFingerTextures[g_Minigame.m_CurrentScene.m_nFingerIndex]),g_Minigame.m_CurrentScene.m_spriteFinger.scale.x=g_Minigame.m_CurrentScene.m_spriteFinger.scale.y=2,g_Minigame.m_CurrentScene.m_containerParticles.addChild(g_Minigame.m_CurrentScene.m_spriteFinger)}function getTarget(){return g_Minigame.m_CurrentScene.GetEnemy(g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane,g_Minigame.m_CurrentScene.m_rgPlayerData.target)}function addCustomButtons(){$J('<div style="height: 52px; position: absolute; bottom: 85px; left: 828px; z-index: 12;" onclick="SmackTV();"><br><br><span style="font-size:10px; padding: 12px; color: gold;">Smack TV</span></div>').insertBefore("#row_bottom"),$J(".game_options").append('<span id="toggleAutoClickerBtn" class="toggle_music_btn"><span>Disable AutoClicker</span></span>'),$J("#toggleAutoClickerBtn").click(toggleAutoClicker),$J(".game_options").append('<span id="toggleAutoTargetSwapperBtn" class="toggle_music_btn"><span>Disable AutoTargetSwapper</span></span>'),$J("#toggleAutoTargetSwapperBtn").click(toggleAutoTargetSwapper),$J(".game_options").append('<span id="toggleAutoAbilityUserBtn" class="toggle_music_btn"><span>Disable AutoAbilityUser</span></span>'),$J("#toggleAutoAbilityUserBtn").click(toggleAutoAbilityUser),$J(".game_options").append('<span id="toggleAutoItemUserBtn" class="toggle_music_btn"><span>Disable AutoItemUser</span></span>'),$J("#toggleAutoItemUserBtn").click(toggleAutoItemUser),$J(".game_options").append('<span id="toggleAutoUpgradeBtn" class="toggle_music_btn"><span>Disable AutoUpgrader</span></span>'),$J("#toggleAutoUpgradeBtn").click(toggleAutoUpgradeManager),$J(".game_options").append('<span id="toggleSpammerBtn" class="toggle_music_btn"><span>Enable Particle Spam</span></span>'),$J("#toggleSpammerBtn").click(toggleSpammer)}function toggleAutoClicker(){autoClicker?(stopAutoClicker(),$J("#toggleAutoClickerBtn").html("<span>Enable AutoClicker</span>")):(startAutoClicker(),$J("#toggleAutoClickerBtn").html("<span>Disable AutoClicker</span>"))}function toggleAutoTargetSwapper(){autoTargetSwapper?(stopAutoTargetSwapper(),$J("#toggleAutoTargetSwapperBtn").html("<span>Enable AutoTargetSwapper</span>")):(startAutoTargetSwapper(),$J("#toggleAutoTargetSwapperBtn").html("<span>Disable AutoTargetSwapper</span>"))}function toggleAutoAbilityUser(){autoAbilityUser?(stopAutoAbilityUser(),$J("#toggleAutoAbilityUserBtn").html("<span>Enable AutoAbilityUser</span>")):(startAutoAbilityUser(),$J("#toggleAutoAbilityUserBtn").html("<span>Disable AutoAbilityUser</span>"))}function toggleAutoItemUser(){autoItemUser?(stopAutoItemUser(),$J("#toggleAutoItemUserBtn").html("<span>Enable AutoItemUser</span>")):(startAutoItemUser(),$J("#toggleAutoUpgradeBtn").html("<span>Disable AutoItemUser</span>"))}function toggleAutoUpgradeManager(){autoUpgradeManager?(stopAutoUpgradeManager(),$J("#toggleAutoUpgradeBtn").html("<span>Enable AutoUpgrader</span>")):(startAutoUpgradeManager(),$J("#toggleAutoUpgradeBtn").html("<span>Disable AutoUpgrader</span>"))}function spamNoClick(){var e=g_Minigame.m_CurrentScene.m_nClicks;g_Minigame.m_CurrentScene.DoClick({data:{getLocalPosition:function(){var e=getTarget(),t=440*e.m_nLane;return{x:e.m_Sprite.position.x-t,y:e.m_Sprite.position.y-52}}}}),g_Minigame.m_CurrentScene.m_nClicks=e}function toggleSpammer(){spammer?(clearInterval(spammer),spammer=null,$J("#toggleSpammerBtn").html("<span>Enable Particle Spam</span>")):confirm("Are you SURE you want to do this? This leads to massive memory leaks farly quickly.")&&(spammer=setInterval(spamNoClick,1e3/clicksPerSecond),$J("#toggleSpammerBtn").html("<span>Disable Particle Spam</span>"))}var debug=!1,clicksPerSecond=g_TuningData.abilities[1].max_num_clicks,autoClickerVariance=Math.floor(clicksPerSecond/10);clicksPerSecond-=Math.ceil(autoClickerVariance/2);var respawnCheckFreq=5e3,targetSwapperFreq=1e3,abilityUseCheckFreq=2e3,itemUseCheckFreq=5e3,seekHealingPercent=20,upgradeManagerFreq=5e3,useMedicsAtPercent=30,useMedicsAtLanePercent=50,useMedicsAtLanePercentAliveReq=40,useNukeOnSpawnerAbovePercent=75,useMetalDetectorOnBossBelowPercent=30,useStealHealthAtPercent=15,useRainingGoldAbovePercent=75,autoClickerFreq=1e3,autoRespawner,autoClicker,autoTargetSwapper,autoTargetSwapperElementUpdate,autoAbilityUser,autoItemUser,autoUpgradeManager,elementUpdateRate=6e4,userElementMultipliers=[1,1,1,1],userMaxElementMultiiplier=1,swapReason;if("undefined"!=typeof unsafeWindow){unsafeWindow.startAutoClicker=startAutoClicker,unsafeWindow.startAutoRespawner=startAutoRespawner,unsafeWindow.startAutoTargetSwapper=startAutoTargetSwapper,unsafeWindow.startAutoAbilityUser=startAutoAbilityUser,unsafeWindow.startAutoItemUser=startAutoItemUser,unsafeWindow.startAllAutos=startAllAutos,unsafeWindow.startAutoUpgradeManager=startAutoUpgradeManager,unsafeWindow.stopAutoClicker=stopAutoClicker,unsafeWindow.stopAutoRespawner=stopAutoRespawner,unsafeWindow.stopAutoTargetSwapper=stopAutoTargetSwapper,unsafeWindow.stopAutoAbilityUser=stopAutoAbilityUser,unsafeWindow.stopAutoItemUser=stopAutoItemUser,unsafeWindow.stopAutoUpgradeManager=stopAutoUpgradeManager,unsafeWindow.stopAllAutos=stopAllAutos,unsafeWindow.disableAutoNukes=disableAutoNukes,unsafeWindow.castAbility=castAbility,unsafeWindow.hasAbility=hasAbility,unsafeWindow.toggleAutoClicker=toggleAutoClicker,unsafeWindow.toggleAutoTargetSwapper=toggleAutoTargetSwapper,unsafeWindow.toggleAutoAbilityUser=toggleAutoAbilityUser,unsafeWindow.toggleAutoItemUser=toggleAutoItemUser,unsafeWindow.toggleAutoUpgradeManager=toggleAutoUpgradeManager,unsafeWindow.spamNoClick=spamNoClick,unsafeWindow.toggleSpammer=toggleSpammer,unsafeWindow.debug=debug;var debugChecker=setInterval(function(){unsafeWindow.debug!=unsafeWindow.getDebug()&&setDebug(unsafeWindow.debug)},1e3);unsafeWindow.getDebug=function(){return debug},unsafeWindow.setDebug=function(e){debug=e}}var startAll=setInterval(function(){gameRunning()&&(startAllAutos(),addPointer(),clearInterval(startAll),addCustomButtons(),$J(".leave_game_btn").mouseover(function(){$J(".leave_game_helper").show()}).mouseout(function(){$J(".leave_game_helper").hide()}),$J(".leave_game_helper").hide(),"function"==typeof runMaster&&(location.search.match(/slave/)?runSlave():runMaster()),CSceneGame.prototype.ClearNewPlayer=function(){if(this.m_spriteFinger){{WebStorage.SetLocal("mg_how2click",1)}$J("#newplayer").hide()}})},1e3),spammer;