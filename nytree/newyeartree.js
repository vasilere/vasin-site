<script type="text/j�vascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="js/jquery.countdown.min.js" type="text/j�vascript"></script>
<script src="js/jquery.countdown-ru.js" type="text/j�vascript"></script>
<script type="text/j�vascript">
    $(function () {
        var austDay = new Date(2011, 1, 1, 00, 00, 00) ;
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 1);
        $('#defaultCountdown').countdown({until: austDay});
        $('#year').text(austDay.getFullYear());
    });
</script>