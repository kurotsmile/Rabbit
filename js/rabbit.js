class Rabbit{

    lang="en";
    style_mode="dark-mode";
    page_cur="";

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

    loadJs(path_js, obj_call, func_call = "show") {
        if(window[obj_call]!=null){
            window[obj_call][func_call]();
        }else{
            $.getScript(path_js).done(function(script, textStatus) {
                if(obj_call!=null) window[obj_call][func_call]();
            })
            .fail(function(jqxhr, settings, exception) {
                console.log("Script loading failed: " + exception);
            });
        }
    }

    onload(){
        if(localStorage.getItem("style_mode")!=null) r.style_mode=localStorage.getItem("style_mode");
        r.check_style_mode();

        (function ( $ ) {
            $.fn.animate2 = function(animation, callback, context) {
                return this.each(function() {
                    this.animate(animation, callback, context);
                });
            };
        }( jQuery ));
    }

    loading_html(){
        return '<div class="col-12"><p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</p></div>';
    }

    show_search(){
        r.loadJs("js/search.js","search","show");
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
                if(r.page_cur=="m-home") r.show_all_app();
                if(r.page_cur=="m-app") r.show_all_app("app");
                if(r.page_cur=="m-game") r.show_all_app("game");
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
        r.act_menu("m-about");
        var html='';
        html+='<p class="animate__animated animate__zoomIn p-3"><b><i class="fas fa-solid fa-carrot"></i> Fun and Engaging Games:</b><br/>Explore a vibrant collection of games that cater to various tastes and ages. From adrenaline-pumping action games to brain-teasing puzzles and immersive simulations, Rabbit Store offers entertainment that never fails to captivate.</p>';
        html+='<p class="animate__animated animate__zoomIn p-3 animate__delay-1s"><b><i class="fas fa-solid fa-carrot"></i> Useful Applications:</b><br/>Discover practical applications designed to simplify and enrich your daily routines. From productivity tools that streamline tasks to educational apps that foster learning, Rabbit Store provides solutions that enhance efficiency and knowledge.</p>';
        html+='<p class="animate__animated animate__zoomIn p-3 animate__delay-2s"><b><i class="fas fa-solid fa-carrot"></i> Why Choose Rabbit Store?</b></br>At Rabbit Store, we prioritize quality, creativity, and user satisfaction. Each game and application is carefully curated to ensure a seamless experience, whether you\'re unwinding after a long day or striving for personal growth.</p>';
        html+='<p class="animate__animated animate__zoomIn p-3 animate__delay-3s">Explore Rabbit Store today and transform your digital experience with our diverse selection of games and apps. Join our community of users who rely on Rabbit Store for entertainment, productivity, and everything in between.</p>';
        $('#app-list').html();
        $('#app-list').html(html);
    }

    show_all_user(){
        $('#app-list').html(r.loading_html());
        r.act_menu("m-menu");
        r.loadJs("js/users.js","users","show");
    }

    truncateText(text, wordLimit) {
        var words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }

    show_app_info(app){
        Swal.fire({
            title: app.name_en,
            html: '<p>' + app.describe_en + '</p>',
            icon: 'info',
            confirmButtonText: 'OK',
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675'
        });
    }

    show_all_app(type="all"){
        $('#app-list').html(r.loading_html());
        if(type=="all") r.act_menu("m-home");
        if(type=="app") r.act_menu("m-app");
        if(type=="game") r.act_menu("m-game");

        function getIconClass(type) {
            if (type === 'game') {
                return 'fa-gamepad';
            } else if (type === 'app') {
                return 'fa-rocket';
            }
            return '';
        }

        function getAppStoreIcon(storeType, storeLink) {
            if(storeLink!=null&&storeLink!=''&&storeLink!='undefined'){
                switch (storeType) {
                    case 'amazon_app_store':
                        return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__flipInX" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Amazon App Store</button>`;
                    case 'github':
                        return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__flipInX" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> GitHub</button>`;
                    case 'microsoft_store':
                        return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__flipInX" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Microsoft Store</button>`;
                    case 'google_play':
                        return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__flipInX" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Google Play</button>`;
                    case 'itch':
                        return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__flipInX" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Itch.io</button>`;
                    case 'uptodown':
                        return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__flipInX" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> UpToDown</button>`;
                    default:
                        return '';
                }
            }else{
                return '';
            }
        }

        function getLinkDownload(fileType,downloadLink){
            if(downloadLink!=null&&downloadLink!=''&&downloadLink!='undefined'){
                switch (fileType) {
                    case 'apk_file':
                        return `<button class="w-100 btn btn-store btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${downloadLink}', '_blank')"><i class="fab fa-android"></i> Download <b>apk</b> File</button>`;
                    case 'exe_file':
                        return `<button class="w-100 btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${downloadLink}', '_blank')"><i class="fab fa-windows"></i> Download <b>exe</b> File</button>`;
                    case 'deb_file':
                        return `<button class="w-100 btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${downloadLink}', '_blank')"><i class="fab fa-ubuntu"></i> Download <b>deb</b> File</button>`;
                    default:
                        return '';
                }
            }else{
                return '';
            }
        }

        $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/app.json', function(data) {
            $('#app-list').html('');
            var appList = $('#app-list');
            var apps = data.all_item;
            $.each(apps, function(index, app) {
                if(app.status!="publish") return true;
                if(type!='all'){
                    if(type!=app.type) return true;
                }
                var truncatedDescription = r.truncateText(app["describe_"+r.lang], 20);
                var iconClass = getIconClass(app.type);
                var appCard = $(`
                    <div class="col-md-4 app-card ${app.type} animate__animated animate__fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title" role="button"><i class="fas ${iconClass} animate__animated animate__bounceIn"></i> ${app["name_"+r.lang]}</h5>
                                <p role="button" class="card-text animate__animated animate__fadeIn">${truncatedDescription}</p>
                                ${getAppStoreIcon('uptodown', app.uptodown)}
                                ${getAppStoreIcon('amazon_app_store', app.amazon_app_store)}
                                ${getAppStoreIcon('github', app.github)}
                                ${getAppStoreIcon('microsoft_store', app.microsoft_store)}
                                ${getAppStoreIcon('google_play', app.google_play)}
                                ${getAppStoreIcon('itch', app.itch)}
                            </div>
                            <i class="fas fa-info-circle info-icon detail animate__animated animate__bounceIn animate__delay-2s"></i>
                        </div>
                    </div>
                `);

                var appDownload = appCard.find(".card-text");
                appDownload.click(function(){
                    var html='';
                    html+=getLinkDownload("apk_file",app.apk_file);
                    html+=getLinkDownload("exe_file",app.exe_file);
                    html+=getLinkDownload("deb_file",app.deb_file);
                    Swal.fire({
                        icon: 'info',
                        title:"Download",
                        html:html,
                        iconColor: '#fa1675',
                        confirmButtonColor: '#fa1675'
                    })
                });

                var appTitle = appCard.find(".card-title");
                appTitle.click(function(){
                    r.show_app_info(app);
                });

                var infoIcon = appCard.find(".detail");
                infoIcon.click(function(){
                   r.show_app_info(app);
                });

                if(app.rates!=null){
                    function show_star(star){
                        star=parseInt(star);
                        var html='';
                        for(var i=1;i<=5;i++){
                            if(i<=star)
                                html+='<i class="fas fa-star active"></i>';
                            else
                                html+='<i class="fas fa-star none"></i>';
                        }
                        return html;
                    }

                    var rateIcon = $('<i class="fas fa-solid fa-comment info-icon rate animate__animated animate__bounceIn animate__delay-2s"></i>');
                    rateIcon.click(function() {
                        let html='';
                        $.each(app.rates,function(index,review){
                            html+=`<div class="reviews">
                                            <div class="review">
                                                <div class="avatar"><img src="icon.png" alt="User Avatar"></div>
                                                <div class="content">
                                                    <div class="user-info">
                                                        <div class="name">${review.user.name}</div>
                                                        <div class="date">${review.date}</div>
                                                    </div>
                                                    <div class="rating">${show_star(review.star)}</div>
                                                    <div class="comment">${review.comment}</div>
                                                </div>
                                            </div>
                                        </div>`;
                        });

                        Swal.fire({
                            title: app.name_en,
                            html: html,
                            icon: 'info',
                            confirmButtonText: 'OK',
                            iconColor: '#fa1675',
                            confirmButtonColor: '#fa1675'
                        });
                    });
                    appCard.find('.card').append(rateIcon);
                }
                appList.append(appCard);
            });
        });
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
        r.loadJs("js/ebook.js","ebook","show");
    }

    show_all_bible(){
        $("#app-list").html(r.loading_html());
        r.act_menu("m-bible");
        r.loadJs("js/bible.js","bible","show");
    }

    show_policy(){
        r.act_scroll_top();
        $("#app-list").load("html/policy/policy-vi.html", function(response, status, xhr) {
            if (status == 'error') $("#app-list").load("html/policy/policy-en.html");
        });
    }

    show_terms(){
        r.act_scroll_top();
        $("#app-list").html('');
        $("#app-list").load("html/terms/terms-en.html");
    }
}

var r;
$(document).ready(function(){
    r=new Rabbit();
    r.onload();
    $('#leftMenu').css('left', '0');
    $('#rightMenu').css('right', '0');
    r.show_all_app();
});