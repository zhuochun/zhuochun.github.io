$(function() {
    function sayaword() {
        var hour = new Date().getHours();

        return hour <=  6 ? 'Hello' :
            hour <= 12 ? 'Good morning' :
            hour <= 18 ? 'Good afternoon' :
            hour <= 20 ? 'Good evening' : 'Hi';
    }

    $('.greeting').html(sayaword());

    // $('.dynamo').dynamo({
    //     delay: 1000,
    //     center: true,
    //     lines: [ 'listen', 'think aloud', 'learn fast',
    //              'code', 'photograph', 'write', 'run']
    // });
});
