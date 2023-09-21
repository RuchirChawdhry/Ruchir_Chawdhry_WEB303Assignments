/*
	WEB 303 Assignment 1 - jQuery
	Ruchir Chawdhry
*/

$(document).ready(function(){
    $("#yearly-salary, #percent").keyup(function(){
        const salary = parseFloat($("#yearly-salary").val()) || 0;
        const percent = parseFloat($("#percent").val()) || 0;
        const amount = (salary * (percent/100)).toFixed(2);
        $("#amount").text("$" + amount);
    });
});
