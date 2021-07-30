const data = [{
        id: 1,
        question: 'Nhóm nhạc Hàn Quốc mà Đậu Đen thích nhất là ?',
        options: ['BIGBANG', 'T-ARA', 'SNSD', '2ne1'],
        correctAnswer: 0
    },
    {
        id: 2,
        question: 'Tính đến nay anh Hai Đô đã đi dạy được bao nhiêu năm ?',
        options: [2, 3, 4, 5],
        correctAnswer: 1
    },
    {
        id: 3,
        question: 'Chiếc xe đạp ngày xưa cô Thủy chạy đi dạy có màu gì ?',
        options: ['Xanh', 'Đỏ', 'Đen', 'Nâu'],
        correctAnswer: 2
    },
    {
        id: 4,
        question: 'Ở nhà \'Ròm\' là biệt danh của ai ?',
        options: ['Cô Hoa', 'Chú Vinh', 'Út Lan', 'Cô Nhung'],
        correctAnswer: 0
    },
    {
        id: 5,
        question: 'Ngày xưa khi đội bóng yêu thích thua cuộc Út Lan sẽ ?',
        options: ['Xĩu', 'Không ăn cơm', 'Khóc', 'Làm mình làm mẩy'],
        correctAnswer: 2
    },
    {
        id: 6,
        question: 'Lúc trước cửa hàng thịt của chú Vinh trên TP nằm ở đường nào ?',
        options: ['Lạc Long Quân', 'Đinh Bộ Lĩnh', 'Xô Viết Nghệ Tĩnh', 'Nguyễn Hữu Thọ'],
        correctAnswer: 0
    },
    {
        id: 7,
        question: 'Bộ môn thể thao yêu thích của Bà Nội ?',
        options: ['Đánh bài tứ sắc', 'Chạy bộ', 'Nhảy cao', 'Bóng chuyền'],
        correctAnswer: 0
    },
    {
        id: 8,
        question: 'Đâu là truyền thống mang nét đẹp dân tộc ngày Tết cần được gìn giữ và đóng bóp được nhà Mẹ Mum tổ chức vào mỗi mùng 1-2-3 Tết hằng năm tại nhà riêng ?',
        options: ['Karaoke', 'Gói Bánh Tét', 'Đấu vật', 'Uống nước trà'],
        correctAnswer: 1
    },
    {
        id: 9,
        question: 'Ai là người chở Đậu Đen đi lên Bến Tre nhận giải thưởng trị giá 500K và mời Đậu Đen ăn phở ?',
        options: ['Anh Hai Đô', 'Ba Phú', 'Dượng Út', 'Cô Thủy'],
        correctAnswer: 2
    },
    {
        id: 10,
        question: 'Trước khi về quê việc làm lúc còn ở thành phố của Cô Nhung là gì ?',
        options: ['Bán bánh chưng ,bánh giò', 'Shipper', 'Bán trà sữa', 'Thợ may'],
        correctAnswer: 3
    }


]


var questionArea = document.querySelector('#question')
var optionArea = document.querySelector('#option')
var optionChecked = document.getElementsByName('quiz')
var quizArea = document.querySelector('#quiz')

var btnNext = document.querySelector('#next')
var btnPrev = document.querySelector('#prev')
var btnStartOver = document.querySelector('#start')

var indexQuestion = 0;
var arrayOption = []
var arrayChecked = []
var tempOption = ''
var finalResult = 0

function noitiResult(finalResult) {
    if (finalResult < 5) {
        return 'Thiệt là tệ ! Xứng đáng bị đánh đòn !!!'
    } else if (finalResult > 5 && finalResult < 8) {
        return 'Cũng thường thôi !!! Cần cố gắng hơn nhennn !!!'
    } else {
        return 'Rất tốt !! Bạn xứng đáng là thành viên Ưu Tú của gia đình này <3 '
    }
}



function enableButton(index, value, btn) {
    if (index === value) {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }
}


function render(index) {
    enableButton(index, 0, btnPrev)

    questionArea.textContent = (index + 1) + '. ' + data[index].question
    for (var i = 0; i < 4; i++) {
        tempOption = `<input type="radio" id="${i}" name="quiz" value="${data[index].options[i]}">
                      <label for="${data[index].options[i]}">${data[index].options[i]}</label>
                      <br>`
        arrayOption.push(tempOption)
    }
    optionArea.innerHTML = arrayOption.join("")
}

btnNext.onclick = function(e) {
    //Get elements radio checked
    arrayOption = []
    if (indexQuestion <= 8) {
        for (i = 0; i < optionChecked.length; i++) {
            if (optionChecked[i].checked) {
                arrayChecked[indexQuestion] = i
            }
        }

        indexQuestion = indexQuestion + 1

        render(indexQuestion)
        if (arrayChecked.length > indexQuestion) {
            optionChecked[arrayChecked[indexQuestion]].setAttribute('checked', 'checked')
        }
    } else {
        for (i = 0; i < optionChecked.length; i++) {
            if (optionChecked[i].checked) {
                arrayChecked[indexQuestion] = i
            }
        }

        arrayChecked.map(function(item, index) {
            if (item === data[index].correctAnswer) {
                finalResult += 1
            }
        })
        var noiti = noitiResult(finalResult)

        quizArea.innerHTML = `<div style="font-size:20px;">
                                 Điểm số của bạn là <b>${finalResult} / 10 !!</b>
                                 <br>
                                 ${noiti}
                                 <br>
                                 Hãy chụp màn hình lại và khoe với mọi người đi nào hehe ^^
                            </div>`
        btnPrev.disabled = true;
        btnNext.disabled = true;
        btnStartOver.disabled = false;
    }

}

btnPrev.onclick = function(e) {
    indexQuestion = indexQuestion - 1
    arrayOption = []
    render(indexQuestion)

    optionChecked[arrayChecked[indexQuestion]].setAttribute('checked', 'checked')

}

btnStartOver.onclick = function(e) {
    reload = location.reload();
}

render(indexQuestion)


btnStartOver.disabled = true;