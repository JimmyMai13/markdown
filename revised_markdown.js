function markdown() {
    let input_str;
    let text_input;
    let output_html = "";
    let counter;
    input_str = document.getElementById('input_txt').value;
    text_input = input_str;
    if (text_input.length > 0) {
        let lines = input_str.split('\n');
        for (counter = 0; counter < lines.length; counter++) {
            let each_line = lines[counter];
            //attempt to check for markdown paragraph (first line must be empty and following line cannot be undefined or empty)
            if (each_line === "" && lines[counter+1] !== undefined && lines[counter+1] !== "") {
                let start_paragraph_html = "<p>";
                let end_paragraph_html = "</p>";
                let link_html = output_html_for_link(lines[counter+1]);
                output_html += start_paragraph_html + link_html + end_paragraph_html + "\n";
                counter++;
                //no markdown paragraph, proceed to check for links
            } else if (each_line !== "") {
                output_html += output_html_for_link(each_line) + "\n";
            } else {
                console.log('blank line - do nothing');
            }
        }
    }
    document.getElementById("output_html").value = output_html;
}

function output_html_for_link(str) {
    let output_html = "";
    const full_link_regex = /(#{0,6})?(.*)\[([\w\s\d]+)?\]\((https?:\/\/[\w\d\.]+[\.][\w]+)\)(.*)/;
    var match = str.match(full_link_regex);
    if (match) {
        if (str.startsWith("#")) {
            let start_heading_html = "<h" + match[1].length + ">";
            let end_heading_html = "</h" + match[1].length + ">";
            let link_html = '<a href="' + match[4] + '">' + match[3] + "</a>";
            output_html = start_heading_html + match[2] + link_html + match[5]+ end_heading_html;
        } else {
            let link_html = '<a href="' + match[4] + '">' + match[3] + "</a>";
            output_html = match[2] + link_html + match[5];
        }
    } else {
        if (str.startsWith("#")) {
            const heading_regex = "(#{0,6})?(.+)";
            let match = str.match(heading_regex);
            let start_heading_html = "<h" + match[1].length + ">";
            let end_heading_html = "</h" + match[1].length + ">";
            output_html = start_heading_html + match[2] + end_heading_html;
        } else {
            output_html = str;
        }
    }
    return output_html;
}

let el = document.getElementById('btn');
el.onclick = markdown;