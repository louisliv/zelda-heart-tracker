function getPercentageColor(){
    return function (value) {
    	value = value / 100
	    var hue = (value*120).toString(10);
	    return ["hsl(",hue,",100%,50%)"].join("");
    }
}

angular.module('project.utils.filters', [])
	.filter('getPercentageColor', getPercentageColor);