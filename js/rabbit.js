class Rabbit{

    style_mode="dark-mode";
    page_cur="";

    list_url_app=[
        "https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/app.json",
        "https://www.googleapis.com/drive/v3/files/1U8RIr1t6qYBnEFNWMloWnOjMoaAZ6RQj?alt=media&key=AIzaSyDKcjH_bDJz3EcqPdV5i62IZNVQ6EkyOFg"
    ];

    onload(){
        $('#leftMenu').css('left', '0');
        $('#rightMenu').css('right', '0');
        
        cr.onLoad();
        cr.setSiteName("Rabbit Store");
        cr.setColor("#fa1675");
        cr.setSiteUrl('https://rabbit-store.vercel.app');
        if(localStorage.getItem("style_mode")!=null) r.style_mode=localStorage.getItem("style_mode");
        r.check_style_mode();

        if(cr.arg("lang")) cr.lang=cr.arg("lang");
        if(cr.arg("p")){
            var page=cr.arg("p");
            $("#app-list").load(page);
        }else{
            cr.loadJs("js/app.js","app","show_all");
        }
        cr.add_btn_top();
    }

    show_app(){
        cr.loadJs("js/app.js","app","show_app");
    }

    show_game(){
        cr.loadJs("js/app.js","app","show_game");
    }

    act_menu(id_btn_menu){
        $(".act-menu a").removeClass("active");
        $("#"+id_btn_menu).addClass("active");
        cr.top(()=>{
            $('#title-icon').removeClass('fa-spin').addClass("animate__animated").addClass('animate__jello');
        },()=>{
            $('#title-icon').addClass('fa-spin').removeClass("animate__animated").removeClass('animate__jello');
        });
        r.page_cur=id_btn_menu;
    }

    loading_html(){
        return '<div class="col-12"><p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</p></div>';
    }

    show_search(){
        cr.loadJs("js/search.js","search","show");
    }

    show_setting(){
        var html=''

        if(cr.dev){
            html+='<div class="form-group">';
                html+='<label for="sel_btn_top"><i class="fas fa-database"></i> Link Data App</label>';
                html+='<div class="d-block mt-1 mb-1" id="link_data_app">'+r.app.link_data_app+'</div>';
            html+='</div>';

            html+='<div class="form-group">';
                html+='<label for="btn_site_mapp_file"><i class="fas fa-sitemap"></i> Site Map</label>';
                html+='<div class="d-block mt-1 mb-1" id="btn_site_mapp_file"><button class="btn btn-sm btn-dark" onclick="r.download_site_map();return false;"><i class="fas fa-download"></i> Download Site Map</button></div>';
            html+='</div>';
        }

        cr.show_setting((setting)=>{
            r.lang=setting.lang;
            if(r.page_cur=="m-home") cr.loadJs("js/app.js","app","show_all");
            if(r.page_cur=="m-app") cr.loadJs("js/app.js","app","show_app");
            if(r.page_cur=="m-game") cr.loadJs("js/app.js","app","show_game");
            if(r.page_cur=="m-pp") r.show_policy();
            if(r.page_cur=="m-about") r.show_about();
        },html);
    }

    show_about(){
        $("#app-list").html(r.loading_html());
        $("#app-list").load("html/about/"+r.lang+".html", function(response, status, xhr) {
            if (status == 'error') $("#app-list").load("html/about/en.html");
        });
        r.act_menu("m-about");
    }

    show_all_user(){
        $('#app-list').html(r.loading_html());
        r.act_menu("m-menu");
        cr.loadJs("js/users.js","users","show");
    }

    truncateText(text, textLimit=20,wordLimit=10,lang=null) {
        const charBasedLangs = ['zh', 'ja'];
        if(lang==null) lang=cr.lang;
        if (charBasedLangs.includes(lang)) {
          if (text.length > textLimit) {
            return text.slice(0, textLimit) + '...';
          } else {
            return text; 
          }
        } else {
          let words = text.split(' ');
          if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
          } else {
            return text;
          }
        }
    }

    toggleDarkMode() {
        if (r.style_mode=="dark-mode") {
            r.style_mode='light-mode';
            localStorage.setItem("style_mode","light-mode");
        } else {
            r.style_mode='dark-mode';
            localStorage.setItem("style_mode","dark-mode");
        }
        r.check_style_mode();
    }

    check_style_mode(){
        let icon = document.getElementById('dark-mode-toggle');
        if (r.style_mode=='dark-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } 
    }

    show_all_ebook(){
        $("#app-list").html(r.loading_html());
        r.act_menu("m-ebook");
        cr.loadJs("js/ebook.js","ebook","show");
    }

    show_all_bible(){
        $("#app-list").html(r.loading_html());
        r.act_menu("m-bible");
        cr.loadJs("js/bible.js","bible","show");
    }

    show_policy(){
        $("#app-list").html(r.loading_html());
        cr.show_pp("#app-list");
        r.act_menu("m-pp");
    }

    show_terms(){
        $("#app-list").html(r.loading_html());
        cr.show_tos("#app-list");
    }

    download_site_map(){
        var list_link=[];
        $.each(r.app.all_app,function(index,a){
            list_link.push(cr.site_url+"/?r="+a.name_en);
        });
        cr.download_sitemap(list_link);
    }
}

var r;
$(document).ready(function(){
    r=new Rabbit();
    r.onload();
});