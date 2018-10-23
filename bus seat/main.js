
var settings = {
    rows: 5,
    // activeRow: [1, 1, false, false, -1],
    activeRow: [1, 1, false, 0, 0],
    get activeRowLength(){
        return this.activeRow.filter(i=>typeof i ==='number').length
    },
    cols: 15,
    rowCssPrefix: 'row-',
    colCssPrefix: 'col-',
    seatWidth: 35,
    seatHeight: 35,
    seatCss: 'seat',
    selectedSeatCss: 'selectedSeat',
    selectingSeatCss: 'selectingSeat'
};

var init = function (reservedSeat) {
    var str = [], seatNo, className;
    for (i = 0; i < settings.rows; i++) {
        for (j = 0; j < settings.cols; j++) {
            if(typeof settings['activeRow'][i] ==='number'){
                seatNo = (i + j * settings.activeRowLength + settings['activeRow'][i]);
                className = settings.seatCss + ' ' + settings.rowCssPrefix + i.toString() + ' ' + settings.colCssPrefix + j.toString();
                if ($.isArray(reservedSeat) && $.inArray(seatNo, reservedSeat) != -1) {
                    className += ' ' + settings.selectedSeatCss;
                }
                str.push('<li class="' + className + '"' +
                    'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
                    '<a title="' + seatNo + '">' + seatNo + '</a>' +
                    '</li>');
            }

        }
    }
    $('#place').html(str.join(''));
};
//case I: Show from starting
//init();

//Case II: If already booked
var bookedSeats = [5, 10, 25];
init(bookedSeats);



$('.' + settings.seatCss).click(function () {
    if ($(this).hasClass(settings.selectedSeatCss)){
        alert('This seat is already reserved');
    }
    else{
        $(this).toggleClass(settings.selectingSeatCss);
    }
});

$('#btnShow').click(function () {
    var str = [];
    $.each($('#place li.' + settings.selectedSeatCss + ' a, #place li.'+ settings.selectingSeatCss + ' a'), function (index, value) {
        str.push($(this).attr('title'));
    });
    alert(str.join(','));
})

$('#btnShowNew').click(function () {
    var str = [], item;
    $.each($('#place li.' + settings.selectingSeatCss + ' a'), function (index, value) {
        item = $(this).attr('title');
        str.push(item);
    });
    alert(str.join(','));
})