$(document).ready(function(){
    let rows = $('#myTable tbody tr');
    let nextBtn = $('.pagination li:last-child');
    let prevBtn = $('.pagination li:first-child');
    let rowsPerPage = 100; 
    let totalRows = $(rows).length;
    if(totalRows <= rowsPerPage){
        $('.pagination').hide();
        return;
    }

    //handle the no of pages
    let totalPages = Math.ceil(totalRows/rowsPerPage);
    for(let i = 0; i < totalPages; i++){
        $(`.pagination li:nth-child(${i+1})`).after(`<li data-currpage=${i}>${i+1}</li>`)
    }

    //intialy it will in the first page and hide the prev button
    $('.pagination li:nth-child(2)').addClass('active');
    $(prevBtn).hide();
    
    $(rows).hide();
    $(rows).slice(0,rowsPerPage).show();

    //handle click events for the pages
    $('.pagination li').bind('click' , function(){

        //handle the click for page numbers
        if($(this).attr('data-currpage')){
            $("html, body").scrollTop(0);
            $('.pagination li').removeClass('active');  
            $(this).addClass('active');
            let currPage = parseInt($(this).attr('data-currpage'));
            if((currPage+1 > 1) && (currPage +1 < totalPages)){
                $(nextBtn).show();
                $(prevBtn).show();
            }else if(currPage+1 === totalPages){
                $(nextBtn).hide();
                $(prevBtn).show();
            }
            else{
                $(nextBtn).show();
                $(prevBtn).hide();
            }
            let startRow = currPage * rowsPerPage;
            let endRow = startRow + rowsPerPage;
            $(rows).hide();
            $(rows).slice(startRow,endRow).show();
            
        }

        //handle next button
        else if($(this).attr('data-next')){
            $("html, body").scrollTop(0);
            $(prevBtn).show();
            let currPage = parseInt($('.pagination li.active').attr('data-currpage'));
            console.log(currPage)
            if(currPage+2 == totalPages){
                $(nextBtn).hide();
            }
            $('.pagination li').removeClass('active');
            $(`.pagination li:nth-child(${currPage+3})`).addClass('active');
            let startRow = (currPage+1) * rowsPerPage;
            let endRow = startRow + rowsPerPage;
            $(rows).hide();
            $(rows).slice(startRow,endRow).show();
        }

        //handle prev button
        else if($(this).attr('data-prev')){
            $("html, body").scrollTop(0);
            $(nextBtn).show();
            let currPage = parseInt($('.pagination li.active').attr('data-currpage'));
            console.log(currPage)
            if(currPage == 1){
                $(prevBtn).hide();
            }
            $('.pagination li').removeClass('active');
            $(`.pagination li:nth-child(${currPage+1})`).addClass('active');
            let startRow = (currPage-1) * rowsPerPage;
            let endRow = startRow + rowsPerPage;
            $(rows).hide();
            $(rows).slice(startRow,endRow).show();

        }
    })
})