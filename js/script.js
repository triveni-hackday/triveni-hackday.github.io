
$(document).ready(function(){
    var urlData = "";
    $.ajax({
    type: "GET",  
    url: "url.csv",
    dataType: "text",       
    success: function(response)  
    {
        urlData = $.csv.toArrays(response);
        $.ajax({
            type: "GET",  
            url: "data.csv",
            dataType: "text",       
            success: function(response)  
            {
                data = $.csv.toArrays(response);
                generateHtmlTable(data, urlData);
                $("#accordion").accordion();
            }   
        });
    }   
    });
    
});

function helpClick(element) {
  if ($(element).children('span').html() == "Show") {
        $(element).children('span').html("Hide");
        $(element).parent('li').find('.url-list').slideDown();
        $(element).parent('li').css('font-style', 'bold');
    } else {
        $(element).children('span').html("Show");
        $(element).parent('li').find('.url-list').slideUp();
    }
}

function copyToClipboard(element) {
    url = $(element).parent('li').find('.url');
    $(".copied-info").show().fadeOut(5000);
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(url).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

function generateHtmlTable(data, urlData) {
    var html = '<section id="accordion">';

    if(typeof(data[0]) === 'undefined') {
    return null;
    } else {
    $.each(data, function( index, row ) {
        //bind header
        if(row[1] != "") {
        html+='<div data-type="accordion-section"> <h3 data-type="accordion-section-title">'+row[1]+'</h3> <div class="accordion-content" data-type="accordion-section-body"> <ul>';
        $.each(data, function( index1, row1 ) {
            if(row1[1] ==row[1]){
                html+= '<li>'+row1[0];
                html+='<span onclick="helpClick(this)" class="help-text"><span>Show</span> Page/s Links</span><ul class="url-list">';
                $.each(urlData, function( index2, row2 ) {
                    if(row2[2] !== "" && (row2[0] == row1[0]) && (row2[1] == row1[1])){
                        html+= '<li><span class="url">'+row2[2]+'</span> <i onclick="copyToClipboard(this)" title="Copy URL" class="fa fa-copy"></i></li>'
                    } 
                });
                html+='</ul></li>'
            } 
        });
        html+="</ul> </div></div>";
        }
    });
    html += '</section>';
    $('#csv-display').append(html);
    }
}	