class Users{
    show(){
        $('#app-list').html(r.loading_html());
        r.act_menu("m-menu");
        $("#m-users").addClass("active");
        $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/user-vi.json', function(data) {
            $('#app-list').html('');
            var appList = $('#app-list');
            var apps = data.all_item;
            $.each(apps, function(index, app) {
                if(app.status_share=="1") return true;
                var iconClass='';
                if(app.sex=='0')
                    iconClass='fa-solid fa-mars';
                else
                    iconClass='fa-solid fa-venus';
                var appCard = $(`
                    <div role="button" class="col-md-3 app-card ${app.type} animate__animated animate__fadeIn">
                        <div class="card user">
                            <div class="card-body">
                                <i class="fas ${iconClass}"></i> ${app.name}
                            </div>
                        </div>
                    </div>
                `);

                $(appCard).click(function(){
                    r.users.showInfoByData(app);
                });
                appList.append(appCard);
            });
        });
    }

    getValByKeyTable(k,v){
        var val='';
        var html='';
        var btn_extension='';
        switch (k.toLowerCase()) {
            case "address":
                if(v.name!="") val=v.name;
                btn_extension='<a target="_blank" href="https://www.google.com/maps?q='+v.name+'" class="btn btn-sm btn-dark"><i class="fas fa-map-marked-alt"></i></a>';
                break;
            case "sex":
                if(v=="0") val="Boy";
                else val="Girl";
                break;
            case "email":
                btn_extension='<a target="_blank" href="mailto://'+v+'" class="btn btn-sm btn-dark"><i class="fas fa-envelope"></i></a>';
                val=v;
                break;
            case "phone":
                btn_extension='<a target="_blank" href="tel://'+v+'" class="btn btn-sm btn-dark"><i class="fas fa-phone-square"></i></a>';
                val=v;
                break;
            case "status_share":
                if(v=="0") val="Share Infomation";
                else val="No Share Infomation";
                break;
            default:
                val=v;
                break;
        }

        if(val!=''){
            html='<tr>';
                html+='<th scope="row"><i class="fas fa-info"></i> '+k+'</th>';
                html+='<td>'+val+'</td>';
                html+='<td>'+btn_extension+'</td>';
            html+='</tr>';
        }
        return html;
    }

    showInfoByData(data){
        var t_table_info='<table class="table table-striped table-hover table-responsive fs-9 w-100 text-break" style="text-align:left;width:100%">';
        t_table_info+='<tbody>';
        delete(data.password);
        delete(data.avatar);
        delete(data.id_import);
        $.each(data,function(k,v){
            if(v!=""&&v!=null){
                t_table_info+=r.users.getValByKeyTable(k,v);
            }
        });
        t_table_info+='</tbody>';
        t_table_info+='</table>';
        Swal.fire({
            title:data.name,
            html:t_table_info,
            confirmButtonColor: '#fa1675'
        });
    }

    showDataSearchFound(){
        r.users.showInfoByData(r.data_search_found);
    }
}

var users=new Users();
r.users=users;