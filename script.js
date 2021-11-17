function compute(data)
{   
    /*
    data fill be in format:
    amount=/d../d&interest_rate=0...20.5&years=val1...15
    */
    let d = data.split("=")
    let amount = d[1].split("&")[0];
    //console.log(amount);
    let percentage = d[2].split("&")[0];
    percentage = parseFloat(percentage);
    //console.log(percentage);
    let years = d[3].split("l")[1];
    let end_year = new Date().getFullYear() + parseInt(years);

    //Set new values to HTML elments
    document.getElementById("amount").value = amount;
    document.getElementById("interest_rate").value = percentage;
    document.getElementById("range_output").value = percentage.toFixed(1).toString() + "%";
    document.getElementById("years").value = "val" + years.toString();

/*OLD
    //get data from HTML elements
    let amount = document.getElementById("amount").value;
    let percentage = document.getElementById("interest_rate").value;
    let percentage_txt = document.getElementById("range_output").value;

    //calculate an end year
    let year_selector = document.getElementById("years");
    let years = year_selector.options[year_selector.selectedIndex].text;
    years = parseInt(years);
    let end_year = new Date().getFullYear() + years;
*/
    //calculate the profit
    amount = parseInt(amount);
    let result = 0;
    for (let i = 0; i < years; i++){
        result += amount * (percentage / 100);
    }
    //let result = amount * (1 + (percentage / 100)) * years;
    result = result.toFixed(0);

    //prepare inner HTML for the paragraph
    let message = "If you deposit <mark>" + amount + "</mark>,<br>";
    message += "at an interest rate of <mark>"+ percentage +"%"+ "</mark>.<br>";
    message += "You will receive an amount of <mark>" + result + "</mark>,<br>";
    message += "in the year <mark>" + end_year + "</mark>.<br>";

    //set the message
    document.getElementById("computing result").innerHTML = message;

    //Return value will determine which option should be selected.
    return years;
}
 
function range_change()
{
    let p = document.getElementById("interest_rate").value;
    let result = parseFloat(p).toFixed(1).toString() + "%";     //format 99.9
    document.getElementById("range_output").innerHTML = result;
}


function fill_document(){
    let selected_option = 1;
    //Check location for data send from form
    var loc = window.location.href.toString();
    if (window.location.href.includes("?amount"))
    {
        loc = loc.split("?")[1];
        console.log("rejoise! : " + loc);
        selected_option = parseInt( compute(loc) );
    }
    //Create years options for the year select
    let s = document.getElementById("years");
    for(let i = 1; i < 16; i++)
    {
        let option = document.createElement("option");
        //let att = document.createAttribute("value");
        //att.value = "val" + i;
        //option.setAttributeNode(att);
        option.setAttribute("value", "val"+i);
        if( i == selected_option)   //mark option to be selected
        {
            //let att_selected = document.createAttribute("selected");
            option.setAttribute("selected","true");
        }
        option.innerHTML = i;
        s.appendChild(option);
    }

    //setup also a range_output field
    //range_change();
}



//inputField.addEventListener("invalid", () => {
//    inputField.setCustomValidity("Please fill in your First Name.");
//  });