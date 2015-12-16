(function () {
    window['CCpu'] = {};
    init = function () {
        $("#form_cpu h1").html("系统监控");
		setInterval(load, 1000);
    };
    load=function(){
    	var cpuRate = getCpu()/100;
    	cpuRate = cpuRate.toFixed(2);
		var green = 500*cpuRate;
		$("#cpu span").width(green).html(cpuRate*100 + "%");
		var physical = getPhysicalMemory();
		var available = getMemoryAvailable();
		$("#mem_usage").html("可用内存" + available + "MB , 物理内存" + physical + "MB");
		var memRate = 1 - available/physical;
		memRate = memRate.toFixed(2);
		green = 500*memRate;
		$("#mem span").width(green).html(memRate*100 + "%");
	};
    getCpu=function(){
		return CCore.invoke('/service/core/getcpuload');
	};
	getPhysicalMemory=function(){
		return CCore.invoke('/service/core/getphysicalmemory');
	};
	getMemoryAvailable=function(){
		return CCore.invoke('/service/core/getmemoryavailable');
	};
    window['CCpu']['init'] = init;
})();
