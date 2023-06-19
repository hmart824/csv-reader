const search = ()=>{
    //This timeout thing is prevent the unnecessary searching of results when the user is typing something and has not finished yet.
    //It will show the results after .3s after typing.
    let timeOut;
    $('#inputText').keyup(function(){
        let tableRows = $('#myTable tbody tr');
        let rowsInCurrPage;
        let currPage = parseInt($('.pagination li.active').attr('data-currpage'));
        if(currPage){
            let startRow = currPage * 100;
            let endRow = startRow + 100;
            rowsInCurrPage = $(tableRows).slice(startRow,endRow);
        }else{
            rowsInCurrPage = tableRows;
        }
        clearTimeout(timeOut);
        timeOut = setTimeout(()=>{
            let searchValue = $(this).val().trim().toLowerCase();
                for(let i= 0 ; i < rowsInCurrPage.length ; i++){
                    let found = false;
                    let td = $('td' , rowsInCurrPage[i]);
                    for(let j = 0 ; j < td.length ; j++){
                        if($(td[j]).html().trim().toLowerCase().indexOf(searchValue) > -1){
                            found = true;
                        }
                    }
                    if(found){
                        $(rowsInCurrPage[i]).show();
                    }else{
                        $(rowsInCurrPage[i]).hide();
                    }
                }

        } , 300)
    })
};
search();