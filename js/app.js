class App{

    show_all(){
        r.app.show_all_app();
    }

    show_app(){
        r.app.show_all_app("app");
    }

    show_game(){
        r.app.show_all_app("game");
    }

    showInfoByData(app){
        Swal.fire({
            title: app.name_en,
            html: '<p>' + app.describe_en + '</p>',
            icon: 'info',
            confirmButtonText: 'OK',
            iconColor: '#fa1675',
            confirmButtonColor: '#fa1675'
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
        $('#app-list').html(r.loading_html());
        if(type=="all") r.act_menu("m-home");
        if(type=="app") r.act_menu("m-app");
        if(type=="game") r.act_menu("m-game");

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
                var iconClass = r.app.getIconClass(app.type);
                var appCard = $(`
                    <div class="col-md-4 app-card ${app.type} animate__animated animate__fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title" role="button"><i class="fas ${iconClass} animate__animated animate__bounceIn"></i> ${app["name_"+r.lang]}</h5>
                                <p role="button" class="card-text animate__animated animate__fadeIn">${truncatedDescription}</p>
                                ${r.app.getAppStoreIcon('uptodown', app.uptodown)}
                                ${r.app.getAppStoreIcon('amazon_app_store', app.amazon_app_store)}
                                ${r.app.getAppStoreIcon('github', app.github)}
                                ${r.app.getAppStoreIcon('microsoft_store', app.microsoft_store)}
                                ${r.app.getAppStoreIcon('google_play', app.google_play)}
                                ${r.app.getAppStoreIcon('itch', app.itch)}
                            </div>
                            <i class="fas fa-info-circle info-icon detail animate__animated animate__bounceIn animate__delay-2s"></i>
                        </div>
                    </div>
                `);

                var appDownload = appCard.find(".card-text");
                appDownload.click(function(){
                    var html='';
                    html+=r.app.getLinkDownload("apk_file",app.apk_file);
                    html+=r.app.getLinkDownload("exe_file",app.exe_file);
                    html+=r.app.getLinkDownload("deb_file",app.deb_file);
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
                    r.app.showInfoByData(app);
                });

                var infoIcon = appCard.find(".detail");
                infoIcon.click(function(){
                   r.app.showInfoByData(app);
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

    showDataSearchFound(){
        r.app.showInfoByData(r.data_search_found);
    }
}

var app=new App();
r.app=app;