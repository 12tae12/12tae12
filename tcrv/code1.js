gdjs.GameCode = {};
gdjs.GameCode.localVariables = [];
gdjs.GameCode.GDDeath_9595itselfObjects1= [];
gdjs.GameCode.GDDeath_9595itselfObjects2= [];
gdjs.GameCode.GDDeath_9595itselfObjects3= [];
gdjs.GameCode.GDDeath_9595itselfObjects4= [];
gdjs.GameCode.GDDeath_9595itselfObjects5= [];
gdjs.GameCode.GDDeath_9595itselfObjects6= [];
gdjs.GameCode.GDfenceObjects1= [];
gdjs.GameCode.GDfenceObjects2= [];
gdjs.GameCode.GDfenceObjects3= [];
gdjs.GameCode.GDfenceObjects4= [];
gdjs.GameCode.GDfenceObjects5= [];
gdjs.GameCode.GDfenceObjects6= [];
gdjs.GameCode.GDHighScoreObjects1= [];
gdjs.GameCode.GDHighScoreObjects2= [];
gdjs.GameCode.GDHighScoreObjects3= [];
gdjs.GameCode.GDHighScoreObjects4= [];
gdjs.GameCode.GDHighScoreObjects5= [];
gdjs.GameCode.GDHighScoreObjects6= [];
gdjs.GameCode.GDScoreTextObjects1= [];
gdjs.GameCode.GDScoreTextObjects2= [];
gdjs.GameCode.GDScoreTextObjects3= [];
gdjs.GameCode.GDScoreTextObjects4= [];
gdjs.GameCode.GDScoreTextObjects5= [];
gdjs.GameCode.GDScoreTextObjects6= [];
gdjs.GameCode.GDsun_9595flower_9595seedsObjects1= [];
gdjs.GameCode.GDsun_9595flower_9595seedsObjects2= [];
gdjs.GameCode.GDsun_9595flower_9595seedsObjects3= [];
gdjs.GameCode.GDsun_9595flower_9595seedsObjects4= [];
gdjs.GameCode.GDsun_9595flower_9595seedsObjects5= [];
gdjs.GameCode.GDsun_9595flower_9595seedsObjects6= [];
gdjs.GameCode.GDChickenObjects1= [];
gdjs.GameCode.GDChickenObjects2= [];
gdjs.GameCode.GDChickenObjects3= [];
gdjs.GameCode.GDChickenObjects4= [];
gdjs.GameCode.GDChickenObjects5= [];
gdjs.GameCode.GDChickenObjects6= [];
gdjs.GameCode.GDTutorialTextObjects1= [];
gdjs.GameCode.GDTutorialTextObjects2= [];
gdjs.GameCode.GDTutorialTextObjects3= [];
gdjs.GameCode.GDTutorialTextObjects4= [];
gdjs.GameCode.GDTutorialTextObjects5= [];
gdjs.GameCode.GDTutorialTextObjects6= [];
gdjs.GameCode.GDGrassandSandObjects1= [];
gdjs.GameCode.GDGrassandSandObjects2= [];
gdjs.GameCode.GDGrassandSandObjects3= [];
gdjs.GameCode.GDGrassandSandObjects4= [];
gdjs.GameCode.GDGrassandSandObjects5= [];
gdjs.GameCode.GDGrassandSandObjects6= [];
gdjs.GameCode.GDWallObjects1= [];
gdjs.GameCode.GDWallObjects2= [];
gdjs.GameCode.GDWallObjects3= [];
gdjs.GameCode.GDWallObjects4= [];
gdjs.GameCode.GDWallObjects5= [];
gdjs.GameCode.GDWallObjects6= [];
gdjs.GameCode.GDDesertBackground2Objects1= [];
gdjs.GameCode.GDDesertBackground2Objects2= [];
gdjs.GameCode.GDDesertBackground2Objects3= [];
gdjs.GameCode.GDDesertBackground2Objects4= [];
gdjs.GameCode.GDDesertBackground2Objects5= [];
gdjs.GameCode.GDDesertBackground2Objects6= [];
gdjs.GameCode.GDFallTreesBackgroundObjects1= [];
gdjs.GameCode.GDFallTreesBackgroundObjects2= [];
gdjs.GameCode.GDFallTreesBackgroundObjects3= [];
gdjs.GameCode.GDFallTreesBackgroundObjects4= [];
gdjs.GameCode.GDFallTreesBackgroundObjects5= [];
gdjs.GameCode.GDFallTreesBackgroundObjects6= [];
gdjs.GameCode.GDForestBackgroundObjects1= [];
gdjs.GameCode.GDForestBackgroundObjects2= [];
gdjs.GameCode.GDForestBackgroundObjects3= [];
gdjs.GameCode.GDForestBackgroundObjects4= [];
gdjs.GameCode.GDForestBackgroundObjects5= [];
gdjs.GameCode.GDForestBackgroundObjects6= [];
gdjs.GameCode.GDWall2Objects1= [];
gdjs.GameCode.GDWall2Objects2= [];
gdjs.GameCode.GDWall2Objects3= [];
gdjs.GameCode.GDWall2Objects4= [];
gdjs.GameCode.GDWall2Objects5= [];
gdjs.GameCode.GDWall2Objects6= [];


gdjs.GameCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.systemInfo.isMobile();
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.GameCode.GDTutorialTextObjects2, gdjs.GameCode.GDTutorialTextObjects3);

{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects3[i].setTextAlignment("center");
}
}{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects3[i].setString("Touch anywhere On screen to jump/start");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("Highscore", "Highscore");
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDHighScoreObjects2 */
{gdjs.evtTools.storage.readNumberFromJSONFile("Highscore", "Highscore", runtimeScene, runtimeScene.getScene().getVariables().get("TempSaveValue"));
}{runtimeScene.getGame().getVariables().getFromIndex(1).setNumber(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("TempSaveValue")));
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects2[i].setString("Highscore: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
}}

}


};gdjs.GameCode.asyncCallback15098428 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("HighScore"), gdjs.GameCode.GDHighScoreObjects3);

{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects3[i].setString("Highscore: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
}gdjs.GameCode.localVariables.length = 0;
}
gdjs.GameCode.eventsList1 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameCode.localVariables);
for (const obj of gdjs.GameCode.GDHighScoreObjects2) asyncObjectsList.addObject("HighScore", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(2), (runtimeScene) => (gdjs.GameCode.asyncCallback15098428(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.input.anyKeyReleased(runtimeScene);
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Right");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtsExt__Gamepads__C_Any_Button_pressed.func(runtimeScene, 1, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects2);
gdjs.copyArray(runtimeScene.getObjects("TutorialText"), gdjs.GameCode.GDTutorialTextObjects2);
{runtimeScene.getScene().getVariables().getFromIndex(1).setString("Playing");
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "obstacle_spawn");
}{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.GameCode.GDChickenObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects2[i].activateBehavior("PlatformerObject", true);
}
}{for(var i = 0, len = gdjs.GameCode.GDChickenObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects2[i].getBehavior("Animation").setAnimationName("Run");
}
}}

}


};gdjs.GameCode.eventsList3 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1)) == "Preparing";
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameCode.eventsList2(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.asyncCallback15104484 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameCode.localVariables);
gdjs.GameCode.localVariables.length = 0;
}
gdjs.GameCode.eventsList4 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(21), (runtimeScene) => (gdjs.GameCode.asyncCallback15104484(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameCode.eventsList5 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects4);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDChickenObjects4.length;i<l;++i) {
    if ( gdjs.GameCode.GDChickenObjects4[i].getBehavior("PlatformerObject").isJumping() ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDChickenObjects4[k] = gdjs.GameCode.GDChickenObjects4[i];
        ++k;
    }
}
gdjs.GameCode.GDChickenObjects4.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15106092);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSound(runtimeScene, "Jump.mp3", false, 100, 1);
}}

}


};gdjs.GameCode.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Up");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "d");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "s");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "a");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "w");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Right");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.anyKeyPressed(runtimeScene);
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtsExt__Gamepads__C_Any_Button_pressed.func(runtimeScene, 1, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15107916);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects3);
{for(var i = 0, len = gdjs.GameCode.GDChickenObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects3[i].getBehavior("PlatformerObject").simulateJumpKey();
}
}}

}


};gdjs.GameCode.eventsList7 = function(runtimeScene) {

{


gdjs.GameCode.eventsList5(runtimeScene);
}


{


gdjs.GameCode.eventsList6(runtimeScene);
}


};gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDChickenObjects3Objects = Hashtable.newFrom({"Chicken": gdjs.GameCode.GDChickenObjects3});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects3Objects = Hashtable.newFrom({"sun_flower_seeds": gdjs.GameCode.GDsun_9595flower_9595seedsObjects3});
gdjs.GameCode.eventsList8 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getGame().getVariables().getFromIndex(0).add(Math.round(gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene) * 100));
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects3);
gdjs.copyArray(runtimeScene.getObjects("sun_flower_seeds"), gdjs.GameCode.GDsun_9595flower_9595seedsObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDChickenObjects3Objects, gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects3Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDsun_9595flower_9595seedsObjects3 */
{runtimeScene.getGame().getVariables().getFromIndex(0).add(750);
}{for(var i = 0, len = gdjs.GameCode.GDsun_9595flower_9595seedsObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDsun_9595flower_9595seedsObjects3[i].deleteFromScene(runtimeScene);
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "Bonus.mp3", false, 100, 0.5);
}}

}


};gdjs.GameCode.mapOfEmptyGDGrassandSandObjects = Hashtable.newFrom({"GrassandSand": []});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDGrassandSandObjects4Objects = Hashtable.newFrom({"GrassandSand": gdjs.GameCode.GDGrassandSandObjects4});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDGrassandSandObjects4Objects = Hashtable.newFrom({"GrassandSand": gdjs.GameCode.GDGrassandSandObjects4});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects4Objects = Hashtable.newFrom({"Death_itself": gdjs.GameCode.GDDeath_9595itselfObjects4});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDfenceObjects4Objects = Hashtable.newFrom({"fence": gdjs.GameCode.GDfenceObjects4});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects5Objects = Hashtable.newFrom({"sun_flower_seeds": gdjs.GameCode.GDsun_9595flower_9595seedsObjects5});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects4Objects = Hashtable.newFrom({"sun_flower_seeds": gdjs.GameCode.GDsun_9595flower_9595seedsObjects4});
gdjs.GameCode.eventsList9 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.GameCode.GDfenceObjects4, gdjs.GameCode.GDfenceObjects5);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDfenceObjects5.length;i<l;++i) {
    if ( gdjs.GameCode.GDfenceObjects5[i].getVariableNumber(gdjs.GameCode.GDfenceObjects5[i].getVariables().getFromIndex(0)) == 0 ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDfenceObjects5[k] = gdjs.GameCode.GDfenceObjects5[i];
        ++k;
    }
}
gdjs.GameCode.GDfenceObjects5.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDfenceObjects5 */
gdjs.GameCode.GDsun_9595flower_9595seedsObjects5.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects5Objects, (( gdjs.GameCode.GDfenceObjects5.length === 0 ) ? 0 :gdjs.GameCode.GDfenceObjects5[0].getPointX("RewardUp")), (( gdjs.GameCode.GDfenceObjects5.length === 0 ) ? 0 :gdjs.GameCode.GDfenceObjects5[0].getPointY("RewardUp")), "");
}{for(var i = 0, len = gdjs.GameCode.GDsun_9595flower_9595seedsObjects5.length ;i < len;++i) {
    gdjs.GameCode.GDsun_9595flower_9595seedsObjects5[i].setScale(gdjs.GameCode.GDsun_9595flower_9595seedsObjects5[i].getScaleMean() * (60 / (Math.max((gdjs.GameCode.GDsun_9595flower_9595seedsObjects5[i].getWidth()), (gdjs.GameCode.GDsun_9595flower_9595seedsObjects5[i].getHeight())))));
}
}}

}


{

/* Reuse gdjs.GameCode.GDfenceObjects4 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDfenceObjects4.length;i<l;++i) {
    if ( gdjs.GameCode.GDfenceObjects4[i].getVariableNumber(gdjs.GameCode.GDfenceObjects4[i].getVariables().getFromIndex(0)) == 1 ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDfenceObjects4[k] = gdjs.GameCode.GDfenceObjects4[i];
        ++k;
    }
}
gdjs.GameCode.GDfenceObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDfenceObjects4 */
gdjs.GameCode.GDsun_9595flower_9595seedsObjects4.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects4Objects, (( gdjs.GameCode.GDfenceObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDfenceObjects4[0].getPointX("RewardDown")), (( gdjs.GameCode.GDfenceObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDfenceObjects4[0].getPointY("RewardDown")), "");
}{for(var i = 0, len = gdjs.GameCode.GDsun_9595flower_9595seedsObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDsun_9595flower_9595seedsObjects4[i].setScale(gdjs.GameCode.GDsun_9595flower_9595seedsObjects4[i].getScaleMean() * (60 / (Math.max((gdjs.GameCode.GDsun_9595flower_9595seedsObjects4[i].getWidth()), (gdjs.GameCode.GDsun_9595flower_9595seedsObjects4[i].getHeight())))));
}
}}

}


};gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects5Objects = Hashtable.newFrom({"Death_itself": gdjs.GameCode.GDDeath_9595itselfObjects5});
gdjs.GameCode.eventsList10 = function(runtimeScene) {

};gdjs.GameCode.eventsList11 = function(runtimeScene) {

{


let stopDoWhile_0 = false;
do {
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects5);
gdjs.copyArray(runtimeScene.getObjects("GrassandSand"), gdjs.GameCode.GDGrassandSandObjects5);
gdjs.GameCode.GDDeath_9595itselfObjects5.length = 0;

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("SpawneddangerInField")) < gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("dangerInField"));
if (isConditionTrue_0) {
let isConditionTrue_0 = false;
if (true) {
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects5Objects, gdjs.randomInRange(75, 125) + 960 + (( gdjs.GameCode.GDChickenObjects5.length === 0 ) ? 0 :gdjs.GameCode.GDChickenObjects5[0].getPointX("")), (( gdjs.GameCode.GDGrassandSandObjects5.length === 0 ) ? 0 :gdjs.GameCode.GDGrassandSandObjects5[0].getAABBTop()), "");
}{runtimeScene.getScene().getVariables().get("SpawneddangerInField").add(1);
}{for(var i = 0, len = gdjs.GameCode.GDDeath_9595itselfObjects5.length ;i < len;++i) {
    gdjs.GameCode.GDDeath_9595itselfObjects5[i].setScale(gdjs.GameCode.GDDeath_9595itselfObjects5[i].getScaleMean() * (100 / (Math.max((gdjs.GameCode.GDDeath_9595itselfObjects5[i].getWidth()), (gdjs.GameCode.GDDeath_9595itselfObjects5[i].getHeight())))));
}
}
{ //Subevents: 
gdjs.GameCode.eventsList10(runtimeScene);} //Subevents end.
}
} else stopDoWhile_0 = true; 
} while (!stopDoWhile_0);

}


{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("SpawneddangerInField").setNumber(0);
}}

}


};gdjs.GameCode.eventsList12 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) == 0;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects4);
gdjs.copyArray(runtimeScene.getObjects("GrassandSand"), gdjs.GameCode.GDGrassandSandObjects4);
gdjs.GameCode.GDDeath_9595itselfObjects4.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects4Objects, gdjs.randomInRange(75, 125) + 960 + (( gdjs.GameCode.GDChickenObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDChickenObjects4[0].getPointX("")), (( gdjs.GameCode.GDGrassandSandObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDGrassandSandObjects4[0].getAABBTop()), "");
}{for(var i = 0, len = gdjs.GameCode.GDDeath_9595itselfObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDDeath_9595itselfObjects4[i].setScale(gdjs.GameCode.GDDeath_9595itselfObjects4[i].getScaleMean() * (100 / (Math.max((gdjs.GameCode.GDDeath_9595itselfObjects4[i].getWidth()), (gdjs.GameCode.GDDeath_9595itselfObjects4[i].getHeight())))));
}
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) == 1;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects4);
gdjs.copyArray(runtimeScene.getObjects("GrassandSand"), gdjs.GameCode.GDGrassandSandObjects4);
gdjs.GameCode.GDfenceObjects4.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDfenceObjects4Objects, gdjs.randomInRange(75, 125) + 960 + (( gdjs.GameCode.GDChickenObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDChickenObjects4[0].getPointX("")), (( gdjs.GameCode.GDGrassandSandObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDGrassandSandObjects4[0].getAABBTop()) - 64, "");
}{for(var i = 0, len = gdjs.GameCode.GDfenceObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDfenceObjects4[i].returnVariable(gdjs.GameCode.GDfenceObjects4[i].getVariables().getFromIndex(0)).setNumber(gdjs.randomInRange(0, 2));
}
}{for(var i = 0, len = gdjs.GameCode.GDfenceObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDfenceObjects4[i].setScale(gdjs.GameCode.GDfenceObjects4[i].getScaleMean() * (125 / (Math.max((gdjs.GameCode.GDfenceObjects4[i].getWidth()), (gdjs.GameCode.GDfenceObjects4[i].getHeight())))));
}
}
{ //Subevents
gdjs.GameCode.eventsList9(runtimeScene);} //End of subevents
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) == 2;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("dangerInField").setNumber(gdjs.randomInRange(1, 1 + Math.round(gdjs.evtTools.common.clamp(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)) / 3000, 0, 4))));
}
{ //Subevents
gdjs.GameCode.eventsList11(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList13 = function(runtimeScene) {

{



}


{

gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects4);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDChickenObjects4.length;i<l;++i) {
    if ( gdjs.GameCode.GDChickenObjects4[i].getBehavior("PlatformerObject").getMaxSpeed() < 800 ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDChickenObjects4[k] = gdjs.GameCode.GDChickenObjects4[i];
        ++k;
    }
}
gdjs.GameCode.GDChickenObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDChickenObjects4 */
{for(var i = 0, len = gdjs.GameCode.GDChickenObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects4[i].getBehavior("PlatformerObject").setMaxSpeed((gdjs.GameCode.GDChickenObjects4[i].getBehavior("PlatformerObject").getMaxSpeed()) + gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene) * 6);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2)) > 0.7;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(2).sub(gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene) / 30);
}}

}


{



}


{

gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects4);
gdjs.copyArray(runtimeScene.getObjects("GrassandSand"), gdjs.GameCode.GDGrassandSandObjects4);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDGrassandSandObjects4.length;i<l;++i) {
    if ( gdjs.GameCode.GDGrassandSandObjects4[i].getX() < (( gdjs.GameCode.GDChickenObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDChickenObjects4[0].getPointX("")) - (gdjs.GameCode.GDGrassandSandObjects4[i].getWidth()) - 17 ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDGrassandSandObjects4[k] = gdjs.GameCode.GDGrassandSandObjects4[i];
        ++k;
    }
}
gdjs.GameCode.GDGrassandSandObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDGrassandSandObjects4 */
{for(var i = 0, len = gdjs.GameCode.GDGrassandSandObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDGrassandSandObjects4[i].deleteFromScene(runtimeScene);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("GrassandSand"), gdjs.GameCode.GDGrassandSandObjects4);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfEmptyGDGrassandSandObjects) < 16;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.pickRandomObject((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDGrassandSandObjects4Objects);
}
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDGrassandSandObjects4 */
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDGrassandSandObjects4Objects, (( gdjs.GameCode.GDGrassandSandObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDGrassandSandObjects4[0].getX()) + (( gdjs.GameCode.GDGrassandSandObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDGrassandSandObjects4[0].getWidth()), (( gdjs.GameCode.GDGrassandSandObjects4.length === 0 ) ? 0 :gdjs.GameCode.GDGrassandSandObjects4[0].getY()), "");
}{for(var i = 0, len = gdjs.GameCode.GDGrassandSandObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDGrassandSandObjects4[i].setWidth(3000);
}
}{for(var i = 0, len = gdjs.GameCode.GDGrassandSandObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDGrassandSandObjects4[i].setHeight(224);
}
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "obstacle_spawn") >= gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2));
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(gdjs.randomInRange(0, 2));
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "obstacle_spawn");
}
{ //Subevents
gdjs.GameCode.eventsList12(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDChickenObjects2Objects = Hashtable.newFrom({"Chicken": gdjs.GameCode.GDChickenObjects2});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects2Objects = Hashtable.newFrom({"Death_itself": gdjs.GameCode.GDDeath_9595itselfObjects2});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects2ObjectsGDgdjs_9546GameCode_9546GDfenceObjects2ObjectsGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects2Objects = Hashtable.newFrom({"Death_itself": gdjs.GameCode.GDDeath_9595itselfObjects2, "fence": gdjs.GameCode.GDfenceObjects2, "sun_flower_seeds": gdjs.GameCode.GDsun_9595flower_9595seedsObjects2});
gdjs.GameCode.eventsList14 = function(runtimeScene) {

{



}


{

gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects2);
gdjs.copyArray(runtimeScene.getObjects("Death_itself"), gdjs.GameCode.GDDeath_9595itselfObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDChickenObjects2Objects, gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects2Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDChickenObjects2 */
/* Reuse gdjs.GameCode.GDDeath_9595itselfObjects2 */
gdjs.copyArray(runtimeScene.getObjects("fence"), gdjs.GameCode.GDfenceObjects2);
gdjs.copyArray(runtimeScene.getObjects("sun_flower_seeds"), gdjs.GameCode.GDsun_9595flower_9595seedsObjects2);
{for(var i = 0, len = gdjs.GameCode.GDChickenObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects2[i].getBehavior("PlatformerObject").abortJump();
}
}{runtimeScene.getScene().getVariables().getFromIndex(1).setString("Dead");
}{gdjs.evtTools.runtimeScene.pauseTimer(runtimeScene, "obstacle_spawn");
}{gdjs.evtTools.object.pickAllObjects((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDDeath_95959595itselfObjects2ObjectsGDgdjs_9546GameCode_9546GDfenceObjects2ObjectsGDgdjs_9546GameCode_9546GDsun_95959595flower_95959595seedsObjects2Objects);
}{for(var i = 0, len = gdjs.GameCode.GDDeath_9595itselfObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDDeath_9595itselfObjects2[i].clearForces();
}
for(var i = 0, len = gdjs.GameCode.GDfenceObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDfenceObjects2[i].clearForces();
}
for(var i = 0, len = gdjs.GameCode.GDsun_9595flower_9595seedsObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDsun_9595flower_9595seedsObjects2[i].clearForces();
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "Death.mp3", false, 80, 1);
}{for(var i = 0, len = gdjs.GameCode.GDChickenObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects2[i].getBehavior("Animation").setAnimationName("Hit");
}
}}

}


};gdjs.GameCode.eventsList15 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects3);
gdjs.copyArray(runtimeScene.getObjects("Wall"), gdjs.GameCode.GDWallObjects3);
{for(var i = 0, len = gdjs.GameCode.GDWallObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDWallObjects3[i].setXOffset(gdjs.evtTools.camera.getCameraX(runtimeScene, "", 0) / 4);
}
}{for(var i = 0, len = gdjs.GameCode.GDChickenObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects3[i].getBehavior("PlatformerObject").simulateRightKey();
}
}
{ //Subevents
gdjs.GameCode.eventsList4(runtimeScene);} //End of subevents
}

}


{


gdjs.GameCode.eventsList7(runtimeScene);
}


{


gdjs.GameCode.eventsList8(runtimeScene);
}


{


gdjs.GameCode.eventsList13(runtimeScene);
}


{


gdjs.GameCode.eventsList14(runtimeScene);
}


};gdjs.GameCode.eventsList16 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1)) == "Playing";
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.GameCode.GDScoreTextObjects2);
{for(var i = 0, len = gdjs.GameCode.GDScoreTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDScoreTextObjects2[i].setString("Score: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(0)));
}
}
{ //Subevents
gdjs.GameCode.eventsList15(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList17 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.systemInfo.isMobile();
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.GameCode.GDTutorialTextObjects2, gdjs.GameCode.GDTutorialTextObjects3);

{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects3[i].setString("Touch anywhere On screen to restart");
}
}{gdjs.deviceVibration.startVibration(2);
}{gdjs.deviceVibration.stopVibration();
}}

}


{


let isConditionTrue_0 = false;
{
/* Reuse gdjs.GameCode.GDTutorialTextObjects2 */
{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects2[i].hide(false);
}
}{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects2[i].setTextAlignment("center");
}
}}

}


};gdjs.GameCode.eventsList18 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15128348);
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("TutorialText"), gdjs.GameCode.GDTutorialTextObjects2);
{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects2[i].setString("Press any key to restart the game");
}
}
{ //Subevents
gdjs.GameCode.eventsList17(runtimeScene);} //End of subevents
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)) > gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("HighScore"), gdjs.GameCode.GDHighScoreObjects2);
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.GameCode.GDScoreTextObjects2);
{runtimeScene.getGame().getVariables().getFromIndex(1).setNumber(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)));
}{for(var i = 0, len = gdjs.GameCode.GDScoreTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDScoreTextObjects2[i].setString("Score: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects2[i].setString("Highscore: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
}{gdjs.evtTools.storage.writeNumberInJSONFile("Highscore", "Highscore", gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(1)));
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.input.anyKeyReleased(runtimeScene);
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtsExt__Gamepads__C_Any_Button_pressed.func(runtimeScene, 1, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", true);
}}

}


};gdjs.GameCode.eventsList19 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1)) == "Dead";
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameCode.eventsList18(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList20 = function(runtimeScene) {

{


gdjs.GameCode.eventsList3(runtimeScene);
}


{


gdjs.GameCode.eventsList16(runtimeScene);
}


{


gdjs.GameCode.eventsList19(runtimeScene);
}


};gdjs.GameCode.eventsList21 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Chicken"), gdjs.GameCode.GDChickenObjects2);
gdjs.copyArray(runtimeScene.getObjects("HighScore"), gdjs.GameCode.GDHighScoreObjects2);
gdjs.copyArray(runtimeScene.getObjects("TutorialText"), gdjs.GameCode.GDTutorialTextObjects2);
gdjs.copyArray(runtimeScene.getObjects("Wall"), gdjs.GameCode.GDWallObjects2);
{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getGame().getVariables().getFromIndex(3), false);
}{gdjs.evtTools.sound.preloadMusic(runtimeScene, "creepy-devil-dance-166763.mp3");
}{gdjs.evtTools.sound.playMusic(runtimeScene, "creepy-devil-dance-166763.mp3", true, 50, 1);
}{runtimeScene.getGame().getVariables().getFromIndex(2).setString("0.2");
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getGame().getVariables().getFromIndex(3), true);
}{for(var i = 0, len = gdjs.GameCode.GDTutorialTextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTutorialTextObjects2[i].setString("Use mouse or WASD to start.");
}
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects2[i].setString("Highscore: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
}{for(var i = 0, len = gdjs.GameCode.GDWallObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDWallObjects2[i].setXOffset(gdjs.evtTools.camera.getCameraX(runtimeScene, "", 0) / 4);
}
}{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(0);
}{for(var i = 0, len = gdjs.GameCode.GDChickenObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects2[i].activateBehavior("PlatformerObject", false);
}
}{for(var i = 0, len = gdjs.GameCode.GDChickenObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDChickenObjects2[i].getBehavior("Animation").setAnimationName("Idle");
}
}
{ //Subevents
gdjs.GameCode.eventsList0(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.systemInfo.isMobile();
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("HighScore"), gdjs.GameCode.GDHighScoreObjects2);
{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects2[i].setString("Highscore: Andriod update link copied to clipbord.");
}
}{gdjs.evtsExt__Clipboard__WriteText.func(runtimeScene, "https://1t2.pages.dev/tcrv/ud/download.html", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
{ //Subevents
gdjs.GameCode.eventsList1(runtimeScene);} //End of subevents
}

}


{


gdjs.GameCode.eventsList20(runtimeScene);
}


};gdjs.GameCode.eventsList22 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{

{ //Subevents
gdjs.GameCode.eventsList21(runtimeScene);} //End of subevents
}

}


};

gdjs.GameCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameCode.GDDeath_9595itselfObjects1.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects2.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects3.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects4.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects5.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects6.length = 0;
gdjs.GameCode.GDfenceObjects1.length = 0;
gdjs.GameCode.GDfenceObjects2.length = 0;
gdjs.GameCode.GDfenceObjects3.length = 0;
gdjs.GameCode.GDfenceObjects4.length = 0;
gdjs.GameCode.GDfenceObjects5.length = 0;
gdjs.GameCode.GDfenceObjects6.length = 0;
gdjs.GameCode.GDHighScoreObjects1.length = 0;
gdjs.GameCode.GDHighScoreObjects2.length = 0;
gdjs.GameCode.GDHighScoreObjects3.length = 0;
gdjs.GameCode.GDHighScoreObjects4.length = 0;
gdjs.GameCode.GDHighScoreObjects5.length = 0;
gdjs.GameCode.GDHighScoreObjects6.length = 0;
gdjs.GameCode.GDScoreTextObjects1.length = 0;
gdjs.GameCode.GDScoreTextObjects2.length = 0;
gdjs.GameCode.GDScoreTextObjects3.length = 0;
gdjs.GameCode.GDScoreTextObjects4.length = 0;
gdjs.GameCode.GDScoreTextObjects5.length = 0;
gdjs.GameCode.GDScoreTextObjects6.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects1.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects2.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects3.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects4.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects5.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects6.length = 0;
gdjs.GameCode.GDChickenObjects1.length = 0;
gdjs.GameCode.GDChickenObjects2.length = 0;
gdjs.GameCode.GDChickenObjects3.length = 0;
gdjs.GameCode.GDChickenObjects4.length = 0;
gdjs.GameCode.GDChickenObjects5.length = 0;
gdjs.GameCode.GDChickenObjects6.length = 0;
gdjs.GameCode.GDTutorialTextObjects1.length = 0;
gdjs.GameCode.GDTutorialTextObjects2.length = 0;
gdjs.GameCode.GDTutorialTextObjects3.length = 0;
gdjs.GameCode.GDTutorialTextObjects4.length = 0;
gdjs.GameCode.GDTutorialTextObjects5.length = 0;
gdjs.GameCode.GDTutorialTextObjects6.length = 0;
gdjs.GameCode.GDGrassandSandObjects1.length = 0;
gdjs.GameCode.GDGrassandSandObjects2.length = 0;
gdjs.GameCode.GDGrassandSandObjects3.length = 0;
gdjs.GameCode.GDGrassandSandObjects4.length = 0;
gdjs.GameCode.GDGrassandSandObjects5.length = 0;
gdjs.GameCode.GDGrassandSandObjects6.length = 0;
gdjs.GameCode.GDWallObjects1.length = 0;
gdjs.GameCode.GDWallObjects2.length = 0;
gdjs.GameCode.GDWallObjects3.length = 0;
gdjs.GameCode.GDWallObjects4.length = 0;
gdjs.GameCode.GDWallObjects5.length = 0;
gdjs.GameCode.GDWallObjects6.length = 0;
gdjs.GameCode.GDDesertBackground2Objects1.length = 0;
gdjs.GameCode.GDDesertBackground2Objects2.length = 0;
gdjs.GameCode.GDDesertBackground2Objects3.length = 0;
gdjs.GameCode.GDDesertBackground2Objects4.length = 0;
gdjs.GameCode.GDDesertBackground2Objects5.length = 0;
gdjs.GameCode.GDDesertBackground2Objects6.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects1.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects2.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects3.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects4.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects5.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects6.length = 0;
gdjs.GameCode.GDForestBackgroundObjects1.length = 0;
gdjs.GameCode.GDForestBackgroundObjects2.length = 0;
gdjs.GameCode.GDForestBackgroundObjects3.length = 0;
gdjs.GameCode.GDForestBackgroundObjects4.length = 0;
gdjs.GameCode.GDForestBackgroundObjects5.length = 0;
gdjs.GameCode.GDForestBackgroundObjects6.length = 0;
gdjs.GameCode.GDWall2Objects1.length = 0;
gdjs.GameCode.GDWall2Objects2.length = 0;
gdjs.GameCode.GDWall2Objects3.length = 0;
gdjs.GameCode.GDWall2Objects4.length = 0;
gdjs.GameCode.GDWall2Objects5.length = 0;
gdjs.GameCode.GDWall2Objects6.length = 0;

gdjs.GameCode.eventsList22(runtimeScene);
gdjs.GameCode.GDDeath_9595itselfObjects1.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects2.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects3.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects4.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects5.length = 0;
gdjs.GameCode.GDDeath_9595itselfObjects6.length = 0;
gdjs.GameCode.GDfenceObjects1.length = 0;
gdjs.GameCode.GDfenceObjects2.length = 0;
gdjs.GameCode.GDfenceObjects3.length = 0;
gdjs.GameCode.GDfenceObjects4.length = 0;
gdjs.GameCode.GDfenceObjects5.length = 0;
gdjs.GameCode.GDfenceObjects6.length = 0;
gdjs.GameCode.GDHighScoreObjects1.length = 0;
gdjs.GameCode.GDHighScoreObjects2.length = 0;
gdjs.GameCode.GDHighScoreObjects3.length = 0;
gdjs.GameCode.GDHighScoreObjects4.length = 0;
gdjs.GameCode.GDHighScoreObjects5.length = 0;
gdjs.GameCode.GDHighScoreObjects6.length = 0;
gdjs.GameCode.GDScoreTextObjects1.length = 0;
gdjs.GameCode.GDScoreTextObjects2.length = 0;
gdjs.GameCode.GDScoreTextObjects3.length = 0;
gdjs.GameCode.GDScoreTextObjects4.length = 0;
gdjs.GameCode.GDScoreTextObjects5.length = 0;
gdjs.GameCode.GDScoreTextObjects6.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects1.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects2.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects3.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects4.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects5.length = 0;
gdjs.GameCode.GDsun_9595flower_9595seedsObjects6.length = 0;
gdjs.GameCode.GDChickenObjects1.length = 0;
gdjs.GameCode.GDChickenObjects2.length = 0;
gdjs.GameCode.GDChickenObjects3.length = 0;
gdjs.GameCode.GDChickenObjects4.length = 0;
gdjs.GameCode.GDChickenObjects5.length = 0;
gdjs.GameCode.GDChickenObjects6.length = 0;
gdjs.GameCode.GDTutorialTextObjects1.length = 0;
gdjs.GameCode.GDTutorialTextObjects2.length = 0;
gdjs.GameCode.GDTutorialTextObjects3.length = 0;
gdjs.GameCode.GDTutorialTextObjects4.length = 0;
gdjs.GameCode.GDTutorialTextObjects5.length = 0;
gdjs.GameCode.GDTutorialTextObjects6.length = 0;
gdjs.GameCode.GDGrassandSandObjects1.length = 0;
gdjs.GameCode.GDGrassandSandObjects2.length = 0;
gdjs.GameCode.GDGrassandSandObjects3.length = 0;
gdjs.GameCode.GDGrassandSandObjects4.length = 0;
gdjs.GameCode.GDGrassandSandObjects5.length = 0;
gdjs.GameCode.GDGrassandSandObjects6.length = 0;
gdjs.GameCode.GDWallObjects1.length = 0;
gdjs.GameCode.GDWallObjects2.length = 0;
gdjs.GameCode.GDWallObjects3.length = 0;
gdjs.GameCode.GDWallObjects4.length = 0;
gdjs.GameCode.GDWallObjects5.length = 0;
gdjs.GameCode.GDWallObjects6.length = 0;
gdjs.GameCode.GDDesertBackground2Objects1.length = 0;
gdjs.GameCode.GDDesertBackground2Objects2.length = 0;
gdjs.GameCode.GDDesertBackground2Objects3.length = 0;
gdjs.GameCode.GDDesertBackground2Objects4.length = 0;
gdjs.GameCode.GDDesertBackground2Objects5.length = 0;
gdjs.GameCode.GDDesertBackground2Objects6.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects1.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects2.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects3.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects4.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects5.length = 0;
gdjs.GameCode.GDFallTreesBackgroundObjects6.length = 0;
gdjs.GameCode.GDForestBackgroundObjects1.length = 0;
gdjs.GameCode.GDForestBackgroundObjects2.length = 0;
gdjs.GameCode.GDForestBackgroundObjects3.length = 0;
gdjs.GameCode.GDForestBackgroundObjects4.length = 0;
gdjs.GameCode.GDForestBackgroundObjects5.length = 0;
gdjs.GameCode.GDForestBackgroundObjects6.length = 0;
gdjs.GameCode.GDWall2Objects1.length = 0;
gdjs.GameCode.GDWall2Objects2.length = 0;
gdjs.GameCode.GDWall2Objects3.length = 0;
gdjs.GameCode.GDWall2Objects4.length = 0;
gdjs.GameCode.GDWall2Objects5.length = 0;
gdjs.GameCode.GDWall2Objects6.length = 0;


return;

}

gdjs['GameCode'] = gdjs.GameCode;
