class Bible{

    urls=[
        "https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/bible.json",
        "https://www.googleapis.com/drive/v3/files/1TvjZCqk4x_76eLL_dpk5pqmqUAiqYaoA?alt=media&key=AIzaSyDKcjH_bDJz3EcqPdV5i62IZNVQ6EkyOFg"
    ]
    book_cur=null;
    bibles=[];
    url_data_bible='';

    show(){
        function getIconBible(type){
            if(type=='old_testament')
                return 'fas fa-bible';
            else
                return 'fas fa-journal-whills';
        }

        $("#app-list").html(r.loading_html());
        r.act_menu("m-bible");
        this.url_data_bible=cr.random(this.urls);
        $.getJSON(this.url_data_bible,function(data){
            if(cr.dev){
                var html_menu='<div class="d-block w-100 mb-1 text-center">';
                html_menu+='<button class="btn btn-dark m-1" onclick="r.bible.edit();return false;"><i class="fas fa-edit"></i> Edit Bible</button>';
                html_menu+='<button class="btn btn-dark m-1" onclick="r.bible.add();return false;"><i class="fas fa-plus-circle"></i> Add book</button>';
                html_menu+='<button class="btn btn-dark m-1" onclick="r.bible.download();return false;"><i class="fas fa-download"></i> Download</button>';
                html_menu+='</div>';

                html_menu+='<div class="d-block w-100 mb-3 text-center text-mute">';
                html_menu+=r.bible.url_data_bible;
                html_menu+='</div>';
                $("#app-list").html(html_menu);
            }
            else{
                $("#app-list").html('');
            }
            var bibles=data.all_item;
            r.bible.bibles=[];
            $.each(bibles,function(index,bible){
                if(bible.lang==cr.lang) 
                    r.bible.bibles.push(bible);
                else
                    return true;
                var bibleCard = $(`
                    <div role="button" class="col-md-3 app-card animate__animated animate__fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="${getIconBible(bible.type)}"></i> ${bible.name}</h5>
                                <p class="card-text">${bible.contents.length} Chapter</p>
                            </div>
                        </div>
                    </div>
                `);

                $(bibleCard).click(function(){
                    r.bible.book_cur=bible;
                    r.bible.showInfoByData(bible);
                });
                $("#app-list").append(bibleCard);
            });
        });
    }

    showInfoByData(data){
        Swal.fire({
            title:data.name,
            html:'<div id="all_chapter"></div>',
            confirmButtonColor: '#fa1675',
            didOpen:()=>{
                $.each(data.contents,function(index,chapter){
                    var btn_chapter=$('<button class="btn btn-sm btn-dark m-1">'+chapter.name+'</button>');
                    $(btn_chapter).click(function(){
                        r.bible.book_cur.chapter_cur=index;
                        r.bible.showBibleIndex(index);
                    });
                    $("#all_chapter").append(btn_chapter);
                });
            }
        });
    }

    showBibleIndex(index){
        var html='';
        html+='<h5 class="card-author">'+r.bible.book_cur.contents[index].name+'</h5>';
        html+='<div id="all_p" class="text-left"></div>';
        html+="<div>";
            if(index!=0) html+="<button onclick='r.bible.show_chapter_prev();' class='btn btn-sm btn-swal m-1'><i class='fas fa-fast-backward'></i></button>";
            html+="<button onclick='Swal.close();' class='btn btn-sm btn-swal m-1'><i class='fas fa-times-circle'></i> Close</button>";
            html+="<button onclick='r.bible.showBibleIndexCur();' class='btn btn-sm btn-swal m-1'><i class='fas fa-list-alt'></i> Table of contents</button>";
            if(index<r.bible.book_cur.contents.length-1) html+="<button onclick='r.bible.show_chapter_next();' class='btn btn-sm btn-swal m-1'><i class='fas fa-fast-forward'></i></button>";
        html+="</div>";

        Swal.fire({
            title:r.bible.book_cur.name,
            html:html,
            confirmButtonColor: '#fa1675',
            didOpen:()=>{
                $.each(r.bible.book_cur.contents[index].paragraphs,function(index,p){
                    $("#all_p").append("<sup>"+(index+1)+"</sup> "+p);
                });
            }
        });
    }

    show_chapter_next(){
        r.bible.book_cur.chapter_cur++;
        r.bible.showBibleIndex(r.bible.book_cur.chapter_cur);
    }

    show_chapter_prev(){
        r.bible.book_cur.chapter_cur--;
        r.bible.showBibleIndex(r.bible.book_cur.chapter_cur);
    }

    showBibleIndexCur(){
        r.bible.showInfoByData(r.bible.book_cur);
    }

    showDataSearchFound(){
        r.bible.book_cur=r.data_search_found;
        r.bible.showInfoByData(r.data_search_found);
    }

    edit(){
        cr_data.edit(this.bibles,(data)=>{
            console.log(data);
        });
    }

    download(){
        cr.download(this.bibles,"bible-"+cr.lang+".json");
    }
}

var bible=new Bible();
r.bible=bible;