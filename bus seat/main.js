var settings = {
    // rows: 5,
    // // activeRow: [1, 1, false, false, -1],
    // activeRow: [1, 1, false, 0, 0],
    // get activeRowLength() {
    //     return this.activeRow.filter(i => typeof i === 'number').length
    // },

    // seat : [
    //     [1,4,7,10,0,14,17,20,23],
    //     [2,5,8,11,0,15,18,21,24],
    //     [],
    //     [],
    //     [3,6,9,12,13,16,19,22,25]
    // ],
    seat : [
        [1,5,9 ,13,17,0 ,0 ,25,29,33,37],
        [2,6,10,14,18,0 ,0 ,26,30,34,38],
        [],
        [3,7,11,15,19,21,23,27,31,35,39],
        [4,8,12,16,20,22,24,28,32,36,40]
    ],
    cols: 15,
    rowCssPrefix: 'row-',
    colCssPrefix: 'col-',
    seatWidth: 40,
    seatHeight: 40,
    seatCss: 'seat',
    selectedSeatManCss: 'selectedSeatMan',
    selectedSeatWomanCss: 'selectedSeatWoman',
    selectingSeatCss: 'selectingSeat',
    noneDisplay:'noneDisplay'
};

var init = function (reservedSeat) {
    var str = [],  className;
    settings['seat'].forEach((list, index)=>{
        list.forEach((seatNo,jIndex)=>{
            className = '';
            if(seatNo){
                className = settings.seatCss + ' ' + settings.rowCssPrefix + index.toString() + ' ' + settings.colCssPrefix + jIndex.toString();
                let seatData = reservedSeat.find(i=>i['seatNumber']===seatNo);
                if (reservedSeat.length && typeof seatData === 'object') {
                    if(seatData['sex'] === 'male'){
                        className += ' '+settings.selectedSeatManCss;
                    }else if (seatData['sex'] === 'female'){
                        className +=' '+settings.selectedSeatWomanCss;
                    }
                }
            }else{
                className +=' '+settings.noneDisplay;
            }
            str.push('<li data="'+seatNo+'" class="' + className + '"' +
                'style="top:' + (index * settings.seatHeight).toString() + 'px;left:' + (jIndex * settings.seatWidth).toString() + 'px">' +
                // '<div class="seatInfo"><a title="' + seatNo + '">' + seatNo + '</a></div>' +
                '</li>');
        })
    });
    // for (i = 0; i < settings.rows; i++) {
    //     for (j = 0; j < settings.cols; j++) {
    //         if (typeof settings['activeRow'][i] === 'number') {
    //             seatNo = (i + j * settings.activeRowLength + settings['activeRow'][i]);
    //             className = settings.seatCss + ' ' + settings.rowCssPrefix + i.toString() + ' ' + settings.colCssPrefix + j.toString();
    //             let seatData = reservedSeat.find(i=>i['seatNumber']===seatNo)
    //             if (reservedSeat.length && typeof seatData === 'object') {
    //                 className += seatData['sex'] === 'male' ? ' '+settings.selectedSeatManCss : ' '+settings.selectedSeatWomanCss;
    //             }
    //             str.push('<li class="' + className + '"' +
    //                 'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
    //                 '<a title="' + seatNo + '">' + seatNo + '</a>' +
    //                 '</li>');
    //         }
    //
    //     }
    // }
    $('#place').html(str.join(''));
};
var bookedSeats = [
    {
        seatNumber: 5,
        sex: 'male'
    },
    {
        seatNumber: 10,
        sex: 'female'
    },
    {
        seatNumber: 23,
        sex: 'male'
    }
];
init(bookedSeats);
let seatSelected = [];
$('.' + settings.seatCss).click(function () {
    if ($(this).hasClass(settings.selectedSeatManCss) || $(this).hasClass(settings.selectedSeatWomanCss)) {
        alert('این صندلی قبلا رزرو شده است.');
    }
    else {

        $(this).toggleClass(settings.selectingSeatCss);
        let seatNo = parseInt($(this).attr('data'));
        if($(this).hasClass(settings.selectingSeatCss)){
            seatSelected.push(seatNo);
        }else{
            seatSelected = seatSelected.filter(i=>i!==seatNo);
        }
        console.log("seatSelected:", seatSelected)
    }
});

$('#btnShow').click(function () {
    var str = [];
    $.each($('#place li.' + settings.selectedSeatManCss + ' a, #place li.' + settings.selectingSeatCss + ' a'), function (index, value) {
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