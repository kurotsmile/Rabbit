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
                    var t_table_info='<table class="table table-striped table-hover table-responsive fs-9 w-100 text-break" style="text-align:left;width:100%">';
                    t_table_info+='<tbody>';
                    delete(app.password);
                    delete(app.avatar);
                    $.each(app,function(k,v){
                        if(v!=""&&v!=null){
                            t_table_info+='<tr>';
                                t_table_info+='<th scope="row"><i class="fas fa-info"></i> '+k+'</th>';
                                t_table_info+='<td>'+v+'</td>';
                            t_table_info+='</tr>';
                        }
                    });
                    t_table_info+='</tbody>';
                    t_table_info+='</table>';
                    Swal.fire({
                        title:app.name,
                        html:t_table_info
                    });
                });
                appList.append(appCard);
            });
        });
    }
}

var users=new Users();
r.users=users;