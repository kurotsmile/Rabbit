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
        $("#app-list").html('');
        var html='';
        html+='<h2 class="pl-3 pr-3 animate__animated animate__fadeInTopLeft">Privacy Policy</h2>';
        html+='<p class="pl-3 pr-3  animate__animated animate__fadeInLeftBig animate__delay-1s">Welcome to Rabbit Store! We are committed to protecting your privacy and ensuring a safe online experience for all users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website [rabbitstore.com], including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”).</p>';
        html+='<p class="pl-3 pr-3 animate__animated animate__fadeInRightBig animate__delay-1s">By accessing the Site, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site.</p>';
        html+='<h5 class="pl-3 pr-3 w-100 animate__animated animate__fadeInTopLeft animate__delay-2s">Information We Collect</h5>';
        html+='<p class="pl-3 pr-3 animate__animated animate__fadeInLeftBig animate__delay-2s"><b>Personal Data</b><br/>We may collect personally identifiable information (such as your name, email address, and telephone number) that you voluntarily provide to us when you register on the Site, make a purchase, or interact with our services.</p>';
        html+='<p class="pl-3 pr-3 animate__animated animate__fadeInRightBig animate__delay-2s"><b>Derivative Data</b>Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.</p>';
        html+='<p class="pl-3 pr-3 animate__animated animate__fadeInLeftBig animate__delay-2s"><b>Financial Data</b><br/>Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</p>';
        html+='<p class="pl-3 pr-3 animate__animated animate__fadeInRightBig animate__delay-2s"><b>Mobile Device Data</b><br/>Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.</p>';
        html+='<h5 class="pl-3 pr-3 animate__animated animate__fadeInTopLeft animate__delay-3s">How We Use Your Information</h5><br/>';
        html+='<p class="w-100 pl-3 pr-3 animate__animated animate__fadeInRightBig animate__delay-3s">We use the information we collect in the following ways:</p>';
        html+='<ul class="w-100 pl-5 pr-5 fs-9 d-block animate__animated animate__fadeInLeftBig animate__delay-3s">';
        html+='<li>To provide, operate, and maintain the Site.</li>';
        html+='<li>To improve, personalize, and expand our services.</li>';
        html+='<li>To understand and analyze how you use our Site.</li>';
        html+='<li>To develop new products, services, features.</li>';
        html+='</ul>';
        $("#app-list").html(html);
    }

    show_terms(){
        r.act_scroll_top();
        $("#app-list").html('');
        var html='';
        html+='<h2 class="pl-3 pr-3">Introduction</h2>';
        html+='<p class="pl-3 pr-3">Welcome to Rabbit Store! These Terms of Service (“Terms”) govern your use of our website [rabbitstore.com], including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). By accessing the Site, you agree to be bound by these Terms. If you do not agree with these Terms, please do not access the Site.</p>';
        html+='<h2 class="pl-3 pr-3">Use of the Site</h2>';
        html+='<h4 class="w-100 pl-3 pr-3">Eligibility</h4>';
        html+='<p class="pl-3 pr-3">You must be at least 13 years old to use the Site. By using the Site, you represent and warrant that you are at least 13 years old and have the legal capacity to enter into these Terms.</p>';
        html+='<h4 class="w-100 pl-3 pr-3">User Accounts</h4>';
        html+='<p class="pl-3 pr-3">To access certain features of the Site, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account password and for any activities or actions under your account.</p>';
        html+='<h4 class="w-100 pl-3 pr-3">Prohibited Activities</h4>';
        html+='<p class="pl-3 pr-3">You agree not to engage in any of the following prohibited activities:</p>';
        html+='<ul class="w-100 pl-5 pr-5 fs-9 d-block">';
        html+='<li>Copying, distributing, or disclosing any part of the Site in any medium.</li>';
        html+='<li>Using any automated system, including without limitation “robots,” “spiders,” “offline readers,” etc., to access the Site.';
        html+='<li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Site.';
        html+='<li>Taking any action that imposes, or may impose, at our sole discretion, an unreasonable or disproportionately large load on our infrastructure.';
        html+='<li>Uploading invalid data, viruses, worms, or other software agents through the Site.';
        html+='<li>Collecting or harvesting any personally identifiable information, including account names, from the Site.';
        html+='<li>Using the Site for any commercial solicitation purposes.';
        html+='<li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting fraud, hiding, or attempting to hide your identity.';
        html+='</ul>';
        html+='<h4 class="w-100 pl-3 pr-3">Intellectual Property</h4>';
        html+='<p class="pl-3 pr-3">All content on the Site, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of Rabbit Store or its content suppliers and is protected by international copyright and trademark laws. You agree not to reproduce, distribute, display, or create derivative works of any content without our prior written permission</p>';
        html+='<h4 class="w-100 pl-3 pr-3">Termination</h4>';
        html+='<p class="pl-3 pr-3">We may terminate or suspend your account and bar access to the Site immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Site.</p>';
        html+='<h4 class="w-100 pl-3 pr-3">Limitation of Liability</h4>';
        html+='<p class="pl-3 pr-3">In no event shall Rabbit Store, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Site; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the Site; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Site by any third party; and/or (v) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Site, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>';
        html+='<h4 class="w-100 pl-3 pr-3">Governing Law</h4>';
        html+='<p class="pl-3 pr-3">These Terms shall be governed and construed in accordance with the laws of [your country/state], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect</p>';
        html+='<h4 class="w-100 pl-3 pr-3">Changes to Terms</h4>';
        html+='<p class="pl-3 pr-3">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.</p>';
        html+='<h4 class="w-100 pl-3 pr-3">Contact Us</h4>';
        html+='<p class="pl-3 pr-3">If you have any questions about these Terms, please contact us at tranthienthanh93@gmail.com.</p>';
        $("#app-list").html(html);
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