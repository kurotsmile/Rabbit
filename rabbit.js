class Rabbit{

    loading_html(){
        return '<div class="col-12"><p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</p></div>';
    }

    show_search(){
        Swal.fire({
            title:"Search",
            input: "text",
            inputLabel:"Search Content",
            preConfirm:(val)=>{
                alert(val);
            }
        });
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
            html:html
        });
        $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/lang.json', function(data) {
            $.each(data.all_item,function(index,lang){
                $("#dropdown_lang").append($('<option>', { 
                    value: lang.key,
                    text : lang.name
                }));
            });
        });
    }

    show_about(){
        var html='';
        html+='<p class="animate__animated animate__zoomIn"><b><i class="fas fa-solid fa-carrot"></i> Fun and Engaging Games:</b><br/>Explore a vibrant collection of games that cater to various tastes and ages. From adrenaline-pumping action games to brain-teasing puzzles and immersive simulations, Rabbit Store offers entertainment that never fails to captivate.</p>';
        html+='<p class="animate__animated animate__zoomIn"><b><i class="fas fa-solid fa-carrot"></i> Useful Applications:</b><br/>Discover practical applications designed to simplify and enrich your daily routines. From productivity tools that streamline tasks to educational apps that foster learning, Rabbit Store provides solutions that enhance efficiency and knowledge.</p>';
        html+='<p class="animate__animated animate__zoomIn"><b><i class="fas fa-solid fa-carrot"></i> Why Choose Rabbit Store?</b></br>At Rabbit Store, we prioritize quality, creativity, and user satisfaction. Each game and application is carefully curated to ensure a seamless experience, whether you\'re unwinding after a long day or striving for personal growth.</p>';
        html+='<p class="animate__animated animate__zoomIn">Explore Rabbit Store today and transform your digital experience with our diverse selection of games and apps. Join our community of users who rely on Rabbit Store for entertainment, productivity, and everything in between.</p>';
        $('#app-list').html();
        $('#app-list').html(html);
    }

    show_all_user(){
        $('#app-list').html(r.loading_html());
        $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/user-vi.json', function(data) {
            $('#app-list').html('');
            var appList = $('#app-list');
            var apps = data.all_item;
            $.each(apps, function(index, app) {
                var iconClass='';
                if(app.sex=='0')
                    iconClass='fa-solid fa-mars';
                else
                    iconClass='fa-solid fa-venus';
                var appCard = $(`
                    <div class="col-md-3 app-card ${app.type} animate__animated animate__fadeIn">
                        <div class="card user">
                            <div class="card-body">
                                <i class="fas ${iconClass}"></i> ${app.name}
                            </div>
                        </div>
                    </div>
                `);
                appList.append(appCard);
            });
        });
    }

    show_all_app(type="all"){
        $('#app-list').html(r.loading_html());
        function truncateText(text, wordLimit) {
            var words = text.split(' ');
            if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return text;
        }

        function getIconClass(type) {
            if (type === 'game') {
                return 'fa-gamepad';
            } else if (type === 'app') {
                return 'fa-rocket';
            }
            return '';
        }
        function getAppStoreIcon(storeType, storeLink) {
            switch (storeType) {
                case 'amazon_app_store':
                    return `<button class="btn btn-store btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Amazon App Store</button>`;
                case 'github':
                    return `<button class="btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> GitHub</button>`;
                case 'microsoft_store':
                    return `<button class="btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Microsoft Store</button>`;
                case 'google_play':
                    return `<button class="btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Google Play</button>`;
                case 'itch':
                    return `<button class="btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> Itch.io</button>`;
                case 'uptodown':
                    return `<button class="btn btn-store  btn-sm btn-dark m-1 animate__animated animate__bounceIn" onclick="window.open('${storeLink}', '_blank')"><i class="fas fa-carrot"></i> UpToDown</button>`;
                default:
                    return '';
            }
        }

        $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/app.json', function(data) {
            $('#app-list').html('');
            var appList = $('#app-list');
            var apps = data.all_item;
            $.each(apps, function(index, app) {
                if(type!='all'){
                    if(type!=app.type) return true;
                }
                var truncatedDescription = truncateText(app.describe_en, 20);
                var iconClass = getIconClass(app.type);
                var appCard = $(`
                    <div class="col-md-4 app-card ${app.type} animate__animated animate__fadeIn">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas ${iconClass}"></i> ${app.name_en}</h5>
                                <p class="card-text">${truncatedDescription}</p>
                                ${getAppStoreIcon('uptodown', app.uptodown)}
                                ${getAppStoreIcon('amazon_app_store', app.amazon_app_store)}
                                ${getAppStoreIcon('github', app.github)}
                                ${getAppStoreIcon('microsoft_store', app.microsoft_store)}
                                ${getAppStoreIcon('google_play', app.google_play)}
                                ${getAppStoreIcon('itch', app.itch)}
                            </div>
                        </div>
                    </div>
                `);
                var infoIcon = $('<i class="fas fa-info-circle info-icon detail"></i>');
                infoIcon.click(function() {
                    Swal.fire({
                        title: app.name_en,
                        html: '<p>' + app.describe_en + '</p>',
                        icon: 'info',
                        confirmButtonText: 'OK'
                    });
                });

                if(app.rates!=null){
                    var rateIcon = $('<i class="fas fa-solid fa-comment info-icon rate"></i>');
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
                                                    <div class="rating">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                    </div>
                                                    <div class="comment">${review.comment}</div>
                                                </div>
                                            </div>
                                        </div>`;
                        });

                        Swal.fire({
                            title: app.name_en,
                            html: html,
                            icon: 'info',
                            confirmButtonText: 'OK'
                        });
                    });
                    appCard.find('.card').append(rateIcon);
                }

                appCard.find('.card').append(infoIcon);
                appList.append(appCard);
            });
        });
    }

    toggleDarkMode() {
        
        let icon = document.getElementById('dark-mode-toggle');
        if (document.body.classList.contains('dark-mode')) {
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
}

var r;
$(document).ready(function(){
    r=new Rabbit();
    $('#leftMenu').css('left', '0');
    $('#rightMenu').css('right', '0');
    r.show_all_app();
});