//用来存储数值的二维数组
var num=[];
//用来保存该位置是否已经合并
var hasMixed=[];
//存储随机生成的值
var gameNum=[2,2,2,2,2,2,2,4];
//面板的行列数
const row=4;
const line=4;

//页面加载完成后开始初始化游戏
$(document).ready(function(){
    //初始化游戏布局
    init();
    //生成随机数并填充进chess
    createRandom();
    createRandom();

})


//init函数,用来生成页面
function init(){
    //将网格按照4*4排列
    for(var i=0;i<row;i++){
        for(var j=0;j<line;j++){
            var grid=$(`#grid${i}-${j}`)
            //设置每个格子的位置
            grid.css('top',getTopPost(i,j));
            grid.css('left',getLeftPost(i,j));
        }
    }
    //将数组的值设为0,false
    for(var i=0;i<row;i++){
        num[i]=[];
        hasMixed[i]=[];
        for(var j=0;j<line;j++){
            num[i][j]=0;
            hasMixed[i][j]=false;
        }
    }

    //刷新面板
    updateBoard();

}

//updateBoard函数
function updateBoard(){
    //先移除上一次的面板
    $('.chess').remove();

    //在每个格子中插入chess
    for(var i=0;i<row;i++){
        for(var j=0;j<line;j++){
            $('.outer').append(`<div class=chess id=chess${i}-${j}></div>`);
            //如果这里的数字为0，则不显示该chess
            if(num[i][j]===0){
                $(`#chess${i}-${j}`).css('width','0px');
                $(`#chess${i}-${j}`).css('height','0px');
                $(`#chess${i}-${j}`).css('top',getTopPost(i,j));
                $(`#chess${i}-${j}`).css('left',getLeftPost(i,j));
            }else{
                //如果不为0，则显示
                $(`#chess${i}-${j}`).css('width','100px');
                $(`#chess${i}-${j}`).css('height','100px');
                $(`#chess${i}-${j}`).css('top',getTopPost(i,j));
                $(`#chess${i}-${j}`).css('left',getLeftPost(i,j));
                $(`#chess${i}-${j}`).css('background-color','#eee4da');
                $(`#chess${i}-${j}`).text(num[i][j]);
            }
        hasMixed[i][j]=false;
        }
    }
}

function createRandom(){
    //如果当前面板没有位置用来生成数字，则退出
    if(!hasSite()){
        return false;
    }

    //找到一个随机位置
    var randomX=Math.floor(Math.random()*4);
    var randomY=Math.floor(Math.random()*4);
    //如果该位置已经有数字，则重新生成
    while(num[randomX][randomY]){
        randomX=Math.floor(Math.random()*4);
        randomY=Math.floor(Math.random()*4);
    }
    //生成随机的数字
    num[randomX][randomY]=gameNum[Math.floor(Math.random()*8)];

    //把随机位置所在的chess显示出来
    showChessAnimation(randomX,randomY,num[randomX][randomY]);

}
//当开始操作时
$(document).keydown(function(event){

    switch(event.keyCode){
        //如果向左
        case 37:
            event.preventDefault();
            //判断是否可以向左移动
            if(moveLeft()){
                setTimeout(createRandom,100);
                //setTimeout(isOver,200);
            }
            break;
        case 38:
            event.preventDefault();
            if(moveUp()){
                setTimeout(createRandom,100);
                //setTimeout(isOver,200);
            }
            break;
        case 39:
            event.preventDefault();
            if(moveRight()){
                setTimeout(createRandom,100);
                //setTimeout(isOver,200);
            }
            break;
        case 40:
            event.preventDefault();
            if(moveDown()){
                setTimeout(createRandom,100);
                //setTimeout(isOver,200);
            }
            break;
        default:
            break;
    }
})
//向左移动
function moveLeft(){
    //先判断能否向左移动
    if(!canMoveLeft()){
        return false;
    }

    for(var i=0;i<row;i++){
        for(var j=1;j<line;j++){
            if(num[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(num[i][j]===num[i][k]&&noRowLeftBlock(i,j,k,num)&&hasMixed[i][k]===false){
                        num[i][k]=num[i][k]+num[i][j];
                        num[i][j]=0;
                        //showChessMoveAnimation(i,j,k);
                        hasMixed[i][k]=true;
                        break;
                    }else if(num[i][k]===0&&noRowLeftBlock(i,j,k,num)){
                        num[i][k]=num[i][j];
                        num[i][j]=0;
                        //showChessMoveAnimation(i,j,k);
                        break;
                    }
                }
            }
        }
    }
    setTimeout('updateBoard()',0);
    return true;
}
//向上移动
function moveUp(){
    if(!canMoveUp()){
        return false;
    }
    for(var i=1;i<row;i++){
        for(var j=0;j<line;j++){
            if(num[i][j]!==0){
                for(var k=0;k<i;k++){
                    if(num[k][j]===num[i][j]&&noLineTopBlock(i,j,k,num)&&hasMixed[k][j]===false){
                        num[k][j]=num[k][j]+num[i][j];
                        num[i][j]=0;
                        hasMixed[k][j]=true;
                    }else if(num[k][j]===0&&noLineTopBlock(i,j,k,num)){
                        num[k][j]=num[i][j];
                        num[i][j]=0;
                    }
                }
            }
        }
    }
    setTimeout('updateBoard()',0);
    return true;
}
function moveRight(){
    if(!canMoveRight()){
        return false;
    }
    for(var i=0;i<row;i++){
        for(var j=line-2;j>=0;j--){
            if(num[i][j]!==0){
                for(var k=line-1;k>j;k--){
                    if(num[i][j]===num[i][k]&&noRowRightBlock(i,j,k,num)&&hasMixed[i][k]===false){
                        num[i][k]=num[i][k]+num[i][j];
                        num[i][j]=0;
                        hasMixed[i][k]=true;
                    }else if(num[i][k]===0&&noRowRightBlock(i,j,k,num)){
                        num[i][k]=num[i][j];
                        num[i][j]=0;
                    }
                }
            }
        }
    }
    setTimeout('updateBoard()',0);
    return true;
}
function moveDown(){
    if(!canMoveDown()){
        return false;
    }
    for(var i=row-2;i>=0;i--){
        for(var j=0;j<line;j++){
            if(num[i][j]!==0){
                for(var k=3;k>i;k--){
                    if(num[k][j]===num[i][j]&&hasMixed[k][j]==false&&noLineDownBlock(i,j,k,num)){
                        num[k][j]=num[k][j]+num[i][j];
                        num[i][j]=0;
                        hasMixed[k][j]=true;
                    }else if(num[k][j]===0&&noLineDownBlock(i,j,k,num)){
                        num[k][j]=num[i][j];
                        num[i][j]=0;

                    }
                }
            }
        }
    }
    setTimeout('updateBoard()',0);
    return true;
}

