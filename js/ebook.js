class Ebook{

    book_cur=null;

    show(){
        $.getJSON("https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/ebook.json",function(data){
            $("#app-list").html('');
            var ebooks=data.all_item;
            $.each(ebooks,function(index,ebook){
                var e_describe="";
                if(ebook.status!="publish") return true;
                if(ebook.describe!=null&&ebook.describe!=""&&ebook.describe!="undefined"&&ebook.describe!=undefined){
                    var containsHtmlTags = /<\/?[a-z][\s\S]*>/i.test(ebook.describe);
                    if(containsHtmlTags) e_describe=r.truncateText($(ebook.describe).text(),20);
                    else e_describe=r.truncateText(ebook.describe,20);
                }
  
                var appCard = $(`
                    <div class="col-md-4 app-card animate__animated animate__fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-book"></i> ${ebook.title}</h5>
                                <div class="card-author"><i class="fas fa-user-tie"></i> ${ebook.author}</div>
                                <p role="button" class="card-text">${e_describe}</p>
                                <a class="btn btn-store btn-sm btn-dark animate__animated animate__bounceIn"><i class="fas fa-book-open"></i> Read</a>
                            </div>
                        </div>
                    </div>
                `);

                $(appCard).click(function(){
                    r.ebook.book_cur=ebook;
                    r.ebook.showEbookIndex(ebook);
                });
                $("#app-list").append(appCard);
            });
        });
    }

    show_chapter_next(){
        r.ebook.book_cur.chapter_cur++;
        r.ebook.showEbookChapter(r.ebook.book_cur.chapter_cur);
    }

    show_chapter_prev(){
        r.ebook.book_cur.chapter_cur--;
        r.ebook.showEbookChapter(r.ebook.book_cur.chapter_cur);
    }

    showEbookChapter(index_chapter){
        var html='';
        html+='<h5 class="card-author">'+r.ebook.book_cur.contents[index_chapter].title+'</h5>';
        html+='<div class="text-left">'+r.ebook.book_cur.contents[index_chapter].content+'</div>';
        html+="<div>";
            if(index_chapter!=0) html+="<button onclick='r.ebook.show_chapter_prev();' class='btn btn-sm btn-swal m-1'><i class='fas fa-fast-backward'></i></button>";
            html+="<button onclick='Swal.close();' class='btn btn-sm btn-swal m-1'><i class='fas fa-times-circle'></i> Close</button>";
            html+="<button onclick='r.ebook.showEbookIndexCur();' class='btn btn-sm btn-swal m-1'><i class='fas fa-list-alt'></i> Table of contents</button>";
            if(index_chapter<r.ebook.book_cur.contents.length) html+="<button onclick='r.ebook.show_chapter_next();' class='btn btn-sm btn-swal m-1'><i class='fas fa-fast-forward'></i></button>";
        html+="</div>";

        Swal.fire({
            title:r.ebook.book_cur.title,
            html:html,
            showConfirmButton:false
        });
    }

    showEbookIndex(ebook){
        Swal.fire({
            title:ebook.title,
            html:'<div id="all_chaper"></div>',
            customClass:{confirmButton:"btn-swal"}
        });

        $.each(ebook.contents,function(index,e){
            var item_chaper=$('<div role="button" class="item-swal text-left bg-dark text-white p-1 m-1 rounded">'+e.title+'</div>');
            $(item_chaper).click(function(){
                r.ebook.book_cur.chapter_cur=index;
                r.ebook.showEbookChapter(index);
            });
            $("#all_chaper").append(item_chaper);
        });
    }

    showEbookIndexCur(){
        r.ebook.showEbookIndex(r.ebook.book_cur);
    }
}

var ebook=new Ebook();
r.ebook=ebook;