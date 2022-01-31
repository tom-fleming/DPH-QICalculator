var symptomsField = document.querySelector('#symptoms_yes_no');
var symptomsYesSelectedField = document.querySelector('#symptoms_yes_selected');
var symptomsNoSelectedField = document.querySelector('#symptoms_no_selected');
var symptoms_yes_no_rad_checked = document.querySelectorAll('input[name="symptoms"]');

var symptomsDateField = document.querySelector('#QuarantineCalculator_date');
var resultFiled = document.querySelector('#quarantineDateResult');
var symptomsDateLabelField = document.getElementById("QuarantineCalculator_date_label");


var symptoms_closeContactFiled = document.querySelector('#symptoms_closeContact');
var symptoms_closeContact_uptodate_selectedField = document.querySelector('#symptoms_closeContact_uptodate_selected');
var symptoms_closeContact_notuptodate_selectedField = document.querySelector('#symptoms_closeContact_notuptodate_selected');
var symptoms_closeContact_checked = document.querySelectorAll('input[name="uptodatecheck"]');

var sympomFlag;
var yes_no_selection;
var  uptodate_selection;

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [

        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}

function addDays(date, days) {
    var result = new Date(date);
    result.setTime(result.getTime() + (days+1) * 60 * 60 * 24 * 1000);
    return formatDate(result);
}

function genarateResult(selectedDate) {
    if (sympomFlag === 'positive') {
        if (yes_no_selection === 'yes') {
            document.getElementById("quarantineDateResult").innerHTML = `
                        <div  class="result-alert result-alert__info">
                        <div>
                            <p>
                                <b>ISOLATION CALCULATOR</b> You have tested positive and have symptoms:
                            </p>

                            <p>
                                If your symptoms have improved and 24 hours have passed without a fever (without the use of medication),
                                your last day of in-home isolation is:<b> ${addDays(selectedDate, 5)} </b>
                            </p>
                            <p class="usa-intro">Your in-home isolation ENDS on: <b>${addDays(selectedDate, 6)}</b></p>
                            <p></p>
                            <p class="usa-intro">Continue to wear a mask through: <b>${addDays(selectedDate, 10)} </b> from symptom onset. If
                                you cannot mask, continue to isolate at home for the 5 additional days.
                            </p>
                            <p>After this date, you may resume your usual activities but should still take precautions to reduce your
                                risk (i.e. social distancing, frequent handwashing, and wearing a mask when social distancing isn't
                                possible).</p>
                        </div>
                        </div>
                        `;
        }
        else if (yes_no_selection === 'no') {
            document.getElementById("quarantineDateResult").innerHTML = `
            <div   class="result-alert result-alert__info">
                <div>
                    <p>
                        <b>ISOLATION CALCULATOR </b> You have tested positive but have <b><u>NO</u></b> symptoms:
                    </p>

                    <p>
                        Your last FULL day of isolation is: <b>${addDays(selectedDate, 5)}</b>
                    </p>	
                     <p class="usa-intro">Your in-home isolation ENDS on: <b>${addDays(selectedDate, 6)}</b></p>
                    <p></p>
                    <p class="usa-intro">Continue to wear a mask through: <b>${addDays(selectedDate, 10)}</b> from symptom onset. If you cannot mask, continue to isolate at home for the 5 additional days. 
                    </p>
                    <p>After this date, you may resume your usual activities but should still take precautions to reduce your risk (i.e. social distancing, frequent handwashing, and wearing a mask when social distancing isn't possible).</p>
                </div>
            </div>
            `;
        }
    }  else if(sympomFlag === 'closeContact')
     {
        if (uptodate_selection === 'uptoDate') {
            document.getElementById("quarantineDateResult").innerHTML = `
            <div   class="result-alert result-alert__info">
                <div>
                    <p>
                    <b>QUARANTINE CALCULATOR</b> 
                    </p>
                    <p>
                        If you are <u>up to date</u> with your vaccines
                    </p>
                    <p>
                        Recommended date for testing: <b>${addDays(selectedDate, 5)}</b>
                    </p>	
                    <p class="usa-intro">Wear a mask through: <b>${addDays(selectedDate, 10)}</b></p>
                    <p></p>
                    <p class="usa-intro">If you develop symptoms at any point during these 10 days, you should also take a test, even if an earlier test was negative. </p>
            
                </div>
            </div>
            `;
        }
        else if (uptodate_selection === 'notUptoDate')
        {
            document.getElementById("quarantineDateResult").innerHTML = `

            <div   class="result-alert result-alert__info">
                <div>
                    <p>
                        <b>QUARANTINE CALCULATOR</b>  
                   </p>
                   <p>
                        <b>If you are unvaccinated or not fully vaccinated/up to date with your COVID-19 Vaccines:</b>
                   </p>	
                    <p>Recommended date for testing: <b>${addDays(selectedDate, 5)} </b> </p>	
                    <p class="usa-intro">Quarantine at home through: <b>${addDays(selectedDate, 5)} </b></p>
                    <p class="usa-intro">If you remain asymptomatic, you may return to normal activities: <b>${addDays(selectedDate, 6)}</b></p>
                    <p>Continue to wear a mask through: <b>${addDays(selectedDate, 10)}</b></p>
                    <p>If you develop symptoms at any point during these 10 days, you should also take a test, even if an earlier test was negative.</p>
                </div>
            </div>
            `;
        }

     }

}

var quarantineDateField = document.querySelector('#quarantineDate');

quarantineDateField.addEventListener('change', (event) => {
    var selectedDate = Date.parse(`${event.target.value}`);
    if(isNaN(selectedDate))
    {
        if (resultFiled != null) {
            resultFiled.innerHTML = ``;
        }
        return false;
    }
    else
    {
        genarateResult(new Date(`${event.target.value}`));
    }
    
});



function symptoms_yes_no_handleChange(event) {
    yes_no_selection = event.value;
    
    symptomsDateField.style.display = 'block';

    if (yes_no_selection === 'yes') {
        symptomsYesSelectedField.style.display = 'block';
        symptomsNoSelectedField.style.display = 'none';
        symptomsDateLabelField.innerHTML =`Enter the first day your symptoms began`;

    } else if (yes_no_selection === 'no') {
        symptomsYesSelectedField.style.display = 'none';
        symptomsNoSelectedField.style.display = 'block';
        symptomsDateLabelField.innerHTML =`Enter your test collection date`;
    }
    quarantineDateField.valueAsDate = null;
    if (resultFiled != null) {
        resultFiled.innerHTML = ``;
    }

    
    symptoms_closeContactFiled.style.display = 'none';
    symptoms_closeContact_uptodate_selectedField.style.display = 'none';
    symptoms_closeContact_notuptodate_selectedField.style.display = 'none';
    uptodate_selection ='';
}

function symptoms_closeContact_handleChange(event)
{
    uptodate_selection = event.value;
    
    if (uptodate_selection === 'uptoDate') {
        symptoms_closeContact_uptodate_selectedField.style.display = 'block';
        symptoms_closeContact_notuptodate_selectedField.style.display = 'none';
        symptomsDateLabelField.innerHTML =`Enter the date of <b><u>LAST</u></b> contact with the person who tested positive`;
    } else if (uptodate_selection === 'notUptoDate') {
       
        symptoms_closeContact_uptodate_selectedField.style.display = 'none';
        symptoms_closeContact_notuptodate_selectedField.style.display = 'block';
        symptomsDateLabelField.innerHTML =`Enter the date of <b><u>LAST</u></b> contact with the person who tested positive`;
    }
    quarantineDateField.valueAsDate = null;
    if (resultFiled != null) {
        resultFiled.innerHTML = ``;
    }
    symptomsYesSelectedField.style.display = 'none';
    symptomsNoSelectedField.style.display = 'none';
    symptomsDateField.style.display = 'block';
    yes_no_selection ='';
}

function handleChange(src) {
    sympomFlag = src.value;
   
    if (resultFiled != null) {
        resultFiled.innerHTML = '';
    }
    
    if (symptoms_yes_no_rad_checked != null) {

        for (const radioButton of symptoms_yes_no_rad_checked) {
            if (radioButton.checked) {
                radioButton.checked = false;
            }
        }
    }


    if (symptoms_closeContact_checked != null) {

        for (const radioButton of symptoms_closeContact_checked) {
            if (radioButton.checked) {
                radioButton.checked = false;
            }
        }
    }

    
    yes_no_selection ='';
    uptodate_selection ='';
    quarantineDateField.valueAsDate = null;
    symptomsDateField.style.display = 'none';
    symptomsYesSelectedField.style.display = 'none';
    symptomsNoSelectedField.style.display = 'none';
    symptoms_closeContact_uptodate_selectedField.style.display = 'none';
    symptoms_closeContact_notuptodate_selectedField.style.display = 'none';

    if (src.value === 'positive') {
        symptomsField.style.display = 'block';
        symptoms_closeContactFiled.style.display='none';

    }
    else {
        symptomsField.style.display = 'none';
        symptoms_closeContactFiled.style.display='block';
    }

}