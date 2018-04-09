function getTopPost(top,left){
    return top*100+'px';
}

function getLeftPost(top,left){
    return left*100+'px'
}

function hasSite(){
    for(var i=0;i<row;i++){
        for(var j=0;j<line;j++){
            if(num[i][j]===0){
                return true;
            }
        }
    }
}
//能否左移：左边是否为0或者左边的值相同
function canMoveLeft(){
    for(var i=0;i<row;i++){
        for(var j=1;j<line;j++){
            if(num[i][j]!==0){
                if(num[i][j-1]===0||num[i][j-1]===num[i][j]){
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveUp(){
    for(var i=1;i<row;i++){
        for(var j=0;j<line;j++){
            if(num[i][j]!==0){
                if(num[i-1][j]===num[i][j]||num[i-1][j]===0){
                    console.log('true');
                    return true;
                }
            }
        }
    }
    console.log('false');
    return false;
}

function canMoveRight(){
    for(var i=0;i<row;i++){
        for(var j=2;j>=0;j--){
            if(num[i][j]!==0){
                if(num[i][j]===num[i][j+1]||num[i][j+1]===0){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(){
    for(var i=row-2;i>=0;i--){
        for(var j=0;j<line;j++){
            if(num[i][j]!==0){
                if(num[i+1][j]===num[i][j]||num[i+1][j]===0){
                    return true;
                }
            }
        }
    }
    return false;
}

function noRowLeftBlock(i,j,k,num){
    for(var x=k+1;x<j;x++){
        if(num[i][x]!==0){
            return false;
        }
    }
    return true;
}

function noRowRightBlock(i,j,k,num){
    for(var x=k-1;x>j;x--){
        if(num[i][x]!==0){
            return false;
        }
    }
    return true;
}
function noLineTopBlock(i,j,k,num){
    for(var x=k+1;x<i;x++){
        if(num[x][j]!==0){
            return false;
        }
    }
    return true;
}

function noLineDownBlock(i,j,k,num){
    for(var x=k-1;x>i;x--){
        if(num[x][j]!==0){
            return false;
        }
    }
    return true;
}