const uploadFile = () =>{
    let newForm = $('#csv-form');
    newForm.submit(function(e){
        e.preventDefault();
        //ajax call for the data of uploaded file
        $.ajax({
            type:'post',
            url: newForm.prop('action'),
            data: new FormData(this),
            cache : false,
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            success: (data)=>{
                let newFile = newFileDom(data.data.file);
                $('#file-list>ul').prepend(newFile);
                deleteFile($(' .delete' , newFile));
                $('#formFileSm').val('');
                let fileCount = parseInt($('#file-count span:last-child').html());
                fileCount += 1;
                $('#file-count span:last-child').html(fileCount);
            },
            error: (error)=>{
                console.log(error.responseText);
            }
        })
    })
}

const newFileDom = (file)=>{
    return $(`
        <li id="${file._id}" class="file-li"><a href="/csv/file/${file.file}">${file.originalName}</a>
                        <a href="/csv/delete/${file._id}" class="delete" style="color: black;">
                            <i class="bi bi-trash-fill"></i>
                        </a>
                    </li>
    `);
}

//ajax call to delete the file
const deleteFile = (query)=>{
    $(query).click((e)=>{
        e.preventDefault();
        $.ajax({
            type:'get',
            url: $(query).prop('href'),
            success: (data)=>{
                $(`#${data.data.id}`).remove();
                let fileCount = parseInt($('#file-count span:last-child').html());
                fileCount > 0 ? fileCount -= 1 : fileCount;
                $('#file-count span:last-child').html(fileCount);
            },
            error: (error)=>{
                console.log(error.responseText);
            }
        })
    })
}

//adding delete to all file
const addingDeleteToFiles = ()=>{
    let container = $('.file-li');
    $(' .delete' , container).each((function(){
        deleteFile(this);
    }))
}

uploadFile();
addingDeleteToFiles();

