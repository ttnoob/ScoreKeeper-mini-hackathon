// console.log($('#hi').css('color', 'green'));
// exampleInputEmail1
// exampleInputPassword1
// $('#submitBtn').click(function(event) {
//     if (!$('#exampleInputEmail1').val()) {
//         $('#emailHelp').toggleClass('d-none');
//     }
//     if (!$('#exampleInputPassword1').val()) {
//         $('#passwordHelp').toggleClass('d-none');
//     }
//     if ($('#exampleInputEmail1').val() && $('#exampleInputPassword1').val()) {
//         alert('success');
//     }
//     event.preventDefault();
// })
$("#submitBtn").click(function(event){
    event.preventDefault();
    $.ajax({
        url: '/users',
        type: 'GET',
        success: function(data, status) {
            for (let item of data.data) {
                console.log(item)
            }
        }
    })
});

function deleteItem(itemId) {
    console.log('here');
    $.ajax({
        url: `/users/${itemId}`,
        type: 'PUT',
        data: body,
        success: function(data, status) {

        }
    })
}

function deleteItem(itemId, body) {
    console.log('here');
    $.ajax({
        url: `/delete/${itemId}`,
        type: 'DELETE',
        success: function(data, status) {

        }
    })
}

function getItems() {
    $("#tableBody").html('');
    $.ajax({
        url: '/users',
        type: 'GET',
        success: function(data, status) {
            for (let item of data.data) {
                $("#tableBody").append(
                    `<tr>
                        <td class="edit"><a href="#">${item.id}</a></td>
                        <td class="username">${item.username}</td>
                        <td class="password">${item.password}</td>
                        <td class="delete"><a href="#">Delete</a></td>
                    </tr>`
                    )           
            }
// <tr>
                //     <td class="edit"><a href="#">${item.id}</a></td>
                //     <td class="username">${item.username}</td>
                //     <td class="password">${item.password}</td>
                //     <td class="delete"><a href="#">Delete</a></td>
                // </tr>`

            $('#tableBody').find('tr td.edit').click( function(){
                let row = $(this).find('a').text();
                let body = {
                    username: $(this).siblings('td.username').text(),
                    password: $(this).siblings('td.password').text(),
                }
                editItem(row, body);
                alert('You clicked ' + row);
            });

            $('#tableBody').find('tr td.delete').click( function(){
                let row = $(this).siblings('td.edit').find('a').text();
                if (window.confirm('Delete?')) {
                    $(this).parent().remove();
                    deleteItem(row);
                    alert('You deleted ' + row);
                }
                
            });
        }
    })
}


$("#getData").on('click', function() {
    getItems()
})


// $( document ).ready(function() {
//     $('#tableBody').find('tr').click( function(){
//         var row = $(this).find('td:first > a');
//         alert('You clicked ' + row);
//     });
// });