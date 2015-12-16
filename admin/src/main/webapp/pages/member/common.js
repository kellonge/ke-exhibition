(function (){
window['CMemberCommon'] = {};
fillStatus = function (controlID) {
	CDictPick.init(controlID, CDict.MemberStatus);
};
fillGroup = function (controlID) {
	CDictPick.init(controlID, CDict.Group);
};

window['CMemberCommon']['fillStatus']=fillStatus;
window['CMemberCommon']['fillGroup']=fillGroup;
})();
