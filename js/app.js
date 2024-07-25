class App{

    box_info_menu_cur="";
    link_data_app="";
    data_app_temp=null;
    all_app=[];

    show_all(){
        r.app.show_all_app();
    }

    show_app(){
        r.app.show_all_app("app");
    }

    show_game(){
        r.app.show_all_app("game");
    }

    menuSubInfoBox(app){
        if(app.rates!=null){
            var btn_comment=$('<button class="btn btn-sm btn-c '+(r.app.box_info_menu_cur === "rate" ? "active" : "rate")+' m-1 animate__animated animate__bounceIn"><i class="fas fa-comment"></i></button>');
            $(btn_comment).click(function(){r.app.showRate(app);});
            $("#all_btn_dock").append(btn_comment);    
        }

        var btn_download=$('<button class="btn btn-sm btn-c '+(r.app.box_info_menu_cur === "download" ? "active" : "download")+' m-1 animate__animated animate__bounceIn"><i class="fas fa-download"></i></button>');
        $(btn_download).click(function(){r.app.showDownload(app);});
        $("#all_btn_dock").append(btn_download);

        var btn_store=$('<button class="btn btn-sm btn-c '+(r.app.box_info_menu_cur === "store" ? "active" : "store")+' m-1 animate__animated animate__bounceIn"><i class="fas fa-store"></i></button>');
        $(btn_store).click(function(){r.app.showStoreOther(app);});
        $("#all_btn_dock").append(btn_store);

        if(app.rank!=null){
            var btn_rank=$('<button class="btn btn-sm btn-c '+(r.app.box_info_menu_cur === "rank" ? "active" : "rank")+' m-1 animate__animated animate__bounceIn"><i class="fas fa-trophy"></i></button>');
            $(btn_rank).click(function(){
                r.app.showRank(app);
            });
            $("#all_btn_dock").append(btn_rank);
        }

        var btn_share=$('<button class="btn btn-sm btn-c '+(r.app.box_info_menu_cur === "share" ? "active" : "share")+' m-1 animate__animated animate__bounceIn"><i class="fas fa-share-alt"></i></button>');
        $(btn_share).click(function(){
            var link_share=cr.site_url+"/?r="+app["name_en"];
            cr.show_share(link_share,app["name_en"]);
        });
        $("#all_btn_dock").append(btn_share);

        if(cr.dev){
            var btn_edit=$('<button class="btn btn-sm btn-c  m-1 animate__animated animate__bounceIn"><i class="fas fa-pen-square"></i></button>');
            $(btn_edit).click(function(){
                Swal.close();
                cr_data.edit(app);
            });
            $("#all_btn_dock").append(btn_edit);
        }

        var btn_info=$('<button class="btn btn-sm btn-c '+(r.app.box_info_menu_cur === "info" ? "active" : "info")+' m-1 animate__animated animate__bounceIn"><i class="fas fa-info-circle"></i></button>');
        $(btn_info).click(function(){r.app.showInfoByData(app);});
        $("#all_btn_dock").append(btn_info);
    }

    showInfoByData(app){
        r.app.box_info_menu_cur="info";
        var html='';
        if(cr.lang!="en"){
            if(app["name_"+cr.lang]!=null) html+='<p class="card-author">'+app["name_"+cr.lang]+'</p>';
        }

        if(app["describe_"+cr.lang]!=null)
            html+='<p>' + app["describe_"+cr.lang] + '</p>';
        else
            html+='<p>' + app.describe_en + '</p>';

        html+='<div id="all_btn_dock"></div>';
        
        Swal.fire({
            title: app.name_en,
            html: html,
            icon: 'info',
            confirmButtonText: 'OK',
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675',
            didOpen:()=>{r.app.menuSubInfoBox(app);}
        });
    }

    getIconClass(type) {
        if (type === 'game') {
            return 'fa-gamepad';
        } else if (type === 'app') {
            return 'fa-rocket';
        }
        return '';
    }

    showRate(app){
        r.app.box_info_menu_cur="rate";
        let html='';
        $.each(app.rates, function (index, review) {
            html += `<div class="reviews">
                                            <div class="review">
                                                <div class="avatar"><img src="icon.png" alt="User Avatar"></div>
                                                <div class="content">
                                                    <div class="user-info">
                                                        <div class="name">${review.user.name}</div>
                                                        <div class="date">${review.date}</div>
                                                    </div>
                                                    <div class="rating">${r.app.getIconStar(review.star)}</div>
                                                    <div class="comment">${review.comment}</div>
                                                </div>
                                            </div>
                                        </div>`;
        });
        html+='<div id="all_btn_dock"></div>';
        Swal.fire({
            title: app["name_"+cr.lang],
            html: html,
            icon: 'info',
            confirmButtonText: 'OK',
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675',
            didOpen:()=>{r.app.menuSubInfoBox(app);}
        });
    }

    showRank(app){
        r.app.box_info_menu_cur="rank";
        let html='';
        $.each(app.rank, function (index, r) {
            html += `<div class="reviews">
                                            <div class="review">
                                                <div class="avatar"><img src="icon.png" alt="User Avatar"></div>
                                                <div class="content">
                                                    <div class="user-info">
                                                        <div class="name">${r.user.name}</div>
                                                        <div class="date">${r.date}</div>
                                                    </div>
                                                    <div class="rating">${r.scores} <i class="far fa-futbol"></i> - ${r.type} <i class="fas fa-pizza-slice"></i></div>
                                                </div>
                                            </div>
                                        </div>`;
        });
        html+='<div id="all_btn_dock"></div>';
        Swal.fire({
            title: app["name_"+cr.lang],
            html: html,
            icon: 'info',
            confirmButtonText: 'OK',
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675',
            didOpen:()=>{r.app.menuSubInfoBox(app);}
        });
    }

    showDownload(app){
        r.app.box_info_menu_cur="download";
        var html = '';
        html += r.app.getLinkDownload("apk_file", app.apk_file);
        html += r.app.getLinkDownload("exe_file", app.exe_file);
        html += r.app.getLinkDownload("deb_file", app.deb_file);
        html+='<div id="all_btn_dock"></div>';
        Swal.fire({
            icon: 'info',
            title: "Download",
            html: html,
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675',
            didOpen:()=>{r.app.menuSubInfoBox(app);}
        });
    }

    showStoreOther(app){
        r.app.box_info_menu_cur="store";
        var html = '';
        html+=r.app.getAppStoreIcon('uptodown', app.uptodown);
        html+=r.app.getAppStoreIcon('amazon_app_store', app.amazon_app_store);
        html+=r.app.getAppStoreIcon('github', app.github);
        html+=r.app.getAppStoreIcon('microsoft_store', app.microsoft_store);
        html+=r.app.getAppStoreIcon('google_play', app.google_play);
        html+=r.app.getAppStoreIcon('itch', app.itch);
        html+='<div id="all_btn_dock"></div>';
        Swal.fire({
            icon: 'info',
            title: "Store Other",
            html: html,
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675',
            didOpen:()=>{r.app.menuSubInfoBox(app);}
        });
    }

    getIconStar(star){
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

    getAppStoreIcon(storeType, storeLink) {
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

    getLinkDownload(fileType,downloadLink){
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

    show_all_app(type="all"){

        var query_name_url="";
        if(cr.arg("r")) query_name_url=cr.arg("r");

        $('#app-list').html(r.loading_html());
        if(type=="all") r.act_menu("m-home");
        if(type=="app") r.act_menu("m-app");
        if(type=="game") r.act_menu("m-game");

        this.link_data_app=cr.get_random(r.list_url_app);
        r.app.all_app=[];
        $.getJSON(this.link_data_app, function(data) {
            $('#app-list').html('');
            var appList = $('#app-list');
            var apps = data.all_item;

            r.app.all_app=apps;
            $.each(apps, function(index, app) {
                if(app.status!="publish") return true;
                if(type!='all'){
                    if(type!=app.type) return true;
                }
                var truncatedDescription ='';
                
                if(app["describe_"+cr.lang]!=null)
                    truncatedDescription=r.truncateText(app["describe_"+cr.lang],30,15);
                else
                    truncatedDescription=r.truncateText(app["describe_en"], 30,15);

                var iconClass = r.app.getIconClass(app.type);
                var appCard = $(`
                    <div class="col-md-4 app-card ${app.type} animate__animated animate__fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title" role="button"><i class="fas ${iconClass} animate__animated animate__bounceIn"></i> ${app["name_"+cr.lang]}</h5>
                                <p role="button" class="card-text animate__animated animate__fadeIn">${truncatedDescription}</p>
                                ${r.app.getAppStoreIcon('uptodown', app.uptodown)}
                                ${r.app.getAppStoreIcon('amazon_app_store', app.amazon_app_store)}
                                ${r.app.getAppStoreIcon('github', app.github)}
                                ${r.app.getAppStoreIcon('microsoft_store', app.microsoft_store)}
                                ${r.app.getAppStoreIcon('google_play', app.google_play)}
                                ${r.app.getAppStoreIcon('itch', app.itch)}
                            </div>
                        </div>
                    </div>
                `);

                var appDownload = appCard.find(".card-text");
                appDownload.click(function(){
                   r.app.showDownload(app);
                });

                var appTitle = appCard.find(".card-title");
                appTitle.click(function(){
                    r.app.showInfoByData(app);
                });

                r.app.iconExtensionCardApp("fas fa-info-circle info-icon detail",appCard,()=>{ r.app.showInfoByData(app);});

                if(app.rates!=null&&app.rank!=null){
                    var randShow=cr.random([0,1]);
                    if(randShow==0)
                        r.app.iconExtensionCardApp("fas fa-solid fa-comment info-icon rate",appCard,()=>{ r.app.showRate(app);});
                    else
                        r.app.iconExtensionCardApp("fas fa-trophy info-icon rank",appCard,()=>{ r.app.showRank(app);});
                }else{
                    if(app.rates!=null) r.app.iconExtensionCardApp("fas fa-solid fa-comment info-icon rate",appCard,()=>{ r.app.showRate(app);});
                    if(app.rank!=null) r.app.iconExtensionCardApp("fas fa-trophy info-icon rank",appCard,()=>{ r.app.showRank(app);});
                }

                appList.append(appCard);

                if(query_name_url.trim().toLowerCase()==app.name_en.trim().toLowerCase()){
                    r.app.data_app_temp=app;
                }
            });

            r.app.showAppByQueryUrl();
        });
    }

    iconExtensionCardApp(iconfontCss='fas fa-solid fa-comment info-icon',appCard,act_click=null){
        var extensionIcon = $('<i class="'+iconfontCss+' animate__animated animate__bounceIn animate__delay-2s"></i>');
        extensionIcon.click(act_click);
        appCard.find('.card').append(extensionIcon);
    }

    showDataSearchFound(){
        r.app.showInfoByData(r.data_search_found);
    }

    showAppByQueryUrl(){
        if(r.app.data_app_temp){
            r.app.showInfoByData(r.app.data_app_temp);
            r.app.data_app_temp=null;
        }
    }
}

var app=new App();
r.app=app;