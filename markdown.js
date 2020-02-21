function markdown() {
    var input_str;
    var text_input;
    var output_html = "";
    var counter;
    input_str = document.getElementById('input_txt').value;
    text_input = input_str;
    if (text_input.length > 0) {

        var lines = input_str.split('\n');
        for (counter = 0; counter < lines.length; counter++) {
            var each_line = lines[counter];

            if (each_line === "" && lines[counter+1] !== "") {
                if (counter === lines.length-1) {
                    console.log('end of file blank line - do nothing');
                } else {
                    var start_paragraph_html = "<p>";
                    var end_paragraph_html = "</p>";
                    var link_html = output_html_for_link(lines[counter+1]);
                    output_html += start_paragraph_html + link_html + end_paragraph_html + "\n";
                    counter++;
                }
            } else {
                if (each_line !== "") {
                    output_html += output_html_for_link(each_line) + "\n";
                } else {
                     console.log('2 blank lines in a row - do nothing');
                }
            }
        }
    }
    document.getElementById("output_html").value = output_html;
}

function output_html_for_link(str) {
    var start_brack_index = str.search("\\[");
    var end_brack_index = str.search("\\]");
    var start_paran_index = str.search("\\(");
    var end_paran_index = str.search("\\)");
    var output_html = "";

    if (start_brack_index < end_brack_index && start_paran_index < end_paran_index && end_brack_index < start_paran_index) {
        var markdown_link = str.substring(start_brack_index, end_paran_index + 1);

        const full_link_regex = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/;
        const match = markdown_link.match(full_link_regex);

        var number_of_heading_markdown = get_num_of_heading_markdown(str);
        if (number_of_heading_markdown) {
            var start_heading_html = "<h" + number_of_heading_markdown + ">";
            var end_heading_html = "</h" + number_of_heading_markdown + ">";
            var starting_str_without_heading_markdowns = str.substring(number_of_heading_markdown, str.length);
            var html_for_link_without_heading = output_html_for_link_without_heading(starting_str_without_heading_markdowns);
            output_html = start_heading_html + html_for_link_without_heading + end_heading_html;

        } else {
            output_html = output_html_for_link_without_heading(str);
        }
    } else {
        var number_of_heading_markdown = get_num_of_heading_markdown(str);
        if (number_of_heading_markdown) {
            var start_heading_html = "<h" + number_of_heading_markdown + ">";
            var end_heading_html = "</h" + number_of_heading_markdown + ">";
            var str_after_heading_markdown = str.substring(number_of_heading_markdown, str.length);
            output_html = start_heading_html + str_after_heading_markdown + end_heading_html;
        } else {
            output_html = str;
        }
    }
    return output_html
}

function output_html_for_link_without_heading(str) {
    var start_brack_index = str.search("\\[");
    var end_brack_index = str.search("\\]");
    var start_paran_index = str.search("\\(");
    var end_paran_index = str.search("\\)");
    var url_link = str.substring(start_paran_index+1, end_paran_index);
    var url_link_name = str.substring(start_brack_index+1, end_brack_index);
    var link_html = '<a href="' + url_link + '">' + url_link_name + "</a>";
    var txt_before_url_markdown = str.substring(0, start_brack_index);
    var txt_after_url_markdown = str.substring(end_paran_index+1, str.length);
    var output_html = txt_before_url_markdown + link_html + txt_after_url_markdown;
    return output_html
}

function get_num_of_heading_markdown(str) {
    var indices = [];
    for(var i=0; i<6;i++) {
        if (str[i] === "#") indices.push(i);
    }
    return indices.length;
}

var el = document.getElementById('btn');
el.onclick = markdown;