function initSharedWnd() {
    let ss = sessionStorage.getItem("shwndid");
    let ls = localStorage.getItem("shwndid");
    let n = 0;
    if(ls) {
        let arr = ls.split(",");
        if(ss) {
            //refreshed window   
        } else {
            //first load this window
            ss = arr.length + 1;  
            sessionStorage.setItem("shwndid",ss);          
        }
        arr.push(ss);
        ls = arr.join(",");
        localStorage.setItem("shwndid", ls);
    } else {
        localStorage.setItem("shwndid", "1");
        sessionStorage.setItem("shwndid","1");
    } 
}

function clearSharedWnd() {
    let ls = localStorage.getItem("shwndid");
    let arr = ls.split(",");
    let n = parseInt(arr.indexOf(sessionStorage.getItem("shwndid")));
    if(n>-1) arr.splice(n,1);
    ls = arr.join(",");
    localStorage.setItem("shwndid", ls);
}