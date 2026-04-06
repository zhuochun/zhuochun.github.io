$(function() {
    var date = new Date();

    function sayaword() {
        var hour = date.getHours();

        return hour <=  5 ? "Hello" :
               hour <= 12 ? "Good morning" :
               hour <= 18 ? "Good afternoon" :
                            "Good evening";
    }

    $(".greeting").html(sayaword());

    $(".sidebar").addClass("sidebar-color-" + date.getDay());
});
