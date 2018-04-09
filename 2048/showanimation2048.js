function showChessAnimation(randomX,randomY,num){
    $(`#chess${randomX}-${randomY}`).text(num);
    $(`#chess${randomX}-${randomY}`).css('background-color','yellow');
    $(`#chess${randomX}-${randomY}`).animate({
        width:'100px',
        height:'100px',
    },100);
};

function showChessMoveAnimation(i,j,k){
    $(`#chess${i}-${j}`).animate({
        left:getTopPost(i,j),
        top:getLeftPost(i,k)
    },500)
}