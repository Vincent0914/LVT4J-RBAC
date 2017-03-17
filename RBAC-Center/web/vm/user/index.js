function loadUsers() {
    q('/edit/user/list.json',
        {
            keyword: $('#keyword').val(),
            pager: $('#usersPager').pagerSerialize()
        },
        function(users){
            $('#users').html($tpl(tpl_users)(users));
            $('#editUserDiv').slideUp();
        },
        '加载用户中'
    );
}

function addUser() {
    $('#editUserDiv').formData({});
    $('#editUserDiv').slideDown().scrollToMe();
}

function sortUser() {
    var autoIds = [];
    $('#users tr').each(function(){
        autoIds.push($(this).attrData().autoId);
    });
    if(autoIds.length==0) return alert('无排序内容!');
    q('/edit/user/sort.json',
        {
            autoIds: autoIds,
        },
        function(){
            alert('保存排序成功!');
        },
        '保存排序中'
    );
}

function editUser(btn) {
    var user = $(btn).closest('tr').attrData();
    $('#editUserDiv').formData(user);
    $('#editUserDiv').slideDown().scrollToMe();
}

function editUserSave() {
    var user = $('#editUserDiv').formData();
    if(!user) return;
    q('/edit/user/set.json',
        user,
        function(){
            alert('保存成功!');
            loadUsers();
        },
        '保存用户中'
    );
}

function delUser(btn) {
    var user = $(btn).closest('tr').attrData();
    if(!confirm('确定要删除用户\nID:'+user.id+'\n名称:'+user.name+'\n吗?')) return;
    q('/edit/user/del.json',
        {
            autoId:user.autoId
        },
        function(){
            alert('删除成功!');
            loadUsers();
        },
        '删除用户中'
    );
}

$(document).ready(ready);

function ready(){
    loadUsers();
}

function tpl_users(users) {
    if(!users) return;
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        /*<tr data="{Tigh(user)}" title="{Tigh(user.des)}">
            <td class="sortabler-handler"><i class="ace-icon fa fa-arrows-v"></i></td>
            <td><div class="list-ele">{Tigh(user.id)}</div></td>
            <td><div class="list-ele">{Tigh(user.name)}</div></td>
            <td>
                <button onclick="editUser(this)" type="button" class="btn btn-info btn-minier">编辑</button>
                <button onclick="delUser(this)" type="button" class="btn btn-danger btn-minier">删除</button>
            </td>
        </tr>*/
    }
}