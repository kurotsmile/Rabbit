class Rabbit{

    lang="en";
    style_mode="dark-mode";
    page_cur="";

    onload(){
        if(localStorage.getItem("style_mode")!=null) r.style_mode=localStorage.getItem("style_mode");
        if(localStorage.getItem("lang")!=null) r.lang=localStorage.getItem("lang");
        r.check_style_mode();

        if(r.getUrlArg("lang")) r.lang=r.getUrlArg("lang");
        if(r.getUrlArg("p")){
            var page=r.getUrlArg("p");
            $("#app-list").load(page);
        }else{
            cr.loadJs("js/app.js","app","show_all");
        }
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
        r.act_scroll_top();
        r.page_cur=id_btn_menu;
    }

    act_scroll_top(){
        $('html, body').animate({ scrollTop: 0 }, 800, function() {
            $('#title-icon').removeClass('fa-spin').addClass("animate__animated").addClass('animate__jello');
            setTimeout(function() {
                $('#title-icon').addClass('fa-spin').removeClass("animate__animated").removeClass('animate__jello');
            }, 1000);
        });
    }

    loading_html(){
        return '<div class="col-12"><p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</p></div>';
    }

    show_search(){
        cr.loadJs("js/search.js","search","show");
    }

    show_setting(){
        var html='';
        html+='<form>';
        html+='<div class="form-group">';
            html+='<label for="exampleInputEmail1"><i class="fas fa-globe-asia"></i> Language</label>';
            html+='<select class="form-control" id="dropdown_lang"><select>';
            html+='<small id="emailHelp" class="form-text text-muted">Select your country and language</small>';
        html+='</div>';
        html+='</form>';
        Swal.fire({
            title:"Setting",
            html:html,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#fa1675'
        }).then((result)=>{
            if(result.isConfirmed){
                r.lang=$("#dropdown_lang").val();
                localStorage.setItem("lang",r.lang);
                if(r.page_cur=="m-home") cr.loadJs("js/app.js","app","show_all");
                if(r.page_cur=="m-app") cr.loadJs("js/app.js","app","show_app");
                if(r.page_cur=="m-game") cr.loadJs("js/app.js","app","show_game");
            }
        });
        $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/lang.json', function(data) {
            $.each(data.all_item,function(index,lang){
                if(lang.key==r.lang)
                    $("#dropdown_lang").append($('<option>', { value: lang.key,text : lang.name,selected:true}));
                else
                    $("#dropdown_lang").append($('<option>', { value: lang.key,text : lang.name}));
            });
        });
    }

    show_about(){
        $("#app-list").html(r.loading_html());
        $("#app-list").load("html/about/about-"+r.lang+".html", function(response, status, xhr) {
            if (status == 'error') $("#app-list").load("html/about/about-en.html");
        });
    }

    show_all_user(){
        $('#app-list').html(r.loading_html());
        r.act_menu("m-menu");
        cr.loadJs("js/users.js","users","show");
    }

    truncateText(text, textLimit=20,wordLimit=10,lang=null) {
        const charBasedLangs = ['zh', 'ja'];
        if(lang==null) lang=r.lang;
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
        r.act_scroll_top();
        $("#app-list").html(r.loading_html());
        $("#app-list").load("html/policy/policy-"+r.lang+".html", function(response, status, xhr) {
            if (status == 'error') $("#app-list").load("html/policy/policy-en.html");
        });
    }

    show_terms(){
        r.act_scroll_top();
        $("#app-list").html(r.loading_html());
        $("#app-list").load("html/terms/terms-"+r.lang+".html", function(response, status, xhr) {
            if (status == 'error') $("#app-list").load("html/terms/terms-en.html");
        });
    }

    getUrlArg(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        var sParameterName;
    
        for (var i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }
    
}

var r;
$(document).ready(function(){
    r=new Rabbit();
    
    $('#leftMenu').css('left', '0');
    $('#rightMenu').css('right', '0');
    
    r.onload();
});