(function () {
window['CDesktop'] = {};
init = function () {
    listToDo();
    listReturn();
    loadStatisticStatus();
    $("#desktop #welcome a").click(hideWelcome);
};
loadStatisticStatus = function(){
	//CCore.loadPage('statistic_status', '../check/statistic.htm', function(){CCheckStatistic.init();});
};
listToDo = function () {
   
};
listReturn = function () {
    
};
openView = function () {
    var id = $(this).parent().attr("id");
    var form = $(this).parent().attr("form");
    var init = "C" +form+ "View.init('"+id+"');";
    CCore.loadModal('../'+form+'/view.htm', 949, 530, function () { eval(init) ;});
};
hideWelcome = function () {
    $("#desktop #welcome").slideUp(800);
};
window['CDesktop']['init'] = init;
window['CDesktop']['listToDo'] = listToDo;
window['CDesktop']['listReturn'] = listReturn;
})();