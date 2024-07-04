class Bible{
    show(){
        function getIconBible(type){
            if(type=='old_testament')
                return 'fas fa-bible';
            else
                return 'fas fa-journal-whills';
        }

        $("#app-list").html(r.loading_html());
        r.act_menu("m-bible");
        $.getJSON("https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/bible.json",function(data){
            $("#app-list").html("");
            var bibles=data.all_item;
            $.each(bibles,function(index,bible){
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
                    Swal.fire({
                        title:bible.name,
                        html:'<div id="all_chapter"></div>',
                        confirmButtonColor: '#fa1675',
                        didOpen:()=>{
                            $.each(bible.contents,function(index,chapter){
                                var btn_chapter=$('<button class="btn btn-sm btn-dark m-1">'+chapter.name+'</button>');
                                $(btn_chapter).click(function(){
                                    Swal.fire({
                                        title:chapter.name,
                                        html:"<div id='all_p'></div>",
                                        confirmButtonColor: '#fa1675',
                                        didOpen:()=>{
                                            $.each(chapter.paragraphs,function(index,p){
                                                $("#all_p").append("<sup>"+(index+1)+"</sup> "+p);
                                            });
                                        }
                                    });
                                });
                                $("#all_chapter").append(btn_chapter);
                            });
                        }
                    });
                });
                $("#app-list").append(bibleCard);
            });
        });
    }
}

var bible=new Bible();
r.bible=bible;