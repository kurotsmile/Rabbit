class Search{

    list_obj_data=null;
    key_search='';

    add_obj_data(obj_find,key_name,icon_font,url_data){
        var obj_search={
            obj_find:obj_find,
            icon:icon_font,
            name:key_name,
            url:url_data
        };
        r.search.list_obj_data.push(obj_search);
    }

    show(){
        r.search.list_obj_data=[];

        r.search.add_obj_data("app","name_en",'<i class="fab fa-app-store-ios"></i>',"https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/app.json");
        r.search.add_obj_data("users","name",'<i class="fas fa-user"></i>',"https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/user-vi.json");
        r.search.add_obj_data("ebook","title",'<i class="fas fa-book"></i>',"https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/ebook.json");
        r.search.add_obj_data("bible","name",'<i class="fas fa-bible"></i>',"https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/bible.json");

        Swal.fire({
            title:"Search",
            input: "text",
            inputLabel:"Search Content",
            preConfirm:(val)=>{
                r.search.act_search(val);
            }
        });
    }
    
    act_search(key){
        $("#app-list").html('');
        r.search.key_search=key;
        r.act_menu("m-search");
        $.each(r.search.list_obj_data,function(index,obj_search){
            var key_name_obj=obj_search.name;
            $.getJSON(obj_search.url, function(data) {
                $("#app-list").append('<div class="col-12"><p class="text-center"> Search <b>'+obj_search.obj_find.toUpperCase()+'</b> <i class="fas fa-search"></i> '+key+'...</p></div>');
                var items = data.all_item;
                var list_found=[];
                $.each(items,function(index,item){
                    var s_name_data=JSON.stringify(item);
                    console.log(s_name_data);
                    if(s_name_data.toLowerCase().indexOf(key.toLowerCase())!==-1) list_found.push(item[key_name_obj]);
                });

                var html_found='<div class="col-12">';
                $.each(list_found,function(index,f){
                    html_found+='<button class="btn btn-dark m-1">'+obj_search.icon+' '+f+'</button>';
                });
                html_found+='<div>';
                $("#app-list").append(html_found);
            });
        });
    }
}
var search=new Search();
r.search=search;